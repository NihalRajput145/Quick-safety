import { motion } from 'motion/react';
import { Target, Eye, Award, Users, TrendingUp, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import about from '../img/about.jpg';

export function AboutPage() {
  const stats = [
    { number: '10,000+', label: 'Happy Clients' },
    { number: '500+', label: 'Verified Workers' },
    { number: '50,000+', label: 'Services Completed' },
    { number: '4.9/5', label: 'Average Rating' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide reliable, professional, and affordable home and safety services to every household, ensuring peace of mind and quality of life.'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To become the most trusted and preferred service platform, connecting skilled professionals with those who need them most.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Every worker undergoes rigorous verification, background checks, and skill assessments to ensure the highest standards of service.'
    }
  ];

  const team = [
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our team consists of experienced professionals dedicated to your safety and satisfaction.'
    },
    {
      icon: TrendingUp,
      title: 'Growing Network',
      description: 'Continuously expanding our network of verified professionals to serve you better.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction and safety are at the heart of everything we do.'
    }
  ];

  return (
    <div className="pt-24 pb-24">
      {/* Hero Section */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background: 'linear-gradient(135deg, #1d3557 0%, #457b9d 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white mb-6"
          >
            About Quick Safety Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 max-w-3xl mx-auto"
          >
            We're more than just a service platform—we're your partners in creating safer, more comfortable living and working spaces.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 text-center shadow-xl"
              >
                <h2 style={{ color: '#1d3557' }} className="mb-2">
                  {stat.number}
                </h2>
                <p style={{ color: '#457b9d' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 style={{ color: '#1d3557' }} className="mb-6">
                Our Story
              </h2>
              <p style={{ color: '#457b9d' }} className="mb-4">
                Quick Safety Service was born from a simple observation: finding reliable, trustworthy professionals for home and safety services was unnecessarily complicated and time-consuming.
              </p>
              <p style={{ color: '#457b9d' }} className="mb-4">
                Founded in 2020, we set out to change this by creating a platform that connects verified, skilled professionals with customers who need them. Our rigorous vetting process ensures that every worker on our platform meets the highest standards of professionalism and expertise.
              </p>
              <p style={{ color: '#457b9d' }}>
                Today, we're proud to serve thousands of satisfied customers and provide employment opportunities to hundreds of skilled workers. Our commitment to quality, safety, and customer satisfaction remains unwavering.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
            >
              <ImageWithFallback
                src={about}
                alt="Team working together"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 style={{ color: '#1d3557' }} className="mb-4">
              Our Values
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#457b9d' }}>
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: '#a8dadc' }}
                  >
                    <Icon className="w-8 h-8" style={{ color: '#1d3557' }} />
                  </div>
                  <h3 style={{ color: '#1d3557' }} className="mb-3">
                    {value.title}
                  </h3>
                  <p style={{ color: '#457b9d' }}>
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#457b9d' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-4">
              Why Work With Us
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We're committed to excellence in every aspect of our service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/80">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
