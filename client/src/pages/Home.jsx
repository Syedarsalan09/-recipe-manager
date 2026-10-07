import { useEffect, useState } from "react";
import { getRecipes } from "../api/api";
import RecipeCard from "../components/RecipeCard";

const CUISINES = ["All", "Italian", "Indian", "Mexican", "Chinese", "French", "American", "Other"];

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [cuisine, setCuisine] = useState("All");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const params = {};
    if (cuisine !== "All") params.cuisine = cuisine;
    if (search) params.search = search;

    getRecipes(params)
      .then((res) => {
        if (!cancelled) setRecipes(res.data);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load recipes. Is the server running?");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cuisine, search]);

  function handleSearchChange(e) {
    const value = e.target.value.trimStart();
    setSearchInput(value);
    setSearch(value.trim());
  }

  return (
    <main className="wrap">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Fresh picks</p>
          <h1>Find your next favorite recipe</h1>
        </div>
      </section>

      <div className="filters">
        <div className="tabs">
          {CUISINES.map((c) => (
            <button
              key={c}
              className={`tab ${c === cuisine ? "active" : ""}`}
              onClick={() => setCuisine(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          className="search-box"
          type="text"
          value={searchInput}
          placeholder="Search recipes…"
          onChange={handleSearchChange}
        />
      </div>

      {loading && <p className="empty-note">Loading recipes…</p>}
      {!loading && error && <p className="empty-note">{error}</p>}
      {!loading && !error && recipes.length === 0 && (
        <p className="empty-note">No recipes match your search. Try another keyword or cuisine.</p>
      )}

      {!loading && !error && recipes.length > 0 && (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </main>
  );
}