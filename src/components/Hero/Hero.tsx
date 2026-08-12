import BookingCard from "../BookingCard/BookingCard";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Discover the Soul of India</h1>
        <p className="hero-subtitle">
          Premium cab services and curated journeys across the
          majestic landscapes of India
        </p>
      </div>
      <BookingCard />
    </section>
  );
};

export default Hero;
