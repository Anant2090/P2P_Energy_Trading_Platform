import React from "react";
import "./ContactUs.css"; // Import custom CSS for styling

const ContactUs = () => {
  return (
    <div className="contact-container animate-fadeIn animate-slideIn">
      {/* Contact Form Section */}
      <div className="form-section">
        <h2>Contact Us</h2>
        <form>
          <div className="form-group">
            <label htmlFor="farmerName">Farmer Name:</label>
            <input type="text" id="farmerName" name="farmerName" placeholder="Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="farmerEmail">Farmer Email:</label>
            <input type="email" id="farmerEmail" name="farmerEmail" placeholder="Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" placeholder="Message" rows="4" required></textarea>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>

      {/* Contact Details Section */}
      <div className="contact-details">
        <p>Our Phone Number: 9657698135</p>
        <p>Our Email ID: customercare@p2pgmail.com</p>
      </div>
    </div>
  );
};

export default ContactUs;
