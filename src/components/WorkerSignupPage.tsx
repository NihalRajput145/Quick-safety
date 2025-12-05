import { motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { User, Phone, Mail, MapPin, Briefcase, Award, FileText, Upload, CheckCircle, CreditCard, Image as ImageIcon } from 'lucide-react';

export function WorkerSignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    serviceType: '',
    experience: '',
    certifications: '',
    availability: '',
    additionalInfo: ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    aadharCard: null as File | null,
    panCard: null as File | null,
    photo: null as File | null
  });

  const services = [
    'Security Guard',
    'Bouncer',
    'PSO (Personal Security Officer)',
    'Servant / Aaya',
    'Driver',
    'Electrician'
  ];

  const experienceLevels = [
    'Less than 1 year',
    '1-3 years',
    '3-5 years',
    '5-10 years',
    '10+ years'
  ];

  const availabilityOptions = [
    'Full-time',
    'Part-time',
    'Weekends only',
    'Flexible',
    'On-call'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      { name: 'Full Name', value: formData.fullName },
      { name: 'Phone', value: formData.phone },
      { name: 'Email', value: formData.email },
      { name: 'City', value: formData.city },
      { name: 'Service Type', value: formData.serviceType },
      { name: 'Experience', value: formData.experience },
      { name: 'Availability', value: formData.availability },
      { name: 'Address', value: formData.address }
    ];

    for (const f of requiredFields) {
      if (!f.value || String(f.value).trim() === '') {
        toast.error(`${f.name} is required`);
        return;
      }
    }

    if (!uploadedFiles.photo || !uploadedFiles.aadharCard || !uploadedFiles.panCard) {
      toast.error('Please upload required documents (photo, Aadhar, PAN).');
      return;
    }

    setSubmitted(true);

    try {
      const envBase = ((import.meta as any).env?.VITE_API_BASE as string) || '';
      const hasEnvBase = Boolean(envBase && envBase.trim());

      let url: string;
      if (hasEnvBase) {
        url = `${envBase.replace(/\/$/, '')}/api/workers`;
      } else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        url = '/api/workers';
      } else {
        url = 'https://quick-security-backend.onrender.com/api/workers';
      }

      const body = new FormData();
      body.append('full_name', formData.fullName);
      body.append('phone', formData.phone);
      body.append('email', formData.email);
      body.append('address', formData.address);
      body.append('city', formData.city);
      body.append('service_type', formData.serviceType);
      body.append('experience', formData.experience);
      body.append('certifications', formData.certifications);
      body.append('availability', formData.availability);
      body.append('additional_info', formData.additionalInfo);

      body.append('aadhar_card', uploadedFiles.aadharCard!);
      body.append('pan_card', uploadedFiles.panCard!);
      body.append('photo', uploadedFiles.photo!);

      const res = await fetch(url, {
        method: 'POST',
        body
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        toast.error(data?.message || 'Failed to submit application');
      } else {
        toast.success(data?.message || 'Application submitted');
      }

    } catch (err: any) {
      toast.error(err?.message || 'Error submitting form');
    }

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        serviceType: '',
        experience: '',
        certifications: '',
        availability: '',
        additionalInfo: ''
      });
      setUploadedFiles({
        aadharCard: null,
        panCard: null,
        photo: null
      });
    }, 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'aadharCard' | 'panCard' | 'photo') => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles({
        ...uploadedFiles,
        [fileType]: file
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const benefits = [
    'Flexible working hours',
    'Competitive compensation',
    'Regular job opportunities',
    'Professional development',
    'Insurance coverage',
    ' 24/7 support team'
  ];

  return (
    <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 style={{ color: '#1d3557' }} className="mb-4">
            Join Our Team
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#457b9d' }}>
            Become a part of our professional network and access thousands of job opportunities
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Benefits Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-28">
              <h3 style={{ color: '#1d3557' }} className="mb-6">
                Why Join Us?
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#a8dadc' }} />
                    <span style={{ color: '#457b9d' }}>{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <div
                className="mt-8 p-6 rounded-xl"
                style={{ backgroundColor: '#a8dadc' }}
              >
                <h4 style={{ color: '#1d3557' }} className="mb-2">
                  Need Help?
                </h4>
                <p style={{ color: '#1d3557' }} className="mb-4">
                  Contact our recruitment team
                </p>
                <p style={{ color: '#1d3557' }} className="mb-2">
                  <Phone className="inline w-4 h-4 mr-2" />
                  +91 9555731070
                </p>
                <p style={{ color: '#1d3557' }}>
                  <Phone className="inline w-4 h-4 mr-2" />
                  +91 7701828545
                </p>
              </div>
            </div>
          </motion.div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl p-12 text-center shadow-xl"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: 1 }}
                  className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: '#a8dadc' }}
                >
                  <CheckCircle className="w-12 h-12" style={{ color: '#1d3557' }} />
                </motion.div>
                <h2 style={{ color: '#1d3557' }} className="mb-4">
                  Application Submitted!
                </h2>
                <p className="text-xl mb-4" style={{ color: '#457b9d' }}>
                  Thank you for your interest in joining our team.
                </p>
                <p style={{ color: '#457b9d' }}>
                  We'll review your application and contact you within 2-3 business days.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleSubmit}
                noValidate
                className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
              >
                <h3 style={{ color: '#1d3557' }} className="mb-8">
                  Application Form
                </h3>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Full Name */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'fullName' || formData.fullName
                          ? 'top-2 text-xs'
                          : 'top-5 text-base'
                        }`}
                      style={{ color: focusedField === 'fullName' ? '#1d3557' : '#457b9d' }}
                    >
                      <User className="inline w-4 h-4 mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pt-8 pb-3 px-4 rounded-xl border-2 transition-all duration-300 outline-none"
                      style={{
                        borderColor: focusedField === 'fullName' ? '#a8dadc' : '#e5e5e5',
                        boxShadow: focusedField === 'fullName' ? '0 0 0 3px rgba(168, 218, 220, 0.1)' : 'none'
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
                      <Phone className="inline w-4 h-4 mr-2" />
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

                  {/* Email */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'email' || formData.email
                          ? 'top-2 text-xs'
                          : 'top-5 text-base'
                        }`}
                      style={{ color: focusedField === 'email' ? '#1d3557' : '#457b9d' }}
                    >
                      <Mail className="inline w-4 h-4 mr-2" />
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

                  {/* City */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'city' || formData.city
                          ? 'top-2 text-xs'
                          : 'top-5 text-base'
                        }`}
                      style={{ color: focusedField === 'city' ? '#1d3557' : '#457b9d' }}
                    >
                      <MapPin className="inline w-4 h-4 mr-2" />
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('city')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pt-8 pb-3 px-4 rounded-xl border-2 transition-all duration-300 outline-none"
                      style={{
                        borderColor: focusedField === 'city' ? '#a8dadc' : '#e5e5e5',
                        boxShadow: focusedField === 'city' ? '0 0 0 3px rgba(168, 218, 220, 0.1)' : 'none'
                      }}
                    />
                  </div>

                  {/* Service Type */}
                  <div className="relative">
                    <label
                      className="absolute left-4 top-2 text-xs pointer-events-none"
                      style={{ color: focusedField === 'serviceType' ? '#1d3557' : '#457b9d' }}
                    >
                      <Briefcase className="inline w-4 h-4 mr-2" />
                      Service Type
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('serviceType')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pt-8 pb-3 px-4 rounded-xl border-2 transition-all duration-300 outline-none"
                      style={{
                        borderColor: focusedField === 'serviceType' ? '#a8dadc' : '#e5e5e5',
                        boxShadow: focusedField === 'serviceType' ? '0 0 0 3px rgba(168, 218, 220, 0.1)' : 'none',
                        color: '#1d3557'
                      }}
                    >
                      <option value="">Select service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Experience */}
                  <div className="relative">
                    <label
                      className="absolute left-4 top-2 text-xs pointer-events-none"
                      style={{ color: focusedField === 'experience' ? '#1d3557' : '#457b9d' }}
                    >
                      <Award className="inline w-4 h-4 mr-2" />
                      Experience Level
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('experience')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pt-8 pb-3 px-4 rounded-xl border-2 transition-all duration-300 outline-none"
                      style={{
                        borderColor: focusedField === 'experience' ? '#a8dadc' : '#e5e5e5',
                        boxShadow: focusedField === 'experience' ? '0 0 0 3px rgba(168, 218, 220, 0.1)' : 'none',
                        color: '#1d3557'
                      }}
                    >
                      <option value="">Select experience</option>
                      {experienceLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Availability */}
                  <div className="relative md:col-span-2">
                    <label
                      className="absolute left-4 top-2 text-xs pointer-events-none"
                      style={{ color: focusedField === 'availability' ? '#1d3557' : '#457b9d' }}
                    >
                      Availability
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('availability')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pt-8 pb-3 px-4 rounded-xl border-2 transition-all duration-300 outline-none"
                      style={{
                        borderColor: focusedField === 'availability' ? '#a8dadc' : '#e5e5e5',
                        boxShadow: focusedField === 'availability' ? '0 0 0 3px rgba(168, 218, 220, 0.1)' : 'none',
                        color: '#1d3557'
                      }}
                    >
                      <option value="">Select availability</option>
                      {availabilityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div className="relative mb-6">
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'address' || formData.address
                        ? 'top-2 text-xs'
                        : 'top-5 text-base'
                      }`}
                    style={{ color: focusedField === 'address' ? '#1d3557' : '#457b9d' }}
                  >
                    <MapPin className="inline w-4 h-4 mr-2" />
                    Complete Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('address')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full pt-8 pb-3 px-4 rounded-xl border-2 transition-all duration-300 outline-none"
                    style={{
                      borderColor: focusedField === 'address' ? '#a8dadc' : '#e5e5e5',
                      boxShadow: focusedField === 'address' ? '0 0 0 3px rgba(168, 218, 220, 0.1)' : 'none'
                    }}
                  />
                </div>

                {/* Certifications */}
                <div className="relative mb-6">
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'certifications' || formData.certifications
                        ? 'top-2 text-xs'
                        : 'top-5 text-base'
                      }`}
                    style={{ color: focusedField === 'certifications' ? '#1d3557' : '#457b9d' }}
                  >
                    <FileText className="inline w-4 h-4 mr-2" />
                    Certifications (Optional)
                  </label>
                  <input
                    type="text"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('certifications')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="e.g., Security License, Electrical Certificate"
                    className="w-full pt-8 pb-3 px-4 rounded-xl border-2 transition-all duration-300 outline-none"
                    style={{
                      borderColor: focusedField === 'certifications' ? '#a8dadc' : '#e5e5e5',
                      boxShadow: focusedField === 'certifications' ? '0 0 0 3px rgba(168, 218, 220, 0.1)' : 'none'
                    }}
                  />
                </div>

                {/* Document Uploads Section */}
                <div className="mb-6">
                  <h4 style={{ color: '#1d3557' }} className="mb-4">
                    Upload Documents
                  </h4>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Aadhar Card Upload */}
                    <div className="relative">
                      <label
                        className="block mb-2 text-sm"
                        style={{ color: '#457b9d' }}
                      >
                        <CreditCard className="inline w-4 h-4 mr-2" />
                        Aadhar Card *
                      </label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(e, 'aadharCard')}
                        className="hidden"
                        id="aadhar-upload"
                      />
                      <label
                        htmlFor="aadhar-upload"
                        className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 hover:border-[#a8dadc] hover:bg-[#a8dadc]/5"
                        style={{
                          borderColor: uploadedFiles.aadharCard ? '#a8dadc' : '#e5e5e5',
                          backgroundColor: uploadedFiles.aadharCard ? 'rgba(168, 218, 220, 0.05)' : 'transparent'
                        }}
                      >
                        {uploadedFiles.aadharCard ? (
                          <div className="text-center px-2">
                            <CheckCircle className="w-8 h-8 mx-auto mb-2" style={{ color: '#1d3557' }} />
                            <p className="text-xs break-words" style={{ color: '#1d3557' }}>
                              {uploadedFiles.aadharCard.name}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#457b9d' }} />
                            <p className="text-xs" style={{ color: '#457b9d' }}>
                              Click to upload
                            </p>
                          </div>
                        )}
                      </label>
                    </div>

                    {/* PAN Card Upload */}
                    <div className="relative">
                      <label
                        className="block mb-2 text-sm"
                        style={{ color: '#457b9d' }}
                      >
                        <CreditCard className="inline w-4 h-4 mr-2" />
                        PAN Card *
                      </label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(e, 'panCard')}
                        className="hidden"
                        id="pan-upload"
                      />
                      <label
                        htmlFor="pan-upload"
                        className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 hover:border-[#a8dadc] hover:bg-[#a8dadc]/5"
                        style={{
                          borderColor: uploadedFiles.panCard ? '#a8dadc' : '#e5e5e5',
                          backgroundColor: uploadedFiles.panCard ? 'rgba(168, 218, 220, 0.05)' : 'transparent'
                        }}
                      >
                        {uploadedFiles.panCard ? (
                          <div className="text-center px-2">
                            <CheckCircle className="w-8 h-8 mx-auto mb-2" style={{ color: '#1d3557' }} />
                            <p className="text-xs break-words" style={{ color: '#1d3557' }}>
                              {uploadedFiles.panCard.name}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#457b9d' }} />
                            <p className="text-xs" style={{ color: '#457b9d' }}>
                              Click to upload
                            </p>
                          </div>
                        )}
                      </label>
                    </div>

                    {/* Photo Upload */}
                    <div className="relative">
                      <label
                        className="block mb-2 text-sm"
                        style={{ color: '#457b9d' }}
                      >
                        <ImageIcon className="inline w-4 h-4 mr-2" />
                        Your Photo *
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'photo')}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 hover:border-[#a8dadc] hover:bg-[#a8dadc]/5"
                        style={{
                          borderColor: uploadedFiles.photo ? '#a8dadc' : '#e5e5e5',
                          backgroundColor: uploadedFiles.photo ? 'rgba(168, 218, 220, 0.05)' : 'transparent'
                        }}
                      >
                        {uploadedFiles.photo ? (
                          <div className="text-center px-2">
                            <CheckCircle className="w-8 h-8 mx-auto mb-2" style={{ color: '#1d3557' }} />
                            <p className="text-xs break-words" style={{ color: '#1d3557' }}>
                              {uploadedFiles.photo.name}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#457b9d' }} />
                            <p className="text-xs" style={{ color: '#457b9d' }}>
                              Click to upload
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="relative mb-8">
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'additionalInfo' || formData.additionalInfo
                        ? 'top-2 text-xs'
                        : 'top-5 text-base'
                      }`}
                    style={{ color: focusedField === 'additionalInfo' ? '#1d3557' : '#457b9d' }}
                  >
                    Additional Information (Optional)
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('additionalInfo')}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    className="w-full pt-8 pb-3 px-4 rounded-xl border-2 transition-all duration-300 outline-none resize-none"
                    style={{
                      borderColor: focusedField === 'additionalInfo' ? '#a8dadc' : '#e5e5e5',
                      boxShadow: focusedField === 'additionalInfo' ? '0 0 0 3px rgba(168, 218, 220, 0.1)' : 'none'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl text-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#1d3557' }}
                >
                  <Upload className="w-5 h-5" />
                  Submit Application
                </motion.button>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
