import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRecipe, updateRecipe } from "../api/api";
import RecipeForm from "../components/RecipeForm";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRecipe(id)
      .then((res) => setRecipe(res.data))
      .catch(() => setError("Recipe not found."));
  }, [id]);

  async function handleSubmit(recipeData) {
    const res = await updateRecipe(id, recipeData);
    navigate(`/recipe/${res.data._id}`);
  }

  if (error) {
    return (
      <main className="wrap">
        <p className="empty-note">
          {error} <Link to="/">Back to recipes</Link>
        </p>
      </main>
    );
  }

  if (!recipe) {
    return (
      <main className="wrap">
        <p className="empty-note">Loading…</p>
      </main>
    );
  }

  return (
    <main className="wrap">
      <h1 className="page-title">Edit Recipe</h1>
      <RecipeForm initialValues={recipe} onSubmit={handleSubmit} submitLabel="Update Recipe" />
    </main>
  );
}