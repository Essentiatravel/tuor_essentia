"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Julie Girard",
      location: "Genebra, Suíça",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      text: "Superou todas as expectativas! Os pacotes de voo mais o alojamento funcionaram às mil maravilhas. A flexibilidade do atendimento e a simpatia do nosso guia local tornaram a nossa lua de mel inesquecível. Recomendo muito!",
      tags: ["Pacote Completo", "Lua de Mel"]
    },
    {
      name: "Marc Aubert",
      location: "Lyon, França",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      text: "Fizemos o passeio 'Sul da Ilha - Praias e Cascatas' em família. O motorista do 4x4 foi extremamente cuidadoso e as crianças adoraram cada detalhe, especialmente as cascatas! É maravilhoso encontrar uma agência tão séria e com preços justos.",
      tags: ["Passeio Privado", "Família"]
    },
    {
      name: "Ana Silva",
      location: "Lisboa, Portugal",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
      text: "Atendimento espetacular por WhatsApp! O sistema de reserva com opção de adultos e crianças calculou tudo direitinho e a equipe respondeu de imediato. A ESSENTIA TRAVEL foi a melhor escolha.",
      tags: ["Atendimento WhatsApp", "Roteiro"]
    },
    {
      name: "Pedro Santos",
      location: "Porto, Portugal",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
      text: "Uma aventura indescritível! A organização de todo o pacote terrestre e voos foi impecável. A comida local durante os passeios era divina e a segurança transmitida pelos guias nos deu total tranquilidade durante toda a estadia.",
      tags: ["Organização", "Aventura"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="depoimentos" className="py-24 bg-gradient-to-b from-white to-orange-50/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-orange-600 font-bold uppercase tracking-wider text-sm px-3 py-1.5 bg-orange-100/60 rounded-full">
            Avaliações de Clientes
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-5 text-gray-900 tracking-tight">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Mais de 500 roteiros personalizados realizados com sucesso e sorrisos inesquecíveis.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-orange-200/80 bg-white relative">
                <CardContent className="p-7 flex flex-col justify-between h-full">
                  
                  {/* Top: Star rating and Quote Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-orange-100 group-hover:text-orange-200 transition-colors" />
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-600 leading-relaxed text-sm italic mb-6">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Bottom: Client Profile */}
                  <div className="border-t pt-5">
                    <div className="flex items-center gap-3.5">
                      {/* Avatar with Ring */}
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 shadow-sm flex-shrink-0">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Name & Location */}
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors text-sm">
                          {testimonial.name}
                        </h4>
                        <span className="text-xs text-gray-400 font-medium">
                          {testimonial.location}
                        </span>
                      </div>
                    </div>

                    {/* Interactive Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {testimonial.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-semibold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
