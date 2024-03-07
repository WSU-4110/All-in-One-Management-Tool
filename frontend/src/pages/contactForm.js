import React from 'react';
import '../stylesheets/contactformstyles.css';

export default function ContactForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = 'mailto:istiaque.ony@gmail.com';
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-container">
                <input type="text" name="name" placeholder="Your Name" required />
            </div>
            <div className="input-container">
                <input type="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="input-container">
                <textarea name="message" placeholder="Your Message" required />
            </div>
            <div className="button-container">
                <button type="submit">Send Message</button>
            </div>
        </form>
    );
}
