import { Phone } from "lucide-react";
import "./FloatingCallButton.css";

const FloatingCallButton = () => {
  const phoneNumber = "+919410053567";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <button
      className="floating-call-button"
      onClick={handleCall}
      aria-label="Call us"
      title="Call us: +91 94100 53567"
    >
      <Phone size={28} />
    </button>
  );
};

export default FloatingCallButton;
