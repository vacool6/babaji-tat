import whatsappIcon from "../../assets/whatsapp.svg";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open(
      "https://chat.whatsapp.com/G6C93A83S9U5FEXdU57GAn?s=cl&p=a&ilr=0",
      "_blank",
    );
  };

  return (
    <button
      className="whatsapp-float-btn"
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
    >
      <img src={whatsappIcon} alt="WhatsApp" width="28" height="28" />
    </button>
  );
};

export default WhatsAppButton;
