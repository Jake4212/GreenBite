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

// ===== MACRO BAR ANIMATION FUNCTIONALITY =====
function animateMacroBars(proteinPercentage, carbsPercentage, fatPercentage) {
  const proteinFill = document.querySelector('.protein-fill');
  const carbsFill = document.querySelector('.carbs-fill');
  const fatFill = document.querySelector('.fat-fill');
  
  // Reset widths to 0 for animation
  proteinFill.style.width = '0%';
  carbsFill.style.width = '0%';
  fatFill.style.width = '0%';
  
  // Animate protein bar
  setTimeout(() => {
    proteinFill.style.width = `${proteinPercentage * 100}%`;
  }, 300);
  
  // Animate carbs bar
  setTimeout(() => {
    carbsFill.style.width = `${carbsPercentage * 100}%`;
  }, 600);
  
  // Animate fat bar
  setTimeout(() => {
    fatFill.style.width = `${fatPercentage * 100}%`;
  }, 900);
}

// ===== UPDATE CALORIE CALCULATOR FUNCTIONALITY =====
// Replace the existing calorieForm event listener with this updated version
document.addEventListener('DOMContentLoaded', function() {
  const calorieForm = document.getElementById('calorieForm');
  const maintenanceCaloriesElement = document.getElementById('maintenanceCalories');
  const recommendedCaloriesElement = document.getElementById('recommendedCalories');
  const proteinValueElement = document.getElementById('proteinValue');
  const carbsValueElement = document.getElementById('carbsValue');
  const fatValueElement = document.getElementById('fatValue');
  
  // Get macro fill elements for animation
  const proteinFill = document.querySelector('.protein-fill');
  const carbsFill = document.querySelector('.carbs-fill');
  const fatFill = document.querySelector('.fat-fill');

  calorieForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;
    
    // Validate form
    if (!age || !gender || !weight || !height || !activity || !goal) {
      alert('Please fill out all fields');
      return;
    }
    
    // Calculate BMR (Basal Metabolic Rate)
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    // Calculate maintenance calories (BMR * activity level)
    const maintenanceCalories = Math.round(bmr * activity);
    
    // Calculate recommended calories based on goal
    let recommendedCalories;
    if (goal === 'loss') {
      recommendedCalories = maintenanceCalories - 500;
    } else if (goal === 'gain') {
      recommendedCalories = maintenanceCalories + 500;
    } else {
      recommendedCalories = maintenanceCalories;
    }
    
    // Calculate macronutrients (40% protein, 40% carbs, 20% fat for weight loss)
    let proteinPercentage, carbsPercentage, fatPercentage;
    
    if (goal === 'loss') {
      proteinPercentage = 0.4;
      carbsPercentage = 0.4;
      fatPercentage = 0.2;
    } else if (goal === 'gain') {
      proteinPercentage = 0.3;
      carbsPercentage = 0.5;
      fatPercentage = 0.2;
    } else {
      proteinPercentage = 0.3;
      carbsPercentage = 0.4;
      fatPercentage = 0.3;
    }
    
    // Protein and carbs have 4 calories per gram, fat has 9 calories per gram
    const proteinGrams = Math.round((recommendedCalories * proteinPercentage) / 4);
    const carbsGrams = Math.round((recommendedCalories * carbsPercentage) / 4);
    const fatGrams = Math.round((recommendedCalories * fatPercentage) / 9);
    
    // Update the UI with results
    maintenanceCaloriesElement.textContent = `${maintenanceCalories} calories`;
    recommendedCaloriesElement.textContent = `${recommendedCalories} calories`;
    proteinValueElement.textContent = `${proteinGrams}g`;
    carbsValueElement.textContent = `${carbsGrams}g`;
    fatValueElement.textContent = `${fatGrams}g`;
    
    // Animate macro bars with the new function
    animateMacroBars(proteinPercentage, carbsPercentage, fatPercentage);
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
  });
});

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
    
    function animation(current极) {
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

    