import { useState } from "react";

const CUISINES = ["Italian", "Indian", "Mexican", "Chinese", "French", "American", "Other"];

const DEFAULT_IMAGES = {
  Italian:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
  Indian:
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80",
  Mexican:
    "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1200&q=80",
  Chinese:
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
  French:
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80",
  American:
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  Other:
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
};

// A shared form for creating and editing recipes.
// "initialValues" pre-fills the form (used by the Edit page).
// "onSubmit" is called with the finished recipe object.
export default function RecipeForm({ initialValues, onSubmit, submitLabel }) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [cuisine, setCuisine] = useState(initialValues?.cuisine || "Italian");
  const [difficulty, setDifficulty] = useState(initialValues?.difficulty || "Easy");
  const [prepTime, setPrepTime] = useState(initialValues?.prepTime ?? 15);
  const [cookTime, setCookTime] = useState(initialValues?.cookTime ?? 20);
  const [servings, setServings] = useState(initialValues?.servings ?? 4);
  const [image, setImage] = useState(initialValues?.image || "");
  const [imagePreview, setImagePreview] = useState(initialValues?.image || "");
  const [ingredientsText, setIngredientsText] = useState(
    (initialValues?.ingredients || []).join("\n")
  );
  const [instructionsText, setInstructionsText] = useState(
    (initialValues?.instructions || []).join("\n")
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function linesToArray(text) {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }

  function handleFileUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setImage(result);
      setImagePreview(result);
      setError("");
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const ingredients = linesToArray(ingredientsText);
    const instructions = linesToArray(instructionsText);

    if (!title.trim() || !cuisine.trim()) {
      setError("Title and cuisine are required.");
      return;
    }
    if (ingredients.length === 0) {
      setError("Add at least one ingredient.");
      return;
    }
    if (instructions.length === 0) {
      setError("Add at least one instruction step.");
      return;
    }

    const finalImage = image.trim() || DEFAULT_IMAGES[cuisine] || DEFAULT_IMAGES.Other;

    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        cuisine: cuisine.trim(),
        difficulty,
        prepTime: Number(prepTime),
        cookTime: Number(cookTime),
        servings: Number(servings),
        image: finalImage,
        ingredients,
        instructions,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Recipe Title</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cuisine">Cuisine</label>
          <select id="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
            {CUISINES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="servings">Servings</label>
          <input
            id="servings"
            type="number"
            min="1"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="prepTime">Prep Time (minutes)</label>
          <input
            id="prepTime"
            type="number"
            min="0"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cookTime">Cook Time (minutes)</label>
          <input
            id="cookTime"
            type="number"
            min="0"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="image">Recipe Image</label>
        <input id="image" type="file" accept="image/*" onChange={handleFileUpload} className="file-input" />
        <p className="form-hint">Upload an image from your computer. Leave blank for a default photo.</p>
        {imagePreview && (
          <div className="image-preview-wrap">
            <img src={imagePreview} alt="Recipe preview" className="image-preview" />
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          id="ingredients"
          value={ingredientsText}
          onChange={(e) => setIngredientsText(e.target.value)}
          placeholder={"2 cups flour\n1 tsp salt\n1 cup sugar"}
        />
        <p className="form-hint">One ingredient per line.</p>
      </div>

      <div className="form-group">
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          value={instructionsText}
          onChange={(e) => setInstructionsText(e.target.value)}
          placeholder={"Preheat oven to 350°F\nMix dry ingredients\nBake for 20 minutes"}
        />
        <p className="form-hint">One step per line.</p>
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="btn" disabled={submitting}>
        {submitting ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}