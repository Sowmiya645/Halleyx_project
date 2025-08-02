document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login successful');

      if (email.includes('@admin')) {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'home.html';
      }
    } else {
      alert(data.message || 'Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Server error. Please try again later.');
  }
});
