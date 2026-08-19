import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import StaticMap from "../components/StaticMap/StaticMap";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("Contact form submitted:", formData);
    alert("Thank you for contacting us! We will get back to you shortly.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Contact Information Cards */}
        <div className="contact-info-grid">
          <div className="contact-info-card">
            <div className="contact-icon-wrapper">
              <Phone size={24} />
            </div>
            <h3 className="contact-info-title">Call Us</h3>
            <p className="contact-info-text">+91 94100 53567</p>
            <p className="contact-info-text">+91 70551 93596</p>
            <span className="contact-info-label">
              Mon-Sun: 8:00 AM - 10:00 PM
            </span>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon-wrapper">
              <Mail size={24} />
            </div>
            <h3 className="contact-info-title">Email Us</h3>
            <p className="contact-info-text">babajitravels42@gmail.com</p>
            <p className="contact-info-text">www.babajitravels.com</p>
            <span className="contact-info-label">We reply within 24 hours</span>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon-wrapper">
              <MapPin size={24} />
            </div>
            <h3 className="contact-info-title">Visit Us</h3>
            <p className="contact-info-text">Trade Center, 4, Bareilly - Nainital Rd</p>
            <p className="contact-info-text">Tikonia Chauraha, Haldwani</p>
            <span className="contact-info-label">Nainital, Uttarakhand - 263139</span>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon-wrapper">
              <Clock size={24} />
            </div>
            <h3 className="contact-info-title">Office Hours</h3>
            <p className="contact-info-text">Monday - Saturday</p>
            <p className="contact-info-text">9:00 AM - 7:00 PM</p>
            <span className="contact-info-label">Sunday: By Appointment</span>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="contact-form-section">
          <div className="contact-form-container">
            <div className="contact-form-header">
              <h2 className="contact-form-title">Send Us a Message</h2>
              <p className="contact-form-subtitle">
                Fill out the form below and we'll get back to you as soon as
                possible
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 94100 53567"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    className="form-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Subject</label>
                  <select
                    name="subject"
                    className="form-input"
                    value={formData.subject}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a subject</option>
                    <option value="cab-booking">Cab Booking Inquiry</option>
                    <option value="tour-package">Tour Package Inquiry</option>
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Tell us how we can help you..."
                  className="form-textarea"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="contact-map-container">
            <StaticMap
              lat={29.223506}
              lng={79.530468}
              address="Trade Center, 4, Bareilly - Nainital Rd, Tikonia Chauraha, Haldwani, Nainital, Uttarakhand - 263139"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
