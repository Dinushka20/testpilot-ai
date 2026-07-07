import { Link } from "react-router-dom";
import { Rocket, Moon, Sun } from "lucide-react";

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <Rocket size={24} />
        TestPilot AI
      </Link>
      
      <div className="nav-links">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
}