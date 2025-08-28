// Lightweight dialog + demo login redirect logic (client-side only).
document.getElementById('year').textContent = new Date().getFullYear();

const openLogin = document.getElementById('openLogin');
const loginDialog = document.getElementById('loginDialog');
const backdrop = document.getElementById('dialogBackdrop');
const closeLogin = document.getElementById('closeLogin');
const cancelLogin = document.getElementById('cancelLogin');
const loginForm = document.getElementById('loginForm');

// Open dialog
openLogin.addEventListener('click', () => {
  showDialog();
});

// Close handlers
closeLogin.addEventListener('click', hideDialog);
cancelLogin.addEventListener('click', hideDialog);
backdrop.addEventListener('click', hideDialog);

function showDialog(){
  loginDialog.hidden = false;
  backdrop.hidden = false;
  // trap focus to first input for accessibility
  setTimeout(() => document.getElementById('email').focus(), 50);
  document.body.style.overflow = 'hidden';
}

function hideDialog(){
  loginDialog.hidden = true;
  backdrop.hidden = true;
  document.body.style.overflow = '';
  openLogin.focus();
}

// Handle ESC to close
document.addEventListener('keydown', (ev) => {
  if(ev.key === 'Escape' && !loginDialog.hidden){
    hideDialog();
  }
});

// Demo login handling
loginForm.addEventListener('submit', function(ev){
  ev.preventDefault();
  const email = document.getElementById('email').value.trim();
  const passwd = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  if(!email || !passwd){
    alert('Please fill email and password.');
    return;
  }

  // NOTE: This is a demo-only client-side redirect.
  // In production, perform server-side authentication and protect admin routes on the server.
  if(role === 'admin'){
    // redirect to admin dashboard
    window.location.href = 'admin.html';
  } else {
    // redirect to customer dashboard
    window.location.href = 'customer.html';
  }
});
