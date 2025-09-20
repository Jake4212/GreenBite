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
const greenbiteLogo = document.querySelector('.logo');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileNavToggleContainer = mobileNavToggle ? mobileNavToggle.parentElement : null;

function checkHomeVisibility() {
  const rect = homeSection.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;
  if (inView) {
    navbar.classList.add('show');
    navbar.classList.remove('hide');
    if (greenbiteLogo) {
      greenbiteLogo.classList.add('show');
      greenbiteLogo.classList.remove('hide');
    }
    if (mobileNavToggle) {
      mobileNavToggle.classList.add('show');
      mobileNavToggle.classList.remove('hide');
    }
    if (mobileNavToggleContainer) {
      mobileNavToggleContainer.classList.add('show');
      mobileNavToggleContainer.classList.remove('hide');
    }
  } else {
    navbar.classList.add('hide');
    navbar.classList.remove('show');
    if (greenbiteLogo) {
      greenbiteLogo.classList.add('hide');
      greenbiteLogo.classList.remove('show');
    }
    if (mobileNavToggle) {
      mobileNavToggle.classList.add('hide');
      mobileNavToggle.classList.remove('show');
    }
    if (mobileNavToggleContainer) {
      mobileNavToggleContainer.classList.add('hide');
      mobileNavToggleContainer.classList.remove('show');
    }
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

    // ===== FORM SUBMISSION HANDLING =====
    document.addEventListener('DOMContentLoaded', function() {
      const feedbackForm = document.getElementById('feedbackForm');
      const confirmation = document.getElementById('confirmation');
      
      feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
          alert('Please fill out all fields');
          return;
        }
        
        if (!isValidEmail(email)) {
          alert('Please enter a valid email address');
          return;
        }
        
        // Store feedback in localStorage
        const feedback = {
          name,
          email,
          message,
          timestamp: new Date().toISOString()
        };
        
        let allFeedback = JSON.parse(localStorage.getItem('greenbiteFeedback') || '[]');
        allFeedback.push(feedback);
        localStorage.setItem('greenbiteFeedback', JSON.stringify(allFeedback));
        
        // Show confirmation message
        confirmation.style.display = 'block';
        
        // Reset form
        feedbackForm.reset();
        
        // Hide confirmation after 5 seconds
        setTimeout(() => {
          confirmation.style.display = 'none';
        }, 5000);
      });
      
      // Email validation function
      function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      }
      
      // Enhanced FAQ accordion functionality with smoother animation
      const faqItems = document.querySelectorAll('.faq-item');
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Pre-calculate the height for smoother animation
        answer.dataset.height = answer.scrollHeight;
        
        question.addEventListener('click', () => {
          // Check if currently active
          const isActive = item.classList.contains('active');
          
          // Toggle active class on clicked item
          if (isActive) {
            item.classList.remove('active');
            answer.style.maxHeight = '0';
            question.querySelector('span').textContent = '+';
          } else {
            item.classList.add('active');
            answer.style.maxHeight = answer.dataset.height + 'px';
            question.querySelector('span').textContent = '−';
          }
        });
      });
      
      // Update FAQ item heights on window resize
      window.addEventListener('resize', () => {
        faqItems.forEach(item => {
          const answer = item.querySelector('.faq-answer');
          if (item.classList.contains('active')) {
            answer.dataset.height = answer.scrollHeight;
            answer.style.maxHeight = answer.dataset.height + 'px';
          } else {
            answer.dataset.height = answer.scrollHeight;
          }
        });
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
          
          const targetPosition = 0;
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
        
        function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
      }
    });
