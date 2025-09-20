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
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.navbar ul');

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

    // ===== WORKOUT GENERATOR FUNCTIONALITY =====
    const workouts = {
      arms: {
        none: ["Push-ups", "Tricep Dips", "Arm Circles", "Diamond Push-ups", "Plank to Push-up", "Pike Push-ups", "Incline Push-ups", "Decline Push-ups"],
        dumbbells: ["Bicep Curls", "Shoulder Press", "Tricep Kickbacks", "Hammer Curls", "Concentration Curls", "Overhead Tricep Extension", "Lateral Raises", "Front Raises"],
        "resistance band": ["Band Bicep Curls", "Band Tricep Extensions", "Band Pull-aparts", "Band Lateral Raises", "Band Overhead Press", "Band Curl and Press", "Band Reverse Fly", "Band Front Raises"]
      },
      legs: {
        none: ["Squats", "Lunges", "Calf Raises", "Jump Squats", "Reverse Lunges", "Side Lunges", "Glute Bridges", "Single-leg Deadlifts"],
        dumbbells: ["Goblet Squats", "Dumbbell Lunges", "Step-ups", "Romanian Deadlifts", "Dumbbell Calf Raises", "Bulgarian Split Squats", "Sumo Squats", "Dumbbell Step-ups"],
        "resistance band": ["Band Squats", "Band Side Steps", "Band Glute Bridges", "Band Clamshells", "Band Leg Press", "Band Good Mornings", "Band Curtsy Lunges", "Band Donkey Kicks"]
      },
      core: {
        none: ["Crunches", "Plank", "Mountain Climbers", "Russian Twists", "Leg Raises", "Bicycle Crunches", "Flutter Kicks", "Reverse Crunches"],
        dumbbells: ["Russian Twists", "Weighted Sit-ups", "Dumbbell Side Bends", "Weighted Plank", "Dumbbell Wood Chops", "Weighted Leg Raises", "Dumbbell Russian Twists", "极Weighted Mountain Climbers"],
        "resistance band": ["Band Bicycle Crunch", "Band Plank", "Band Pallof Press", "Band Wood Chops", "Band Knee Tucks", "Band Standing Crunches", "Band Reverse Crunches", "Band Side Plank"]
      },
      full: {
        none: ["Burpees", "Jumping Jacks", "High Knees", "Mountain Climbers", "Squat Jumps", "Push-up to Plank Jack", "Bear Crawls", "Jump Lunges"],
        dumbbells: ["Thrusters", "Dumbbell Deadlifts", "Renegade Rows", "Dumbbell Clean and Press", "Dumbbell Swings", "Dumbbell Snatches", "Dumbbell Squat Press", "Dumbbell Man Makers"],
        "resistance band": ["Band Squat + Press", "Band Row", "Band Good Morning + Upright Row", "Band Woodchoppers", "Band Pull-throughs", "Band Deadlifts", "Band Overhead Walks", "Band Around-the-worlds"]
      }
    };

    let countdowns = {};

    // Enhanced generateWorkout function with animations
    async function generateWorkout() {
      const selectedParts = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
      const equipment = document.getElementById("equipment").value;
      
      if (selectedParts.length === 0) {
        // Shake animation for error feedback
        const formContainer = document.querySelector('.form-container');
        formContainer.classList.add('shake');
        setTimeout(() => {
          formContainer.classList.remove('shake');
        }, 500);
        return;
      }

      // Show progress bar
      const progressContainer = document.getElementById("progressContainer");
      const progressBar = document.getElementById("progressBar");
      progressContainer.style.display = "block";
      
      // Animate progress bar
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 5;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) clearInterval(progressInterval);
      }, 100);

      // Simulate processing time with a promise
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Hide progress bar
      progressContainer.style.display = "none";
      progressBar.style.width = "0%";
      clearInterval(progressInterval);

      let plan = [];
      selectedParts.forEach(part => {
        let list = workouts[part][equipment];
        // Increase to 8 exercises per body part for a more substantial workout
        for (let i = 0; i < 8; i++) {
          let randomIndex = Math.floor(Math.random() * list.length);
          let randomExercise = list[randomIndex];
          plan.push(randomExercise);
          // Remove the selected exercise to avoid duplicates
          list.splice(randomIndex, 1);
        }
      });

      document.getElementById("exerciseList").innerHTML = "";
      plan.forEach((exercise, index) => {
        const exerciseElement = document.createElement('div');
        exerciseElement.className = 'exercise';
        exerciseElement.innerHTML = `
          <strong>${index + 1}. ${exercise}</strong>
          <div class="timer" id="timer${index}">30</div>
          <button onclick="startTimer(${index})">Start Timer</button>
        `;
        document.getElementById("exerciseList").appendChild(exerciseElement);
        
        // Animate exercise items in with a delay
        setTimeout(() => {
          exerciseElement.classList.add('visible');
        }, 100 * index);
      });

      // Show workout card with animation
      const workoutCard = document.getElementById("workoutCard");
      workoutCard.style.display = "block";
      setTimeout(() => {
        workoutCard.classList.add('visible');
      }, 10);
      
      // Scroll to workout card smoothly
      workoutCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function startTimer(index) {
      clearInterval(countdowns[index]);
      let time = 30;
      const timerElement = document.getElementById("timer" + index);
      timerElement.innerText = time;
      
      // Add visual feedback to the button
      const button = timerElement.nextElementSibling;
      button.style.opacity = "0.7";
      button.disabled = true;
      
      countdowns[index] = setInterval(() => {
        time--;
        timerElement.innerText = time;
        
        if (time <= 0) {
          clearInterval(countdowns[index]);
          timerElement.innerText = "Done!";
          button.style.opacity = "1";
          button.disabled = false;
          
          // Add completion animation
          timerElement.style.animation = "pulse 0.5s infinite";
          setTimeout(() => {
            timerElement.style.animation = "";
          }, 2000);
        }
      }, 1000);
    }

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
          const run = ease(time极Elapsed, startPosition, distance, duration);
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

    // Smooth scroll to top function for the BackToTop button with adjustable speed
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