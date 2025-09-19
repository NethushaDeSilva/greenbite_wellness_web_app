const recipes = [
    {
        id: 1,
        title: "Avocado Toast",
        category: "Breakfast",
        desc: "A simple, creamy avocado toast with a zesty twist.",
        ingredients: ["1 ripe avocado", "2 slices whole-grain bread", "1 tbsp lemon juice", "Pinch of salt", "Red chili flakes"],
        steps: ["Mash avocado with lemon juice and salt.", "Toast bread until golden.", "Spread avocado mix on toast.", "Sprinkle chili flakes."],
        nutrition: { calories: 200, protein: 5, carbs: 20, fat: 15 }
    },
    {
        id: 2,
        title: "Quinoa Salad",
        category: "Lunch",
        desc: "A refreshing salad packed with protein and veggies.",
        ingredients: ["1 cup cooked quinoa", "1 cucumber", "1 cup cherry tomatoes", "1/4 cup feta", "2 tbsp olive oil"],
        steps: ["Cook quinoa and let cool.", "Chop cucumber and tomatoes.", "Mix all ingredients with olive oil.", "Top with feta."],
        nutrition: { calories: 250, protein: 8, carbs: 30, fat: 10 }
    },
    {
        id: 3,
        title: "Grilled Chicken Wrap",
        category: "Lunch",
        desc: "A light, protein-rich wrap with fresh greens.",
        ingredients: ["1 chicken breast", "1 whole-wheat wrap", "1 cup spinach", "1 tbsp hummus", "1/4 avocado"],
        steps: ["Grill chicken until cooked.", "Spread hummus on wrap.", "Add sliced chicken, spinach, and avocado.", "Roll and serve."],
        nutrition: { calories: 300, protein: 25, carbs: 25, fat: 12 }
    },
    {
        id: 4,
        title: "Vegetable Stir-Fry",
        category: "Dinner",
        desc: "A colorful, low-calorie veggie stir-fry.",
        ingredients: ["1 cup broccoli", "1 bell pepper", "1 carrot", "2 tbsp soy sauce", "1 tbsp sesame oil"],
        steps: ["Chop vegetables.", "Heat oil in a pan.", "Stir-fry veggies until tender.", "Add soy sauce and serve."],
        nutrition: { calories: 180, protein: 5, carbs: 20, fat: 8 }
    },
    {
        id: 5,
        title: "Berry Smoothie",
        category: "Breakfast",
        desc: "A sweet, antioxidant-rich smoothie.",
        ingredients: ["1 cup mixed berries", "1 banana", "1 cup almond milk", "1 tbsp chia seeds"],
        steps: ["Blend all ingredients until smooth.", "Pour into a glass.", "Top with chia seeds."],
        nutrition: { calories: 200, protein: 4, carbs: 35, fat: 5 }
    },
    {
        id: 6,
        title: "Sri Lankan Dhal Curry",
        category: "Dinner",
        desc: "A creamy, spiced red lentil curry with coconut milk.",
        ingredients: ["1 cup red lentils", "1 cup coconut milk", "1 onion", "2 green chilies", "1 tsp turmeric", "1 tsp cumin seeds"],
        steps: ["Rinse lentils and cook until soft.", "Sauté onion, chilies, and spices.", "Add coconut milk and lentils.", "Simmer for 10 minutes."],
        nutrition: { calories: 220, protein: 10, carbs: 25, fat: 8 }
    },
    {
        id: 7,
        title: "Gotu Kola Sambol",
        category: "Lunch",
        desc: "A nutrient-packed green salad with fresh coconut.",
        ingredients: ["1 cup gotu kola leaves", "1/2 cup grated coconut", "1 onion", "1 green chili", "1 tbsp lime juice"],
        steps: ["Chop gotu kola and onion finely.", "Mix with coconut and chili.", "Add lime juice and salt.", "Serve fresh."],
        nutrition: { calories: 100, protein: 2, carbs: 10, fat: 6 }
    },
    {
        id: 8,
        title: "Polos Curry",
        category: "Dinner",
        desc: "A mild young jackfruit curry cooked in coconut milk.",
        ingredients: ["1 cup young jackfruit", "1 cup coconut milk", "1 tsp turmeric", "1 tsp mustard seeds", "1 onion"],
        steps: ["Boil jackfruit until soft.", "Sauté onion and spices.", "Add coconut milk and jackfruit.", "Simmer for 15 minutes."],
        nutrition: { calories: 200, protein: 4, carbs: 20, fat: 10 }
    },
    {
        id: 9,
        title: "Kola Kenda",
        category: "Breakfast",
        desc: "A healthy herbal porridge with gotu kola and coconut milk.",
        ingredients: ["1 cup gotu kola leaves", "1/2 cup rice", "1 cup coconut milk", "1 tsp salt"],
        steps: ["Blend gotu kola with water.", "Cook rice with gotu kola juice.", "Add coconut milk and salt.", "Stir until thick."],
        nutrition: { calories: 150, protein: 3, carbs: 20, fat: 5 }
    },