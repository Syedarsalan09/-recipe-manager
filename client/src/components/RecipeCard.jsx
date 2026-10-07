import { Link } from "react-router-dom";

const DEFAULT_RECIPE_IMAGE =
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80";

export default function RecipeCard({ recipe }) {
  const imageSrc = recipe.image || DEFAULT_RECIPE_IMAGE;

  return (
    <Link to={`/recipe/${recipe._id}`} className="recipe-card-link">
      <div className="recipe-card">
        <img
          src={imageSrc}
          alt={recipe.title}
          onError={(event) => {
            event.currentTarget.src = DEFAULT_RECIPE_IMAGE;
          }}
        />
        <div className="recipe-card-body">
          <span className="recipe-cuisine">{recipe.cuisine}</span>
          <p className="recipe-title">{recipe.title}</p>
          <div className="recipe-meta">
            <span>⏱ {recipe.prepTime + recipe.cookTime} min</span>
            <span>👥 {recipe.servings}</span>
            <span>📊 {recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}