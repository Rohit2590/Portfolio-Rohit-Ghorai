import { useState } from 'react'
import {
  Mail,
  Send,
  Copy,
  Check,
  Sparkles,
  MapPin,
  Calendar,
  MessageSquare,
} from 'lucide-react'
import { Github, Linkedin } from './SocialIcons'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const email = 'dasarathghorai2019@gmail.com'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setFormSubmitted(true)
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="section-header">
        <span className="section-badge">
          <Sparkles size={14} />
          <span>Get In Touch</span>
        </span>
        <h2 className="section-title">Let's Build Something Exceptional</h2>
        <p className="section-subtitle">
          Have an exciting project, freelance opportunity, or web development inquiry? Feel free to reach out directly.
        </p>
      </div>

      <div className="contact-container">
        {/* Left Side: Contact Information & Cards */}
        <div className="contact-info-panel">
          <div className="contact-card-highlight">
            <div className="status-indicator">
              <span className="pulse-dot" />
              <span>Available for new opportunities</span>
            </div>

            <h3>Connect with Rohit</h3>
            <p>
              I'm always open to discussing new projects, creative concepts, or frontend development roles.
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-row">
                <div className="contact-icon-bubble">
                  <Mail size={18} />
                </div>
                <div className="contact-detail-text">
                  <span className="label">Direct Email</span>
                  <a href={`mailto:${email}`} className="value">
                    {email}
                  </a>
                </div>
                <button
                  type="button"
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              <div className="contact-detail-row">
                <div className="contact-icon-bubble">
                  <MapPin size={18} />
                </div>
                <div className="contact-detail-text">
                  <span className="label">Location</span>
                  <span className="value">India • Remote Friendly</span>
                </div>
              </div>

              <div className="contact-detail-row">
                <div className="contact-icon-bubble">
                  <Calendar size={18} />
                </div>
                <div className="contact-detail-text">
                  <span className="label">Availability</span>
                  <span className="value">Immediate / Full-time & Contract</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-links-group">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="social-btn"
                aria-label="Send Email"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="contact-form-panel">
          {formSubmitted ? (
            <div className="form-success-box">
              <div className="success-icon-bubble">
                <Check size={32} />
              </div>
              <h3>Message Sent Successfully!</h3>
              <p>
                Thank you for getting in touch, <strong>{formData.name}</strong>. I will review your note and get back to you at <strong>{formData.email}</strong> shortly.
              </p>
              <button
                type="button"
                className="btn secondary"
                onClick={() => {
                  setFormSubmitted(false)
                  setFormData({ name: '', email: '', message: '' })
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send a Message</h3>
              <p className="form-subtitle">Fill out the form below and I will respond as soon as possible.</p>

              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Your Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Tell me about your project, timeline, or idea..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn primary submit-btn">
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
