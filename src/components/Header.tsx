import { Moon, Sun } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
export function Header({ theme, onTheme }: { theme: 'light' | 'dark'; onTheme: () => void }) {
 return <header><Link to="/" className="brand" aria-label="EchoLoop home"><span>e</span>EchoLoop</Link><nav aria-label="Primary navigation"><NavLink to="/about">About</NavLink><NavLink to="/faq">FAQ</NavLink><NavLink to="/privacy">Privacy</NavLink></nav><button className="theme-button" onClick={onTheme} aria-label="Toggle color theme">{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button></header>;
}
