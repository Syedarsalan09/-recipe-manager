import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Recipe from "../models/Recipe.js";

dotenv.config();

const recipes = [
  {
    title: "Classic Margherita Pizza",
    cuisine: "Italian",
    difficulty: "Medium",
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      "1 pizza dough ball",
      "1/2 cup tomato sauce",
      "200g fresh mozzarella, sliced",
      "Fresh basil leaves",
      "2 tbsp olive oil",
      "Salt to taste",
    ],
    instructions: [
      "Preheat oven to 475°F (245°C) with a pizza stone if you have one.",
      "Roll out the dough on a floured surface.",
      "Spread tomato sauce evenly, leaving a border for the crust.",
      "Add mozzarella slices and drizzle with olive oil.",
      "Bake for 12-15 minutes until the crust is golden.",
      "Top with fresh basil leaves and a pinch of salt before serving.",
    ],
  },
  {
    title: "Chicken Tikka Masala",
    cuisine: "Indian",
    difficulty: "Medium",
    prepTime: 30,
    cookTime: 40,
    servings: 4,
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      "500g chicken breast, cubed",
      "1 cup plain yogurt",
      "2 tbsp tikka masala spice mix",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 can crushed tomatoes",
      "1 cup heavy cream",
      "Fresh cilantro for garnish",
    ],
    instructions: [
      "Marinate chicken in yogurt and half the spice mix for at least 1 hour.",
      "Grill or pan-sear the chicken until cooked through, then set aside.",
      "Sauté onion and garlic until soft.",
      "Add remaining spice mix and cook for 1 minute until fragrant.",
      "Stir in crushed tomatoes and simmer for 10 minutes.",
      "Add cream and cooked chicken, simmer for another 10 minutes.",
      "Garnish with cilantro and serve with rice or naan.",
    ],
  },
  {
    title: "Classic Beef Tacos",
    cuisine: "Mexican",
    difficulty: "Easy",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    image:
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      "500g ground beef",
      "1 packet taco seasoning",
      "8 taco shells",
      "1 cup shredded lettuce",
      "1 cup shredded cheddar cheese",
      "1 tomato, diced",
      "Sour cream to serve",
    ],
    instructions: [
      "Brown the ground beef in a skillet over medium heat.",
      "Drain excess fat and stir in taco seasoning with a splash of water.",
      "Simmer for 5 minutes until thickened.",
      "Warm the taco shells according to package instructions.",
      "Fill each shell with beef, lettuce, cheese, and tomato.",
      "Top with sour cream and serve immediately.",
    ],
  },
  {
    title: "Vegetable Fried Rice",
    cuisine: "Chinese",
    difficulty: "Easy",
    prepTime: 15,
    cookTime: 10,
    servings: 3,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      "3 cups cooked, cooled rice",
      "2 eggs, beaten",
      "1 cup mixed frozen vegetables",
      "2 green onions, chopped",
      "3 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2 cloves garlic, minced",
    ],
    instructions: [
      "Heat sesame oil in a large wok or skillet over high heat.",
      "Scramble the eggs and set aside.",
      "Sauté garlic, then add mixed vegetables and cook for 3 minutes.",
      "Add rice, breaking up any clumps, and stir-fry for 5 minutes.",
      "Stir in soy sauce and scrambled eggs.",
      "Garnish with green onions and serve hot.",
    ],
  },
  {
    title: "French Onion Soup",
    cuisine: "French",
    difficulty: "Medium",
    prepTime: 15,
    cookTime: 60,
    servings: 4,
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      "4 large onions, thinly sliced",
      "3 tbsp butter",
      "6 cups beef broth",
      "1/2 cup dry white wine",
      "4 slices baguette",
      "1 cup grated Gruyère cheese",
      "2 sprigs fresh thyme",
    ],
    instructions: [
      "Melt butter in a large pot and add onions with a pinch of salt.",
      "Cook onions slowly over low heat for 40 minutes, stirring occasionally, until deeply caramelized.",
      "Deglaze with white wine, scraping up any browned bits.",
      "Add beef broth and thyme, simmer for 15 minutes.",
      "Ladle soup into oven-safe bowls, top with a baguette slice and Gruyère.",
      "Broil until cheese is bubbly and golden, about 3 minutes.",
    ],
  },
];

const seed = async () => {
  await connectDB();
  await Recipe.deleteMany({});
  await Recipe.insertMany(recipes);
  console.log(`Seeded ${recipes.length} recipes.`);
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});