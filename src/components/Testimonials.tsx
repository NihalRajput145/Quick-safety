import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, easeInOut, easeOut, easeIn } from "motion/react";
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      rating: 5,
      text: 'Quick Safety Service provided an excellent security guard for our neighborhood event. Professional, punctual, and very reliable!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    },
    {
      name: 'Michael Chen',
      role: 'Business Owner',
      text: 'Their AC technician fixed our commercial unit in no time. Great service and very affordable pricing. Highly recommended!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
      name: 'Priya Sharma',
      role: 'Event Manager',
      rating: 5,
      text: 'Booked bouncers for our corporate event. They were professional and handled crowd management perfectly. Will use again!',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'
    },
    {
      name: 'David Martinez',
      role: 'Homeowner',
      rating: 5,
      text: 'The electrician they sent was knowledgeable and efficient. Fixed all our electrical issues quickly. Excellent service!',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
    }
  ];

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Manual prev / next
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  // ⭐ UPDATED Motion v11 Variants (valid, smooth, error-free)
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),

    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: easeOut,
      }
    },

    exit: (direction: number) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.35,
        ease: easeIn,
      }
    })
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 style={{ color: '#1d3557' }} className="mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#457b9d' }}>
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </motion.div>

        {/* Slider Section */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">

                  {/* Avatar */}
                  <ImageWithFallback
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                  />

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-1 mb-4">
                      {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#ffc107' }} />
                      ))}
                    </div>

                    <p className="text-lg mb-4" style={{ color: '#1d3557' }}>
                      "{testimonials[currentIndex].text}"
                    </p>

                    <h4 style={{ color: '#1d3557' }}>{testimonials[currentIndex].name}</h4>
                    <p style={{ color: '#457b9d' }}>{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-3 rounded-full bg-white shadow-lg hover:shadow-xl"
            style={{ color: '#1d3557' }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 rounded-full bg-white shadow-lg hover:shadow-xl"
            style={{ color: '#1d3557' }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: index === currentIndex ? '#1d3557' : '#a8dadc',
                  transform: index === currentIndex ? 'scale(1.5)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
