import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    cuisine: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    prepTime: {
      type: Number,
      required: true,
      min: 0,
    },
    cookTime: {
      type: Number,
      required: true,
      min: 0,
    },
    servings: {
      type: Number,
      required: true,
      min: 1,
    },
    image: {
      type: String,
      default: "",
    },
    ingredients: {
      type: [String],
      required: true,
      validate: (v) => v.length > 0,
    },
    instructions: {
      type: [String],
      required: true,
      validate: (v) => v.length > 0,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;