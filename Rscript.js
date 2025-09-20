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

// Navbar drops down from top when home section is in view
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


// Recipe data JavaScript
    const recipes = [
      {
        id: 1,
        title: "Greek Salad Bowl",
        category: "lunch",
        image: "./imgs/recipies/greek-salad-cottage-cheese-bowl.avif",
        description: "A refreshing Mediterranean salad with crisp vegetables, feta cheese, and a tangy dressing.",
        prepTime: "15 mins",
        calories: 320,
        ingredients: [
          "2 cups mixed greens",
          "1 cucumber, diced",
          "1 cup cherry tomatoes, halved",
          "1/2 red onion, thinly sliced",
          "1/2 cup feta cheese, crumbled",
          "1/4 cup Kalamata olives",
          "2 tbsp olive oil",
          "1 tbsp lemon juice",
          "1 tsp dried oregano",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Wash and prepare all vegetables.",
          "In a large bowl, combine greens, cucumber, tomatoes, onion, and olives.",
          "In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.",
          "Pour dressing over salad and toss to combine.",
          "Top with crumbled feta cheese and serve immediately."
        ],
        nutrition: {
          calories: 320,
          protein: "12g",
          carbs: "18g",
          fat: "22g",
          fiber: "5g",
          sugar: "10g"
        }
      },
      {
        id: 2,
        title: "Salmon Quinoa Bowl",
        category: "dinner",
        image: "./imgs/recipies/salmon-quinoa-bowl.avif",
        description: "Nutrient-packed bowl with grilled salmon, fluffy quinoa, and roasted vegetables.",
        prepTime: "25 mins",
        calories: 480,
        ingredients: [
          "1 salmon fillet (6 oz)",
          "1/2 cup quinoa, uncooked",
          "1 cup vegetable broth",
          "1 cup broccoli florets",
          "1/2 red bell pepper, sliced",
          "1 tbsp olive oil",
          "1 tsp garlic powder",
          "1/2 tsp paprika",
          "Lemon wedges for serving",
          "Fresh dill for garnish"
        ],
        instructions: [
          "Cook quinoa in vegetable broth according to package instructions.",
          "Preheat oven to 400°F (200°C).",
          "Season salmon with garlic powder, paprika, salt, and pepper.",
          "Toss broccoli and bell pepper with olive oil and spread on a baking sheet.",
          "Place salmon on the same sheet and bake for 12-15 minutes.",
          "Fluff quinoa and divide between bowls.",
          "Top with roasted vegetables and salmon.",
          "Garnish with fresh dill and serve with lemon wedges."
        ],
        nutrition: {
          calories: 480,
          protein: "30g",
          carbs: "42g",
          fat: "20g",
          fiber: "7g",
          sugar: "4g"
        }
      },
      {
        id: 3,
        title: "Banana Peanut Butter Toast",
        category: "breakfast",
        image: "./imgs/recipies/banana-peanut-butter-toast.webp",
        description: "A satisfying breakfast toast with creamy peanut butter and sliced bananas.",
        prepTime: "5 mins",
        calories: 280,
        ingredients: [
          "2 slices whole grain bread",
          "2 tbsp natural peanut butter",
          "1 banana, sliced",
          "1 tsp honey (optional)",
          "Pinch of cinnamon"
        ],
        instructions: [
          "Toast bread to desired crispness.",
          "Spread peanut butter evenly on both slices.",
          "Arrange banana slices on top of peanut butter.",
          "Drizzle with honey if desired and sprinkle with cinnamon.",
          "Serve immediately."
        ],
        nutrition: {
          calories: 280,
          protein: "10g",
          carbs: "38g",
          fat: "12g",
          fiber: "6g",
          sugar: "16g"
        }
      },
      {
        id: 4,
        title: "Keto Smoothie",
        category: "smoothie",
        image: "./imgs/recipies/keto-smoothie.avif",
        description: "A low-carb, high-fat smoothie perfect for keto diets and quick energy.",
        prepTime: "5 mins",
        calories: 380,
        ingredients: [
          "1 cup unsweetened almond milk",
          "1/4 avocado",
          "1 tbsp almond butter",
          "1 scoop collagen peptides or protein powder",
          "1 tbsp MCT oil",
          "1/2 tsp cinnamon",
          "Handful of ice",
          "Stevia or erythritol to taste (optional)"
        ],
        instructions: [
          "Combine all ingredients in a blender.",
          "Blend on high until smooth and creamy.",
          "Taste and adjust sweetness if needed.",
          "Pour into a glass and enjoy immediately."
        ],
        nutrition: {
          calories: 380,
          protein: "20g",
          carbs: "8g",
          fat: "32g",
          fiber: "6g",
          sugar: "2g"
        }
      },
      {
        id: 5,
        title: "PB&J Parfait",
        category: "snack",
        image: "./imgs/recipies/delish-pb-j-parfait.avif",
        description: "A healthier take on the classic PB&J in parfait form with Greek yogurt.",
        prepTime: "10 mins",
        calories: 240,
        ingredients: [
          "1 cup Greek yogurt",
          "2 tbsp peanut butter powder",
          "1/4 cup mixed berries",
          "1 tbsp sugar-free jam or preserves",
          "2 tbsp granola",
          "1 tsp chia seeds (optional)"
        ],
        instructions: [
          "In a small bowl, mix Greek yogurt with peanut butter powder.",
          "In a glass, layer half of the yogurt mixture.",
          "Add a layer of berries and a dollop of jam.",
          "Repeat layers with remaining ingredients.",
          "Top with granola and chia seeds.",
          "Serve immediately or refrigerate for up to 2 hours."
        ],
        nutrition: {
          calories: 240,
          protein: "18g",
          carbs: "24g",
          fat: "8g",
          fiber: "4g",
          sugar: "14g"
        }
      },
      {
        id: 6,
        title: "Carbonara Deviled Eggs",
        category: "snack",
        image: "./imgs/recipies/carbonaradeviledeggs.avif",
        description: "A creative twist on deviled eggs with carbonara flavors of bacon and Parmesan.",
        prepTime: "20 mins",
        calories: 180,
        ingredients: [
          "6 hard-boiled eggs",
          "2 strips bacon, cooked and crumbled",
          "2 tbsp Greek yogurt or mayonnaise",
          "1 tbsp grated Parmesan cheese",
          "1 tsp Dijon mustard",
          "1 tbsp fresh chives, chopped",
          "Black pepper to taste",
          "Paprika for garnish"
        ],
        instructions: [
          "Cut eggs in half lengthwise and remove yolks.",
          "In a bowl, mash yolks with Greek yogurt, Parmesan, and mustard.",
          "Stir in half of the bacon and chives.",
          "Season with black pepper to taste.",
          "Spoon or pipe filling back into egg whites.",
          "Garnish with remaining bacon, chives, and a sprinkle of paprika.",
          "Chill for at least 30 minutes before serving."
        ],
        nutrition: {
          calories: 180,
          protein: "12g",
          carbs: "2g",
          fat: "14g",
          fiber: "0g",
          sugar: "1g"
        }
      },
      {
        id: 7,
        title: "Avocado Toast with Poached Eggs",
        category: "breakfast",
        image: "./imgs/recipies/avocado-toast-with-poached-eggs.jpg",
        description: "Creamy avocado on whole grain toast topped with perfectly poached eggs.",
        prepTime: "15 mins",
        calories: 350,
        ingredients: [
          "2 slices whole grain bread",
          "1 ripe avocado",
          "2 eggs",
          "1 tbsp lemon juice",
          "Salt and pepper to taste",
          "Red pepper flakes (optional)"
        ],
        instructions: [
          "Toast the bread until golden and crisp.",
          "Mash the avocado with lemon juice, salt, and pepper.",
          "Poach the eggs in simmering water for 3-4 minutes.",
          "Spread avocado on toast and top with poached eggs.",
          "Season with salt, pepper, and red pepper flakes."
        ],
        nutrition: {
          calories: 350,
          protein: "15g",
          carbs: "28g",
          fat: "22g",
          fiber: "10g",
          sugar: "2g"
        }
      },
      {
        id: 8,
        title: "Quinoa Stuffed Bell Peppers",
        category: "dinner",
        image: "./imgs/recipies/Quinoa Stuffed Bell Peppers.jpeg",
        description: "Colorful bell peppers filled with protein-packed quinoa and vegetables.",
        prepTime: "40 mins",
        calories: 280,
        ingredients: [
          "4 bell peppers",
          "1 cup quinoa, cooked",
          "1 cup black beans",
          "1 cup corn",
          "1/2 cup diced tomatoes",
          "1/2 onion, diced",
          "1 tsp cumin",
          "1/2 cup cheese (optional)",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Preheat oven to 375°F (190°C).",
          "Cut tops off peppers and remove seeds.",
          "Sauté onions until translucent, then mix with other ingredients.",
          "Stuff peppers with quinoa mixture.",
          "Bake for 25-30 minutes until peppers are tender."
        ],
        nutrition: {
          calories: 280,
          protein: "12g",
          carbs: "45g",
          fat: "6g",
          fiber: "9g",
          sugar: "8g"
        }
      },
      {
        id: 9,
        title: "Berry Spinach Smoothie",
        category: "smoothie",
        image: "./imgs/recipies/Berry Spinach Smoothie.jpg",
        description: "A nutrient-packed smoothie that's both delicious and energizing.",
        prepTime: "5 mins",
        calories: 220,
        ingredients: [
          "1 cup spinach",
          "1/2 cup mixed berries",
          "1 banana",
          "1 tbsp chia seeds",
          "1 cup almond milk",
          "1/2 cup Greek yogurt"
        ],
        instructions: [
          "Add all ingredients to blender.",
          "Blend until smooth and creamy.",
          "Add more liquid if needed for desired consistency.",
          "Serve immediately."
        ],
        nutrition: {
          calories: 220,
          protein: "12g",
          carbs: "35g",
          fat: "5g",
          fiber: "8g",
          sugar: "20g"
        }
      },
      {
        id: 10,
        title: "Mediterranean Chickpea Bowl",
        category: "lunch",
        image: "./imgs/recipies/Mediterranean Chickpea Bowl.jpg",
        description: "A fresh and flavorful bowl with chickpeas, veggies, and tahini dressing.",
        prepTime: "20 mins",
        calories: 380,
        ingredients: [
          "1 can chickpeas, drained",
          "1 cup cherry tomatoes, halved",
          "1 cucumber, diced",
          "1/2 red onion, sliced",
          "1/4 cup kalamata olives",
          "2 tbsp tahini",
          "1 tbsp lemon juice",
          "1 tsp olive oil",
          "Fresh parsley"
        ],
        instructions: [
          "Combine chickpeas, tomatoes, cucumber, onion, and olives.",
          "Whisk together tahini, lemon juice, and olive oil for dressing.",
          "Pour dressing over salad and toss to combine.",
          "Garnish with fresh parsley."
        ],
        nutrition: {
          calories: 380,
          protein: "14g",
          carbs: "45g",
          fat: "18g",
          fiber: "12g",
          sugar: "10g"
        }
      },
      {
        id: 11,
        title: "Zucchini Noodles with Pesto",
        category: "dinner",
        image: "./imgs/recipies/Zucchini Noodles with Pesto.avif",
        description: "A low-carb alternative to pasta with fresh homemade pesto.",
        prepTime: "15 mins",
        calories: 240,
        ingredients: [
          "3 medium zucchinis",
          "2 cups fresh basil",
          "1/4 cup pine nuts",
          "2 cloves garlic",
          "1/4 cup olive oil",
          "1/4 cup Parmesan cheese",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Spiralize zucchinis into noodles.",
          "Blend basil, pine nuts, garlic, and cheese in food processor.",
          "Slowly add olive oil while processing until smooth.",
          "Toss zucchini noodles with pesto and serve immediately."
        ],
        nutrition: {
          calories: 240,
          protein: "8g",
          carbs: "12g",
          fat: "20g",
          fiber: "4g",
          sugar: "6g"
        }
      },
      {
        id: 12,
        title: "Dark Chocolate Avocado Mousse",
        category: "snack",
        image: "./imgs/recipies/Dark Chocolate Avocado Mousse.webp",
        description: "A rich and creamy dessert made with wholesome ingredients.",
        prepTime: "10 mins",
        calories: 180,
        ingredients: [
          "2 ripe avocados",
          "1/4 cup cocoa powder",
          "1/4 cup maple syrup",
          "1 tsp vanilla extract",
          "Pinch of salt",
          "Fresh berries for topping"
        ],
        instructions: [
          "Scoop avocado flesh into food processor.",
          "Add cocoa powder, maple syrup, vanilla, and salt.",
          "Blend until completely smooth.",
          "Chill for at least 1 hour before serving.",
          "Top with fresh berries."
        ],
        nutrition: {
          calories: 180,
          protein: "3g",
          carbs: "18g",
          fat: "13g",
          fiber: "7g",
          sugar: "10g"
        }
      },
      {
        id: 13,
        title: "Vegan Buddha Bowl",
        category: "lunch",
        image: "./imgs/recipies/Vegan Buddha Bowl.jpg",
        description: "A nourishing plant-based bowl with grains, veggies, and tahini dressing.",
        prepTime: "25 mins",
        calories: 420,
        ingredients: [
          "1 cup cooked quinoa",
          "1 cup roasted sweet potatoes",
          "1 cup steamed broccoli",
          "1/2 cup chickpeas",
          "1 avocado, sliced",
          "2 tbsp tahini",
          "1 tbsp lemon juice",
          "1 tsp maple syrup"
        ],
        instructions: [
          "Arrange quinoa, sweet potatoes, broccoli, chickpeas, and avocado in bowl.",
          "Whisk together tahini, lemon juice, and maple syrup for dressing.",
          "Drizzle dressing over bowl and serve."
        ],
        nutrition: {
          calories: 420,
          protein: "14g",
          carbs: "58g",
          fat: "18g",
          fiber: "15g",
          sugar: "12g"
        }
      },
      {
        id: 14,
        title: "Keto Cauliflower Fried Rice",
        category: "dinner",
        image: "./imgs/recipies/Keto Cauliflower Fried Rice.avif",
        description: "A low-carb version of fried rice using cauliflower as the base.",
        prepTime: "20 mins",
        calories: 180,
        ingredients: [
          "1 head cauliflower, riced",
          "2 eggs, beaten",
          "1/2 cup peas and carrots",
          "2 tbsp soy sauce (or coconut aminos)",
          "1 tsp sesame oil",
          "2 green onions, sliced",
          "1 tbsp avocado oil"
        ],
        instructions: [
          "Heat avocado oil in large pan.",
          "Add peas and carrots, cook until tender.",
          "Push veggies to side, scramble eggs in empty space.",
          "Add cauliflower rice and cook for 5-7 minutes.",
          "Stir in soy sauce and sesame oil.",
          "Garnish with green onions."
        ],
        nutrition: {
          calories: 180,
          protein: "10g",
          carbs: "12g",
          fat: "10g",
          fiber: "5g",
          sugar: "4g"
        }
      },
      {
        id: 15,
        title: "Turkey and Veggie Meatballs",
        category: "dinner",
        image: "./imgs/recipies/Turkey and Veggie Meatballs.avif",
        description: "Lean protein-packed meatballs with hidden vegetables.",
        prepTime: "30 mins",
        calories: 220,
        ingredients: [
          "1 lb ground turkey",
          "1/2 cup grated zucchini",
          "1/4 cup grated carrot",
          "1/4 cup breadcrumbs",
          "1 egg",
          "2 cloves garlic, minced",
          "1 tsp Italian seasoning",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Preheat oven to 400°F (200°C).",
          "Combine all ingredients in a bowl.",
          "Form into 1-inch balls and place on baking sheet.",
          "Bake for 20-25 minutes until cooked through.",
          "Serve with marinara sauce and zucchini noodles."
        ],
        nutrition: {
          calories: 220,
          protein: "25g",
          carbs: "8g",
          fat: "10g",
          fiber: "1g",
          sugar: "2g"
        }
      },
      {
        id: 16,
        title: "Chia Seed Pudding",
        category: "snack",
        image: "./imgs/recipies/Chia Seed Pudding.avif",
        description: "A make-ahead breakfast or snack packed with omega-3s and fiber.",
        prepTime: "5 mins",
        calories: 190,
        ingredients: [
          "1/4 cup chia seeds",
          "1 cup almond milk",
          "1 tbsp maple syrup",
          "1/2 tsp vanilla extract",
          "Fresh berries for topping"
        ],
        instructions: [
          "Whisk together chia seeds, almond milk, maple syrup, and vanilla.",
          "Let sit for 5 minutes, then whisk again to prevent clumping.",
          "Cover and refrigerate for at least 4 hours or overnight.",
          "Top with fresh berries before serving."
        ],
        nutrition: {
          calories: 190,
          protein: "5g",
          carbs: "22g",
          fat: "10g",
          fiber: "10g",
          sugar: "10g"
        }
      }
    ];




    // DOM elements
    const recipeContainer = document.getElementById('recipeContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('recipeSearch');
    const modal = document.getElementById('recipeModal');
    const closeModal = document.getElementById('closeModal');
    const modalContent = document.getElementById('modalContent');

    // Display recipes based on current filter and search
    function displayRecipes(filter = 'all', searchTerm = '') {
      recipeContainer.innerHTML = '';
      
      const filteredRecipes = recipes.filter(recipe => {
        const matchesFilter = filter === 'all' || recipe.category === filter;
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
      });
      
      if (filteredRecipes.length === 0) {
        recipeContainer.innerHTML = '<p class="no-results">No recipes found. Try a different search or filter.</p>';
        return;
      }
      
      filteredRecipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
          <div class="recipe-content">
            <h3 class="recipe-title">${recipe.title}</h3>
            <p class="recipe-description">${recipe.description}</p>
            <div class="recipe-meta">
              <span>${recipe.prepTime}</span>
              <span>${recipe.calories} cal</span>
            </div>
          </div>
        `;
        
        recipeCard.addEventListener('click', () => openRecipeModal(recipe));
        recipeContainer.appendChild(recipeCard);
      });
    }

    // Open modal with recipe details
    function openRecipeModal(recipe) {
      modalContent.innerHTML = `
        <div class="modal-header">
          <h2 class="modal-title">${recipe.title}</h2>
          <span class="recipe-category">${recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}</span>
        </div>
        <img src="${recipe.image}" alt="${recipe.title}" class="modal-image">
        <div class="modal-content-grid">
          <div class="ingredients-section">
            <h3 class="section-title">Ingredients</h3>
            <ul class="ingredients-list">
              ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
          </div>
          <div class="instructions-section">
            <h3 class="section-title">Instructions</h3>
            <ol class="instructions-list">
              ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
            </ol>
          </div>
          <div class="nutrition-section">
            <h3 class="section-title">Nutrition Information</h3>
            <table class="nutrition-table">
              <tr>
                <th>Calories</th>
                <td>${recipe.nutrition.calories}</td>
              </tr>
              <tr>
                <th>Protein</th>
                <td>${recipe.nutrition.protein}</td>
              </tr>
              <tr>
                <th>Carbohydrates</th>
                <td>${recipe.nutrition.carbs}</td>
              </tr>
              <tr>
                <th>Fat</th>
                <td>${recipe.nutrition.fat}</td>
              </tr>
              <tr>
                <th>Fiber</th>
                <td>${recipe.nutrition.fiber}</td>
              </tr>
              <tr>
                <th>Sugar</th>
                <td>${recipe.nutrition.sugar}</td>
              </tr>
            </table>
          </div>
        </div>
      `;
      
      modal.classList.add('active');
    }

    // Close modal
    closeModal.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    // Filter buttons event listeners
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayRecipes(button.dataset.filter, searchInput.value);
      });
    });

    // Search functionality
    searchInput.addEventListener('input', () => {
      const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
      displayRecipes(activeFilter, searchInput.value);
    });

    // Initialize the page with all recipes
    document.addEventListener('DOMContentLoaded', () => {
      displayRecipes();
    });









    //Adding New Settler Subscription


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