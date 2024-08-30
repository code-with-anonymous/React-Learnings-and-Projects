import React, { useState } from "react";
import heroImage from "../../assets/hero.png";
import "../../Scss/components.scss"; // Assuming you separate CSS

export default function HeroSection() {
  

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Restoran</h1>
          <p className="hero-subtitle">Experience the best food in town</p>
          <button className="hero-button">Explore Menu</button>
        </div>
        <div className="hero-image-container">
          <img src={heroImage} alt="Delicious Food" className="hero-image" />
        </div>
      </section>
    </main>
  );
}
