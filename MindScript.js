// ===== LOADING SCREEN FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
  // Show loading screen initially
  const loadingScreen = document.getElementById('loading-screen');
  
  // Hide loading screen when all page resources are loaded
  window.addEventListener('load', function() {
    // Add a small delay for better UX (so it doesn't disappear too quickly)
    setTimeout(function() {
      loadingScreen.classList.add('hidden');
      
      // Remove from DOM after animation completes
      setTimeout(function() {
        loadingScreen.style.display = 'none';
      }, 1000);
    }, 5000); // 5 second delay
  });
  
  // Fallback: hide loading screen after 5 seconds even if load event doesn't fire
  setTimeout(function() {
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
      loadingScreen.classList.add('hidden');
      setTimeout(function() {
        loadingScreen.style.display = 'none';
      }, 5000);
    }
  }, 5000 - 1000);
});

// ===== NAVBAR VISIBILITY TOGGLE =====
const navbar = document.querySelector('.navbar');
const homeSection = document.getElementById('home');

function checkHomeVisibility() {
  const rect = homeSection.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;
  if (inView) {
    navbar.classList.add('show');
    navbar.classList.remove('hide');
  } else {
    navbar.classList.add('hide');
    navbar.classList.remove('show');
  }
}

window.addEventListener('scroll', checkHomeVisibility);
window.addEventListener('resize', checkHomeVisibility);
document.addEventListener('DOMContentLoaded', checkHomeVisibility);

// ===== MOBILE NAVIGATION TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.navbar ul');
  
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      mobileNavToggle.classList.toggle('active');
    });
  }
  
  const navLinks = document.querySelectorAll('.navbar ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileNavToggle.classList.remove('active');
    });
  });
  
  document.addEventListener('click', function(event) {
    const isClickInsideNav = event.target.closest('.navbar') || event.target.closest('.mobile-nav-toggle');
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      mobileNavToggle.classList.remove('active');
    }
  });
});

// ===== TIMER FUNCTIONALITY =====
let timer;
let timeLeft = 1500; // default 25 minutes
let isRunning = false;

function setCustomTime() {
  const select = document.getElementById("timeSelect");
  const customInput = document.getElementById("customTime");
  if (select.value === "custom") {
    customInput.style.display = "block";
    customInput.addEventListener("input", () => {
      if (customInput.value > 0) {
        timeLeft = customInput.value * 60;
        updateTimer();
      }
    });
  } else {
    customInput.style.display = "none";
    timeLeft = parseInt(select.value);
    updateTimer();
  }
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimer();
    } else {
      clearInterval(timer);
      isRunning = false;
      addSession();
      alert("Session Complete!");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  const select = document.getElementById("timeSelect");
  if (select.value === "custom") {
    const customInput = document.getElementById("customTime");
    timeLeft = customInput.value > 0 ? customInput.value * 60 : 0;
  } else {
    timeLeft = parseInt(select.value);
  }
  isRunning = false;
  updateTimer();
}

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  const timerElement = document.getElementById("timer");
  
  timerElement.textContent = 
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  
  // Add visual pulse when under 10 seconds
  if (timeLeft <= 10 && !timerElement.classList.contains('pulse')) {
    timerElement.classList.add('pulse');
  } else if (timeLeft > 10 && timerElement.classList.contains('pulse')) {
    timerElement.classList.remove('pulse');
  }
}

// ===== AMBIENT SOUNDS FUNCTIONALITY =====
function playSound(id) {
  stopSound();
  const sound = document.getElementById(id);
  const button = document.querySelector(`.card button[onclick="playSound('${id}')"]`);
  
  // Add visual feedback
  if (button) {
    button.classList.add('active');
    button.style.background = '#40916c';
  }
  
  sound.play();
}

function stopSound() {
  document.querySelectorAll("audio").forEach(a => {
    a.pause();
    a.currentTime = 0;
  });
  
  // Remove visual feedback from all buttons
  document.querySelectorAll('.card button').forEach(button => {
    button.classList.remove('active');
    button.style.background = ''; // Reset to default gradient
  });
}

// ===== SESSION TRACKER FUNCTIONALITY =====
function addSession() {
  let count = localStorage.getItem("sessions") || 0;
  count++;
  localStorage.setItem("sessions", count);
  
  const sessionCount = document.getElementById("sessionCount");
  sessionCount.textContent = count;
  
  // Add animation
  sessionCount.classList.remove('updated');
  void sessionCount.offsetWidth; // Trigger reflow
  sessionCount.classList.add('updated');
}

// Load saved sessions
window.onload = function() {
  let count = localStorage.getItem("sessions") || 0;
  document.getElementById("sessionCount").textContent = count;
  updateTimer();
}

// ===== BREATHING ANIMATION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
  // Start breathing animation
  const circle = document.querySelector('.circle');
  if (circle) {
    circle.classList.add('pulse');
    
    // Make breathing animation interactive
    circle.addEventListener('click', function() {
      this.classList.toggle('pulse');
      setTimeout(() => {
        if (!this.classList.contains('pulse')) {
          this.classList.add('pulse');
        }
      }, 500);
    });
  }
  
  // Add scroll animation for cards
  const cards = document.querySelectorAll('.card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  cards.forEach(card => {
    card.style.animationPlayState = 'paused';
    cardObserver.observe(card);
  });
});

// ===== EMAIL SUBSCRIPTION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
  const subscribeForm = document.getElementById('subscribeForm');
  const emailInput = document.getElementById('emailInput');
  const subscriptionMessage = document.getElementById('subscriptionMessage');
  
  // Load existing emails from local storage
  let subscribedEmails = JSON.parse(localStorage.getItem('subscribedEmails')) || [];
  
  subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Simple email validation
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Check if email is already subscribed
    if (subscribedEmails.includes(email)) {
      subscriptionMessage.textContent = 'This email is already subscribed.';
      subscriptionMessage.style.color = 'orange';
      subscriptionMessage.style.display = 'block';
      
      // Hide message after 3 seconds
      setTimeout(() => {
        subscriptionMessage.style.display = 'none';
      }, 3000);
      return;
    }
    
    // Add to local storage
    subscribedEmails.push(email);
    localStorage.setItem('subscribedEmails', JSON.stringify(subscribedEmails));
    
    // Show success message
    subscriptionMessage.textContent = 'Thank you for subscribing!';
    subscriptionMessage.style.color = 'green';
    subscriptionMessage.style.display = 'block';
    
    // Clear input and hide message after 3 seconds
    emailInput.value = '';
    setTimeout(() => {
      subscriptionMessage.style.display = 'none';
    }, 3000);
  });
  
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});

// ===== BACK TO TOP BUTTON FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (backToTopButton) {
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetPosition = 0; // Top of the page
      const duration = 2000;
      
      smoothScrollTo(targetPosition, duration);
    });
  }

  function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    // Easing function for smooth animation
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
  }
});