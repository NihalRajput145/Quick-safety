import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Calendar, Clock, MapPin, User, Phone, Mail, FileText, Sparkles } from 'lucide-react';

export function BookingPage({ currentPage }: { currentPage: string }) {

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: '',
    date: '',
    time: '',
    duration: '',
    notes: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const services = [
    'Security Guard',
    'Bouncer',
    'PSO (Personal Security Officer)',
    'Servant / Aaya',
    'Driver',
    'Electrician'
  ];

  const durations = [
    '1 Hour',
    '2 Hours',
    '4 Hours',
    'Half Day (12 hours)',
    'Full Day (24 hours)',
    'Weekly',
    'Monthly'
  ];

  // ⭐ AUTO-SELECT SERVICE SENT FROM SERVICES PAGE
  useEffect(() => {
    if (!currentPage) return;

    const parts = currentPage.split("?");
    if (parts.length < 2) return;

    const params = new URLSearchParams(parts[1]);
    const selectedService = params.get("service");

    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        serviceType: selectedService
      }));
    }
  }, [currentPage]);

  // BACKEND URL LOGIC
  const getBackendURL = () => {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return "/api/bookings";
    }
    return "https://quick-security-backend.onrender.com/api/bookings";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      full_name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service_type: formData.serviceType,
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      address: formData.address,
      notes: formData.notes
    };

    setSubmitted(true);

    try {
      const url = getBackendURL();
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data?.message || "Failed to submit booking.");
      } else {
        toast.success(data?.message || "Booking submitted successfully!");
      }

    } catch (err: any) {
      toast.error(err?.message || "Network error submitting booking.");
    }

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        serviceType: "",
        date: "",
        time: "",
        duration: "",
        notes: ""
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 style={{ color: '#1d3557' }} className="mb-4">Book Your Service</h1>
          <p className="text-xl" style={{ color: '#457b9d' }}>
            Fill out the form below and we'll get back to you shortly
          </p>
        </motion.div>

        {/* SUCCESS SCREEN */}
        {submitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-12 text-center shadow-xl"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.6 }} className="inline-block mb-6">
              <Sparkles className="w-20 h-20" style={{ color: '#a8dadc' }} />
            </motion.div>
            <h2 style={{ color: '#1d3557' }} className="mb-4">Booking Submitted Successfully!</h2>
            <p className="text-xl" style={{ color: '#457b9d' }}>
              We'll contact you shortly to confirm your booking.
            </p>
          </motion.div>
        ) : (

          /* MAIN FORM */
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              {/* NAME */}
              <div className="relative">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'name' || formData.name ? 'top-2 text-xs' : 'top-5 text-base'
                  }`}
                  style={{ color: focusedField === 'name' ? '#1d3557' : '#457b9d' }}
                >
                  <User className="inline w-4 h-4 mr-2" /> Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pt-8 pb-3 px-4 rounded-xl border-2 outline-none transition-all"
                  style={{
                    borderColor: focusedField === 'name' ? '#a8dadc' : '#e5e5e5',
                    boxShadow: focusedField === 'name' ? '0 0 0 3px rgba(168,218,220,0.1)' : 'none'
                  }}
                />
              </div>

              {/* PHONE */}
              <div className="relative">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'phone' || formData.phone ? 'top-2 text-xs' : 'top-5 text-base'
                  }`}
                  style={{ color: focusedField === 'phone' ? '#1d3557' : '#457b9d' }}
                >
                  <Phone className="inline w-4 h-4 mr-2" /> Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pt-8 pb-3 px-4 rounded-xl border-2 outline-none transition-all"
                  style={{
                    borderColor: focusedField === 'phone' ? '#a8dadc' : '#e5e5e5',
                    boxShadow: focusedField === 'phone' ? '0 0 0 3px rgba(168,218,220,0.1)' : 'none'
                  }}
                />
              </div>

              {/* EMAIL */}
              <div className="relative">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'email' || formData.email ? 'top-2 text-xs' : 'top-5 text-base'
                  }`}
                  style={{ color: focusedField === 'email' ? '#1d3557' : '#457b9d' }}
                >
                  <Mail className="inline w-4 h-4 mr-2" /> Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pt-8 pb-3 px-4 rounded-xl border-2 outline-none transition-all"
                  style={{
                    borderColor: focusedField === 'email' ? '#a8dadc' : '#e5e5e5',
                    boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(168,218,220,0.1)' : 'none'
                  }}
                />
              </div>

              {/* SERVICE TYPE (AUTO-SELECTED) */}
              <div className="relative">
                <label
                  className="absolute left-4 top-2 text-xs pointer-events-none"
                  style={{ color: focusedField === 'serviceType' ? '#1d3557' : '#457b9d' }}
                >
                  Service Type
                </label>

                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('serviceType')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pt-8 pb-3 px-4 rounded-xl border-2 outline-none"
                  style={{
                    borderColor: focusedField === 'serviceType' ? '#a8dadc' : '#e5e5e5',
                    boxShadow: focusedField === 'serviceType' ? '0 0 0 3px rgba(168,218,220,0.1)' : 'none'
                  }}
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              {/* DATE */}
              <div className="relative">
                <label
                  className="absolute left-4 top-2 text-xs pointer-events-none"
                  style={{ color: focusedField === 'date' ? '#1d3557' : '#457b9d' }}
                >
                  <Calendar className="inline w-4 h-4 mr-2" /> Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('date')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pt-8 pb-3 px-4 rounded-xl border-2 outline-none"
                  style={{
                    borderColor: focusedField === 'date' ? '#a8dadc' : '#e5e5e5',
                    boxShadow: focusedField === 'date' ? '0 0 0 3px rgba(168,218,220,0.1)' : 'none'
                  }}
                />
              </div>

              {/* TIME */}
              <div className="relative">
                <label
                  className="absolute left-4 top-2 text-xs pointer-events-none"
                  style={{ color: focusedField === 'time' ? '#1d3557' : '#457b9d' }}
                >
                  <Clock className="inline w-4 h-4 mr-2" /> Time
                </label>

                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('time')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pt-8 pb-3 px-4 rounded-xl border-2 outline-none"
                  style={{
                    borderColor: focusedField === 'time' ? '#a8dadc' : '#e5e5e5',
                    boxShadow: focusedField === 'time' ? '0 0 0 3px rgba(168,218,220,0.1)' : 'none'
                  }}
                />
              </div>

              {/* DURATION */}
              <div className="relative md:col-span-2">
                <label
                  className="absolute left-4 top-2 text-xs pointer-events-none"
                  style={{ color: focusedField === 'duration' ? '#1d3557' : '#457b9d' }}
                >
                  Duration
                </label>

                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('duration')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full pt-8 pb-3 px-4 rounded-xl border-2 outline-none"
                  style={{
                    borderColor: focusedField === 'duration' ? '#a8dadc' : '#e5e5e5',
                    boxShadow: focusedField === 'duration' ? '0 0 0 3px rgba(168,218,220,0.1)' : 'none'
                  }}
                >
                  <option value="">Select duration</option>
                  {durations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* ADDRESS */}
            <div className="relative mb-6">
              <label
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === 'address' || formData.address ? 'top-2 text-xs' : 'top-5 text-base'
                }`}
                style={{ color: focusedField === 'address' ? '#1d3557' : '#457b9d' }}
              >
                <MapPin className="inline w-4 h-4 mr-2" /> Service Address
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                onFocus={() => setFocusedField('address')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full pt-8 pb-3 px-4 rounded-xl border-2 outline-none"
                style={{
                  borderColor: focusedField === 'address' ? '#a8dadc' : '#e5e5e5',
                  boxShadow: focusedField === 'address' ? '0 0 0 3px rgba(168,218,220,0.1)' : 'none'
                }}
              />
            </div>

            {/* NOTES */}
            <div className="relative mb-8">
              <label
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === 'notes' || formData.notes ? 'top-2 text-xs' : 'top-5 text-base'
                }`}
                style={{ color: focusedField === 'notes' ? '#1d3557' : '#457b9d' }}
              >
                <FileText className="inline w-4 h-4 mr-2" /> Additional Notes
              </label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                onFocus={() => setFocusedField('notes')}
                onBlur={() => setFocusedField(null)}
                rows={4}
                className="w-full pt-8 pb-3 px-4 rounded-xl border-2 outline-none resize-none"
                style={{
                  borderColor: focusedField === 'notes' ? '#a8dadc' : '#e5e5e5',
                  boxShadow: focusedField === 'notes' ? '0 0 0 3px rgba(168,218,220,0.1)' : 'none'
                }}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl text-white transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
              style={{ backgroundColor: '#1d3557' }}
            >
              <span className="relative z-10">Submit Booking</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ scale: 0, opacity: 0.3 }}
                whileHover={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>

          </motion.form>
        )}

      </div>
    </div>
  );
}
