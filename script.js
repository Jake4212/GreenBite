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

    // ===== SMOOTH SCROLL FOR LEARN MORE BUTTON =====
    document.addEventListener('DOMContentLoaded', function() {
      const learnButton = document.getElementById('learnButton');
      
      learnButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          const targetPosition = aboutSection.offsetTop;
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 1000;
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
    });

    // ===== ROTATING QUOTES FUNCTIONALITY =====
    document.addEventListener('DOMContentLoaded', function() {
      const healthQuotes = [
        "Get ready for change to happen.",
        "Your health is an investment, not an expense.",
        "Take care of your body. It's the only place you have to live.",
        "Progress, not perfection.",
        "The body achieves what the mind believes.",
        "Healthy is not a goal, it's a way of living.",
        "Every workout is a step towards a better you.",
        "Your future self will thank you.",
        "Small changes today create big results tomorrow."
      ];
      
      const rotatingQuote = document.getElementById('rotating-quote');
      let currentQuoteIndex = 0;
      
      for (let i = 1; i < healthQuotes.length; i++) {
        const quoteElement = document.createElement('h1');
        quoteElement.className = 'quote';
        quoteElement.textContent = `"${healthQuotes[i]}"`;
        rotatingQuote.appendChild(quoteElement);
      }
      
      const allQuotes = document.querySelectorAll('.quote');
      
      function rotateQuote() {
        allQuotes[currentQuoteIndex].classList.remove('active');
        currentQuoteIndex = (currentQuoteIndex + 1) % allQuotes.length;
        allQuotes[currentQuoteIndex].classList.add('active');
      }
      
      setInterval(rotateQuote, 10000);
    });

    // ===== DAILY HEALTH TIP FUNCTIONALITY =====
    const healthTips = [
      { tip: "Start your day with a glass of water to hydrate your body.", author: "Nutritionists" },
      { tip: "Aim for at least 30 minutes of physical activity daily.", author: "Fitness Experts" },
      { tip: "Include a variety of colorful fruits and vegetables in your meals.", author: "Dietitians" },
      { tip: "Practice deep breathing exercises to reduce stress.", author: "Mindfulness Coaches" },
      { tip: "Get 7-9 hours of quality sleep each night for optimal health.", author: "Sleep Specialists" },
      { tip: "Limit processed foods and opt for whole foods instead.", author: "Nutrition Experts" },
      { tip: "Take short breaks to stretch if you have a sedentary job.", author: "Ergonomics Specialists" },
      { tip: "Stay hydrated throughout the day by drinking water regularly.", author: "Health Professionals" },
      { tip: "Practice gratitude daily to improve mental wellbeing.", author: "Psychologists" },
      { tip: "Incorporate strength training at least twice a week.", author: "Fitness Trainers" },
      { tip: "Choose whole grains over refined carbohydrates.", author: "Nutritionists" },
      { tip: "Spend time outdoors in nature to reduce stress.", author: "Wellness Coaches" },
      { tip: "Listen to your body's hunger and fullness cues.", author: "Intuitive Eating Experts" },
      { tip: "Limit sugary drinks and opt for water or herbal tea.", author: "Health Experts" },
      { tip: "Practice good posture to prevent back and neck pain.", author: "Physical Therapists" },
      { tip: "Include sources of healthy fats like avocados and nuts.", author: "Nutritionists" },
      { tip: "Take the stairs instead of the elevator when possible.", author: "Fitness Experts" },
      { tip: "Aim for 10,000 steps a day to maintain an active lifestyle.", author: "Health Professionals" },
      { tip: "Practice mindful eating by savoring each bite.", author: "Mindfulness Experts" },
      { tip: "Include protein in every meal to help you feel full longer.", author: "Dietitians" },
      { tip: "Stretch daily to improve flexibility and prevent injuries.", author: "Yoga Instructors" },
      { tip: "Limit sodium intake by cooking more meals at home.", author: "Nutrition Experts" },
      { tip: "Find an exercise buddy to help stay motivated.", author: "Fitness Coaches" },
      { tip: "Try a new healthy recipe each week to keep meals interesting.", author: "Chefs" },
      { tip: "Practice portion control to maintain a healthy weight.", author: "Nutritionists" },
      { tip: "Stand up and move for a few minutes every hour.", author: "Ergonomics Experts" },
      { tip: "Incorporate omega-3 rich foods like salmon and flaxseeds.", author: "Nutrition Professionals" },
      { tip: "Set realistic health goals and track your progress.", author: "Wellness Coaches" },
      { tip: "Try meditation to reduce stress and improve focus.", author: "Mindfulness Teachers" },
      { tip: "Get regular health check-ups and screenings.", author: "Medical Professionals" },
      { tip: "Your body is your most priceless possession. Take care of it.", author: "Jack LaLanne" }
    ];

    function showDailyHealthTip() {
      const today = new Date();
      const dayOfMonth = today.getDate();
      const tipIndex = (dayOfMonth - 1) % healthTips.length;
      const dailyTip = healthTips[tipIndex];
      
      document.querySelector('.daily-tip').textContent = `"${dailyTip.tip}"`;
      document.querySelector('.tip-author').textContent = `– ${dailyTip.author}`;
      document.querySelector('.tip-date').textContent = `Health Tip for ${today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`;
    }

    document.addEventListener('DOMContentLoaded', showDailyHealthTip);

    // ===== EMAIL SUBSCRIPTION FUNCTIONALITY =====
    document.addEventListener('DOMContentLoaded', function() {
      const subscribeForm = document.getElementById('subscribeForm');
      const emailInput = document.getElementById('emailInput');
      const subscriptionMessage = document.getElementById('subscriptionMessage');
      
      let subscribedEmails = JSON.parse(localStorage.getItem('subscribedEmails')) || [];
      
      subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!isValidEmail(email)) {
          alert('Please enter a valid email address.');
          return;
        }
        
        if (subscribedEmails.includes(email)) {
          subscriptionMessage.textContent = 'This email is already subscribed.';
          subscriptionMessage.style.color = 'orange';
          subscriptionMessage.style.display = 'block';
          
          setTimeout(() => {
            subscriptionMessage.style.display = 'none';
          }, 3000);
          return;
        }
        
        subscribedEmails.push(email);
        localStorage.setItem('subscribedEmails', JSON.stringify(subscribedEmails));
        
        subscriptionMessage.textContent = 'Thank you for subscribing!';
        subscriptionMessage.style.color = 'green';
        subscriptionMessage.style.display = 'block';
        
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






    