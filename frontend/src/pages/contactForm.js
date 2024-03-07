import React from 'react';
import '../stylesheets/contactformstyles.css';

export default function ContactForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const subject = e.target.elements.subject.value;
        const message = e.target.elements.message.value;
        
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(message + '\n\nSent by: ' + name);
        window.location.href = `mailto:istiaque.ony@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-container">
                <input type="text" name="name" placeholder="Your Name" required />
            </div>
            <div className="input-container">
                <input type="text" name="subject" placeholder="Subject" required />
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
