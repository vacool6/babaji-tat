import { Star, Quote } from "lucide-react";
import "./TestimonialsSection.css";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  trip: string;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      comment: "Excellent service! The driver was very professional and the vehicle was spotlessly clean. Made our family trip to Manali absolutely comfortable and memorable.",
      trip: "Delhi to Manali",
    },
    {
      id: "2",
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "Best cab service I've used! Punctual, courteous drivers, and well-maintained cars. The booking process was smooth and prices were very reasonable.",
      trip: "Goa Tour Package",
    },
    {
      id: "3",
      name: "Amit Patel",
      location: "Bangalore",
      rating: 5,
      comment: "Highly recommend Babaji Tour & Travel! They helped us plan our entire Rajasthan trip. Great experience from start to finish with excellent customer support.",
      trip: "Rajasthan Heritage Tour",
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <span className="eyebrow">What Our Customers Say</span>
          <h2 className="section-title">Trusted by Thousands of Happy Travelers</h2>
          <p className="section-description">
            Real experiences from real travelers who have chosen us for their journeys across India.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="quote-icon">
                <Quote size={32} />
              </div>
              
              <div className="rating">
                {[...Array(testimonial.rating)].map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="testimonial-comment">{testimonial.comment}</p>

              <div className="testimonial-footer">
                <div className="customer-info">
                  <div className="customer-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="customer-details">
                    <h4 className="customer-name">{testimonial.name}</h4>
                    <p className="customer-location">{testimonial.location}</p>
                  </div>
                </div>
                <div className="trip-badge">{testimonial.trip}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
