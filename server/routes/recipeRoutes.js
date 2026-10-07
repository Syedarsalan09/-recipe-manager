import express from "express";
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getRecipes);
router.post("/", createRecipe);
router.get("/:id", getRecipeById);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;