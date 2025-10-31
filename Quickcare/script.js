// Form validation and submission
document.getElementById("appointmentForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;

  if (!name || !email || !service || !date) {
    showNotification("Please fill all fields!", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address!", "error");
    return;
  }

  const appointment = { name, email, service, date };
  localStorage.setItem("appointment", JSON.stringify(appointment));
  showNotification("Appointment booked successfully!", "success");
  
  setTimeout(() => {
    window.location.href = "confirm.html";
  }, 1500);
});

// Email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Notification system
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Set minimum date to today and maximum to 30 days ahead
const dateInput = document.getElementById("date");
if (dateInput) {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);
  
  dateInput.setAttribute('min', today.toISOString().split('T')[0]);
  dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
}

// Form input animations
document.querySelectorAll('input, select').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', function() {
    if (!this.value) {
      this.parentElement.classList.remove('focused');
    }
  });
});

// Loading state for form submission
function setFormLoading(loading) {
  const form = document.getElementById('appointmentForm');
  const submitBtn = form?.querySelector('button[type="submit"]');
  
  if (loading) {
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;
    form.style.opacity = '0.7';
  } else {
    submitBtn.textContent = 'Confirm Appointment';
    submitBtn.disabled = false;
    form.style.opacity = '1';
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
