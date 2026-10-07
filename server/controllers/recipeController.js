import Recipe from "../models/Recipe.js";

// GET /api/recipes?cuisine=&search=
export const getRecipes = async (req, res) => {
  try {
    const { cuisine, search } = req.query;
    const filter = {};

    if (cuisine && cuisine !== "All") {
      filter.cuisine = cuisine;
    }

    if (search) {
      const cleanSearch = String(search).trim();
      const escapedSearch = cleanSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter.$or = [
        { title: new RegExp(escapedSearch, "i") },
        { cuisine: new RegExp(escapedSearch, "i") },
        { ingredients: { $regex: escapedSearch, $options: "i" } },
        { instructions: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    const recipes = await Recipe.find(filter).sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/recipes/:id
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(404).json({ message: "Recipe not found." });
  }
};

// POST /api/recipes
export const createRecipe = async (req, res) => {
  try {
    const {
      title,
      cuisine,
      difficulty,
      prepTime,
      cookTime,
      servings,
      image,
      ingredients,
      instructions,
    } = req.body;

    if (!title || !cuisine || !ingredients?.length || !instructions?.length) {
      return res.status(400).json({
        message: "Title, cuisine, ingredients, and instructions are required.",
      });
    }

    const recipe = await Recipe.create({
      title,
      cuisine,
      difficulty,
      prepTime,
      cookTime,
      servings,
      image,
      ingredients,
      instructions,
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/recipes/:id
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/recipes/:id
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }
    res.status(200).json({ message: "Recipe deleted.", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};