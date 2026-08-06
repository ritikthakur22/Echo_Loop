import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { useAppStore } from './store/useAppStore';
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('./pages/InfoPages').then((m) => ({ default: m.About })));
const FAQ = lazy(() => import('./pages/InfoPages').then((m) => ({ default: m.FAQ })));
const Privacy = lazy(() => import('./pages/InfoPages').then((m) => ({ default: m.Privacy })));
export default function App() { const { theme, toggleTheme } = useAppStore(); useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]); return <><Header theme={theme} onTheme={toggleTheme} /><Suspense fallback={<main className="loading">Loading EchoLoop…</main>}><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/faq" element={<FAQ />} /><Route path="/privacy" element={<Privacy />} /></Routes></Suspense></>; }
