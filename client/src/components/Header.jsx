import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <Link to="/" className="logo">
          🍲 Recipe Manager
        </Link>
        <Link to="/add" className="btn">
          + Add Recipe
        </Link>
      </div>
    </header>
  );
}