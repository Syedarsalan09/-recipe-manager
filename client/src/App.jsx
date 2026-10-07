import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function NotFound() {
  return (
    <main className="wrap">
      <p className="empty-note">Page not found.</p>
    </main>
  );
}

export default App;