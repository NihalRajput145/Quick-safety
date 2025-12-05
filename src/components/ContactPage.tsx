import { motion } from 'motion/react';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import emailjs from "@emailjs/browser";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setSubmitted(true);

  try {
    const response = await fetch("https://formspree.io/f/xkgllraq", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });

    if (!response.ok) {
      console.error("Formspree error", await response.text());
    }

  } catch (err) {
    console.error("Network error:", err);
  }

  // Hide success screen after delay
  setTimeout(() => {
    setSubmitted(false);
  }, 3000);
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 9555731070', '+91 7701828545'],
      color: '#1d3557'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['niraj7379@gmail.com', 'nirajkumar65542@gmail.com'],
      color: '#1d3557'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['F-137, Deepawali enclave', 'Ismailpur, Faridabad, Haryana'],
      color: '#1d3557'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['24/7 Service Available', 'Office: Mon-Fri 9AM-6PM'],
      color: '#1d3557'
    }
  ];

  return (
    <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 style={{ color: '#1d3557' }} className="mb-4">
            Get In Touch
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#457b9d' }}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: '#a8dadc' }}
                >
                  <Icon className="w-7 h-7" style={{ color: info.color }} />
                </div>
                <h3 style={{ color: '#1d3557' }} className="mb-3">
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={i} style={{ color: '#457b9d' }} className="mb-1">
                    {detail}
                  </p>
                ))}
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: '#a8dadc' }}
                >
                  <Send className="w-10 h-10" style={{ color: '#1d3557' }} />
                </motion.div>
                <h3 style={{ color: '#1d3557' }} className="mb-3">
                  Message Sent Successfully!
                </h3>
                <p style={{ color: '#457b9d' }}>
                  We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 style={{ color: '#1d3557' }} className="mb-6">
                  Send Us a Message
                </h3>

                {/* form fields remain unchanged */}
                {/* ------------------------------ */}

                <div className="space-y-6">
                  {/* Name */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'name' || formData.name
                          ? 'top-2 text-xs'
                          : 'top-5 text-base'
                        }`}
                      style={{ color: focusedField === 'name' ? '#1d3557' : '#457b9d' }}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pt-8 pb-3 px-4 rounded-xl border-2 transition-all duration-300 outline-none"
                      style={{
                        borderColor: focusedField === 'name' ? '#a8dadc' : '#e5e5e5',
                        boxShadow: focusedField === 'name' ? '0 0 0 3px rgba(168, 218, 220, 0.1)' : 'none'
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'email' || formData.email
                          ? 'top-2 text-xs'
                          : 'top-5 text-base'
                        }`}
                      style={{ color: focusedField === 'email' ? '#1d3557' : '#457b9d' }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pt-8 pb-3 px-4 rounded-xl border-2 transition-all duration-300 outline-none"
                      style={{
                        borderColor: focusedField === 'email' ? '#a8dadc' : '#e5e5e5',
                        boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(168, 218, 220, 0.1)' : 'none'
                      }}
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'phone' || formData.phone
                          ? 'top-2 text-xs'
                          : 'top-5 text-base'
                        }`}
                      style={{ color: focusedField === 'phone' ? '#1d3557' : '#457b9d' }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pt-8 pb-3 px-4 rounded-xl border-2 transition-all duration-300 outline-none"
                      style={{
                        borderColor: focusedField === 'phone' ? '#a8dadc' : '#e5e5e5',
                        boxShadow: focusedField === 'phone' ? '0 0 0 3px rgba(168, 218, 220, 0.1)' : 'none'
                      }}
                    />
                  </div>

                  {/* Subject */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'subject' || formData.subject
                          ? 'top-2 text-xs'
                          : 'top-5 text-base'
                        }`}
                      style={{ color: focusedField === 'subject' ? '#1d3557' : '#457b9d' }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pt-8 pb-3 px-4 rounded-xl border-2 transition-all duration-300 outline-none"
                      style={{
                        borderColor: focusedField === 'subject' ? '#a8dadc' : '#e5e5e5',
                        boxShadow: focusedField === 'subject' ? '0 0 0 3px rgba(168, 218, 220, 0.1)' : 'none'
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'message' || formData.message
                          ? 'top-2 text-xs'
                          : 'top-5 text-base'
                        }`}
                      style={{ color: focusedField === 'message' ? '#1d3557' : '#457b9d' }}
                    >
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full pt-8 pb-3 px-4 rounded-xl border-2 transition-all duration-300 outline-none resize-none"
                      style={{
                        borderColor: focusedField === 'message' ? '#a8dadc' : '#e5e5e5',
                        boxShadow: focusedField === 'message' ? '0 0 0 3px rgba(168, 218, 220, 0.1)' : 'none'
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl text-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#1d3557' }}
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl overflow-hidden shadow-xl h-full min-h-[600px]"
          >
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: '#a8dadc' }}
            >
              <div className="text-center p-8">
                <MapPin className="w-20 h-20 mx-auto mb-4" style={{ color: '#1d3557' }} />
                <h3 style={{ color: '#1d3557' }} className="mb-2">
                  Visit Our Office
                </h3>
                <p style={{ color: '#457b9d' }}>
                  F-137, Deepawali enclave<br />
                  Ismailpur, Faridabad, Haryana
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
