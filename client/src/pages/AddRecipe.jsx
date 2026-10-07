import { useNavigate } from "react-router-dom";
import { createRecipe } from "../api/api";
import RecipeForm from "../components/RecipeForm";

export default function AddRecipe() {
  const navigate = useNavigate();

  async function handleSubmit(recipeData) {
    const res = await createRecipe(recipeData);
    navigate(`/recipe/${res.data._id}`);
  }

  return (
    <main className="wrap">
      <h1 className="page-title">Add a New Recipe</h1>
      <RecipeForm onSubmit={handleSubmit} submitLabel="Save Recipe" />
    </main>
  );
}