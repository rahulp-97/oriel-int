import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import RouteEffects from './components/RouteEffects';
import Home from './pages/Home';
import Category from './pages/Category';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { categories } from './data/content';
import './styles/atlas.css';

export default function App() {
  return (
    <div className="atlas">
      <button className="site-skip" type="button" onClick={() => document.getElementById('main-content')?.focus()}>Skip to content</button>
      <RouteEffects />
      <Header />
      <div id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:slug" element={<Category />} />
          <Route path="/contact" element={<Contact categories={categories.map(item => item.name)} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
