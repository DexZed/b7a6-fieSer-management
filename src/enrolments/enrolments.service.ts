import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { prisma } from '../lib/prisma.js';
import {
  CreateEnrollmentRequest,
  JoinEnrollmentRequest,
} from '../common/schema/request/classroom.request.dto.js';

@Injectable()
export class EnrolmentsService {
  /**
   * Helper to fetch enrollment with deep relations
   */
  async getEnrollmentDetails(enrollmentId: number) {
    return prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        class: {
          include: {
            subject: {
              include: {
                department: true,
              },
            },
            teacher: true,
          },
        },
        student: true,
      },
    });
  }

  /**
   * Create an enrollment directly by classId and studentId
   */
  async create(dto: CreateEnrollmentRequest) {
    const { classId, studentId } = dto;

    const classRecord = await prisma.class.findUnique({
      where: { id: classId },
    });
    if (!classRecord) {
      throw new NotFoundException('Class not found');
    }

    const student = await prisma.user.findUnique({
      where: { id: studentId },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const existingEnrollment = await prisma.enrollment.findFirst({
      where: { classId, studentId },
    });
    if (existingEnrollment) {
      throw new ConflictException('Student already enrolled in class');
    }

    try {
      const created = await prisma.enrollment.create({
        data: { classId, studentId },
      });

      return await this.getEnrollmentDetails(created.id);
    } catch (error) {
      console.error('Failed to create enrollment:', error);
      throw new InternalServerErrorException('Failed to create enrollment');
    }
  }

  /**
   * Join a class using an inviteCode
   */
  async joinByInviteCode(dto: JoinEnrollmentRequest) {
    const { inviteCode, studentId } = dto;

    const classRecord = await prisma.class.findUnique({
      where: { inviteCode },
    });
    if (!classRecord) {
      throw new NotFoundException('Class not found');
    }

    const student = await prisma.user.findUnique({
      where: { id: studentId },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const existingEnrollment = await prisma.enrollment.findFirst({
      where: { classId: classRecord.id, studentId },
    });
    if (existingEnrollment) {
      throw new ConflictException('Student already enrolled in class');
    }

    try {
      const created = await prisma.enrollment.create({
        data: { classId: classRecord.id, studentId },
      });

      return await this.getEnrollmentDetails(created.id);
    } catch (error) {
      console.error('Failed to join class:', error);
      throw new InternalServerErrorException('Failed to join class');
    }
  }
  async getEnrollmentsByStudentId(
    studentId: string,
    search?: string,
    page?: string,
    limit?: string,
  ) {
    const student = await prisma.user.findUnique({
      where: { id: studentId },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Build dynamic search filter
    const searchFilter: any = search
      ? {
          OR: [
            {
              class: {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            },
            {
              class: {
                description: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            },
          ],
        }
      : {};

    const whereClause = {
      studentId,
      ...searchFilter,
    };

    // Fetch data and total count concurrently
    const [enrolments, total] = await Promise.all([
      prisma.enrollment.findMany({
        where: whereClause,
        include: {
          class: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              status: true,
            },
          },
          payment: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
      prisma.enrollment.count({ where: whereClause }),
    ]);

    return {
      data: enrolments,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  }

  /**
   * Get classes where student isn't enrolled by student id
   */
  async getUnenrolledClasses(
    studentId: string,
    search?: string,
    page?: string,
    limit?: string,
  ) {
    const student = await prisma.user.findUnique({
      where: { id: studentId },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Build dynamic search filter for classes
    const searchFilter: any = search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const whereClause = {
      enrollments: {
        none: {
          studentId,
        },
      },
      ...searchFilter,
    };

    // Fetch data and total count concurrently
    const [unenrolledClasses, total] = await Promise.all([
      prisma.class.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
      prisma.class.count({ where: whereClause }),
    ]);

    return {
      data: unenrolledClasses,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  }
}
