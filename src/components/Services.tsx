import { Shield, Users, Home, Car, Zap, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface ServicesProps {
  onNavigate?: (page: string) => void;
  isFullPage?: boolean;
}

export function Services({ onNavigate, isFullPage = false }: ServicesProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      icon: Shield,
      title: 'Security Guard',
      description: 'Professional security guards for your home, office, or event. Trained and verified.',
      color: '#1d3557'
    },
    {
      icon: Users,
      title: 'Bouncer',
      description: 'Experienced bouncers for events, parties, and venues. Ensuring safety and order.',
      color: '#1d3557'
    },
    {
      icon: UserCheck,
      title: 'PSO (Personal Security Officer)',
      description: 'Elite personal security officers for VIP protection and personal safety.',
      color: '#1d3557'
    },
    {
      icon: Home,
      title: 'Servant / Aaya',
      description: 'Reliable domestic help for cleaning, cooking, and household management.',
      color: '#1d3557'
    },
    {
      icon: Car,
      title: 'Driver',
      description: 'Professional and experienced drivers for personal, family, or business transportation needs.',
      color: '#1d3557'
    },
    {
      icon: Zap,
      title: 'Electrician',
      description: 'Licensed electricians for all electrical work, repairs, and installations.',
      color: '#1d3557'
    }
  ];

  return (
    <section 
      className={isFullPage ? "pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen" : "py-24 px-4 sm:px-6 lg:px-8"}
      style={{ backgroundColor: isFullPage ? '#ffffff' : '#f8f9fa' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 style={{ color: '#1d3557' }} className="mb-4">
            Our Services
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#457b9d' }}>
            Choose from our wide range of professional services tailored to meet your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredCard === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300"
                style={{
                  boxShadow: isHovered 
                    ? '0 20px 40px rgba(29, 53, 87, 0.15)' 
                    : '0 4px 12px rgba(0, 0, 0, 0.08)',
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)'
                }}
              >
                <motion.div
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <Icon 
                    className="w-14 h-14" 
                    style={{ 
                      color: isHovered ? '#a8dadc' : service.color,
                      transition: 'color 0.3s ease'
                    }} 
                  />
                </motion.div>

                <h3 className="mb-3" style={{ color: '#1d3557' }}>
                  {service.title}
                </h3>

                <p style={{ color: '#457b9d' }}>
                  {service.description}
                </p>

                {onNavigate && (
                  <button
                    onClick={() =>
                      onNavigate(`booking?service=${encodeURIComponent(service.title)}`)
                    }
                    className="mt-6 px-6 py-2 rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? '#1d3557' : '#a8dadc',
                      color: isHovered ? '#ffffff' : '#1d3557'
                    }}
                  >
                    Book Now
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
