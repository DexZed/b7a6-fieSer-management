const googleButton = document.getElementById('google');

googleButton.addEventListener('click', async () => {
  const response = await fetch('/api/auth/sign-in/social', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      provider: 'google',
    }),
  });

  const data = await response.json();

  console.log(data);

  if (data.url) {
    window.location.href = data.url;
  }
});
