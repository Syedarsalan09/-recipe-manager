import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRecipe, deleteRecipe } from "../api/api";

const DEFAULT_RECIPE_IMAGE =
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setRecipe(null);
    setError(null);
    getRecipe(id)
      .then((res) => setRecipe(res.data))
      .catch((err) => setError(err.response?.data?.message || "Recipe not found."));
  }, [id]);

  async function handleDelete() {
    if (!window.confirm(`Delete "${recipe.title}"? This can't be undone.`)) {
      return;
    }
    setDeleting(true);
    try {
      await deleteRecipe(id);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete recipe.");
      setDeleting(false);
    }
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
      <div className="detail-layout">
        <img
          src={recipe.image || DEFAULT_RECIPE_IMAGE}
          alt={recipe.title}
          onError={(event) => {
            event.currentTarget.src = DEFAULT_RECIPE_IMAGE;
          }}
        />

        <div>
          <span className="recipe-cuisine">{recipe.cuisine}</span>
          <h1>{recipe.title}</h1>

          <div className="detail-meta">
            <span>⏱ Prep: {recipe.prepTime} min</span>
            <span>🔥 Cook: {recipe.cookTime} min</span>
            <span>👥 Serves: {recipe.servings}</span>
            <span>📊 {recipe.difficulty}</span>
          </div>

          <h3 className="section-title">Ingredients</h3>
          <ul>
            {recipe.ingredients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="section-title">Instructions</h3>
          <ol>
            {recipe.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <div className="detail-actions">
            <Link to={`/edit/${recipe._id}`}>
              <button className="btn secondary">Edit</button>
            </Link>
            <button className="btn danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting…" : "Delete"}
            </button>
          </div>

          <Link to="/" className="back-link">
            ← Back to all recipes
          </Link>
        </div>
      </div>
    </main>
  );
}