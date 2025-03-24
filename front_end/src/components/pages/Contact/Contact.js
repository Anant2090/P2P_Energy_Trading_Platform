import React from "react";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(() => {
        setStatus("Message sent successfully!");
        form.current.reset();
      })
      .catch(() => setStatus("Failed to send message. Try again."));
  };

  return (
    <div className="max-w-lg mx-auto mt-5 p-6 bg-gray-100 rounded-lg shadow-lg animate-fadeIn">
      {/* Contact Form Section */}
      <div className="mb-6">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
          Contact Us
        </h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label
              htmlFor="farmerName"
              className="block font-medium text-gray-700"
            >
              Farmer Name:
            </label>
            <input
              type="text"
              id="farmerName"
              name="user_name"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="farmerEmail"
              className="block font-medium text-gray-700"
            >
              Farmer Email:
            </label>
            <input
              type="email"
              name="user_email"
              placeholder="Email"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block font-medium text-gray-700"
            >
              Message:
            </label>
            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Submit
          </button>
          {status && (
            <h1 className={`text-green-500 text-2xl text-center p-2`}>
              {status}
            </h1>
          )}
        </form>
      </div>

      {/* Contact Details Section */}
      <div className="text-center text-gray-700">
        <p className="text-xl font-medium">Our Phone Number: 9657698135</p>
        <p className="text-xl font-medium">
          Our Email ID: customercare@p2pgmail.com
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
