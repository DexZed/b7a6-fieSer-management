# University Dashboard Management

A high-performance Custom stack (PostgreSQL, NestJs) academic hub. This multi-role system (Admin, Teacher, Student) utilizes a decoupled architecture where an NestJs backend serves a modular routes. By leveraging PostgreSQL (Neon) with Prisma ORM, it ensures type-safe data integrity for class management, automated scheduling, and real-time analytics. Secure access is managed via Better-Auth, providing a robust, controlled-access environment for campus operations.

## Tech Stack

- **[NestJS](https://nestjs.com/)** NestJS (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (while still letting you write plain JavaScript), and combines elements of OOP (object-oriented programming), FP (functional programming), and FRP (functional reactive programming). Under the hood, Nest uses robust HTTP server frameworks such as Express (the default), and can optionally be configured to use Fastify instead.

- **[Better Auth](https://www.better-auth.com/)** is a framework-agnostic authentication and authorization library for TypeScript. It provides built-in support for email and password authentication, social sign-on (Google, GitHub, Apple, and more), and multi-factor authentication, simplifying user authentication and account management.

- **[Prisma ORM](https://www.prisma.io/)** Prisma is a complete TypeScript stack with one workflow: build your app and run all of it on your machine, then deploy it to the Prisma platform with one command.

- **[Neon](https://neon.com/)** is a fully managed, serverless PostgreSQL database platform. It offers features like instant provisioning, autoscaling, and database branching, enabling developers to build scalable applications without managing infrastructure.

- **[Node.js](https://nodejs.org/)** is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. It is designed to build scalable network applications and serves as the foundation for the project's backend logic.

## Features

- **Multi-Role Authentication**: A secure entry system powered by **Better Auth** that dynamically routes Students, Teachers, and Admins to protected dashboards with strict role-based permissions.

- **Unified Analytics Dashboard**: A high-level overview of the institution's health, featuring real-time statistics on student enrollment, active classes, and faculty distribution.

- **Intelligent Subject Management**: Centralized control for curriculum where you can create subjects, apply instant filters, and drill down into specific class assignments and teacher workloads.

- **Departmental Governance**: A structural management layer that organizes subjects and faculties into departments, providing detailed views of every student and educator within a specific academic branch.

- **Dynamic Faculty Directory**: A robust, paginated directory of all professors featuring advanced search by name or email and full teaching schedule visibility.

- **Advanced Class Orchestration**: The core engine of the app built with **Drizzle ORM**, allowing Admins to schedule sessions, set capacity limits, and manage complex assignments of multiple teachers across different sections.

- **Code-Based Enrollment System**: A "Google Classroom" inspired workflow where students gain instant access to courses by entering a unique 6-8 digit joining code, ensuring a secure and controlled-access environment.
