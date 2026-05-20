"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Compass, Heart, Calendar } from "lucide-react";

export default function AboutUs() {
  const trustPillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-orange-600" />,
      title: "Frota 4x4 Própria & Segura",
      description: "Operamos com veículos modernos e robustos de tração integral, revisados constantemente para garantir total conforto nas trilhas e estradas de São Tomé."
    },
    {
      icon: <Compass className="w-6 h-6 text-green-600" />,
      title: "Guias Nativos Credenciados",
      description: "Equipe 100% local, registrada no Ministério do Turismo e altamente treinada em botânica, história das Roças e segurança em trekking."
    },
    {
      icon: <Heart className="w-6 h-6 text-red-600" />,
      title: "Impacto Social & Eco-Turismo",
      description: "Praticamos turismo sustentável (Leve Leve), gerando emprego direto nas comunidades e apoiando a conservação da biodiversidade das ilhas."
    }
  ];

  return (
    <section id="quem-somos" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-50/30 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Left Column: Visual Grid of Real Landscapes */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4 relative"
          >
            {/* Absolute Trust badge inside the grid */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-600 text-white p-5 rounded-2xl shadow-xl z-20 text-center flex flex-col items-center justify-center border-4 border-white select-none">
              <Calendar className="w-6 h-6 mb-1 text-orange-100" />
              <span className="text-xl font-extrabold">Desde 2018</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-orange-200">Aventura Segura</span>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-lg h-64 hover:scale-[1.02] transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Ilhéu das Rolas - São Tomé" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg h-44 hover:scale-[1.02] transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Roças de Café e Cacau" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="rounded-3xl overflow-hidden shadow-lg h-44 hover:scale-[1.02] transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Parque Nacional Obô - Selva" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg h-64 hover:scale-[1.02] transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab752?auto=format&fit=crop&w=400&h=400&q=80" 
                  alt="Lagoa Azul Mergulho Cristalino" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story & Credentials */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <span className="text-orange-600 font-extrabold uppercase tracking-widest text-sm mb-3">
              Quem Somos
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
              Nossa História & Paixão por São Tomé e Príncipe
            </h2>
            <div className="space-y-5 text-gray-600 leading-relaxed text-base md:text-lg">
              <p>
                A <strong>EXPLORA AVENTURA</strong> nasceu em 2018 com o propósito claro de conectar viajantes do mundo inteiro à alma intocada e selvagem de São Tomé e Príncipe. Não vendemos apenas passeios; criamos expedições marcantes e totalmente personalizadas.
              </p>
              <p>
                Fundada por profissionais do turismo e guias locais experientes, nossa agência é oficialmente registrada e sediada na **Avenida Marginal 12 de Julho, em São Tomé**. Acreditamos no turismo de impacto positivo, onde cada visitante contribui para o sustento de famílias locais e a preservação do estilo de vida <em>"Leve Leve"</em> das nossas ilhas.
              </p>
              <p className="font-medium text-gray-800 italic border-l-4 border-orange-500 pl-4 py-1.5">
                "Conduzimos você com segurança pelos trilhos mais secretos, pelas roças históricas de cacau e café, e pelas praias douradas mais paradisíacas do Atlântico."
              </p>
            </div>
          </motion.div>

        </div>

        {/* Dynamic Trust Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8 border-t border-gray-100 pt-16">
          {trustPillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex gap-4 p-5 rounded-2xl hover:bg-orange-50/30 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center">
                {pillar.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2 text-base md:text-lg">
                  {pillar.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
