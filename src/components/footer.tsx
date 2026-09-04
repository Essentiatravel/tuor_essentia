"use client";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ContactModal from "./contact-modal";


export default function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  return (
    <footer id="contato" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/">
              <h3 className="text-2xl font-bold text-orange-400 mb-4 cursor-pointer">ESSENTIA TRAVEL</h3>
            </Link>
            <p className="text-gray-300 leading-relaxed mb-6">
              Explore o mundo com quem entende. Sua jornada dos sonhos começa aqui.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/essentia.travel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 bg-transparent text-gray-400 hover:text-white hover:bg-gradient-to-tr hover:from-yellow-500 hover:to-purple-600 hover:border-transparent transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 bg-transparent text-gray-400 hover:text-white hover:bg-green-600 hover:border-green-600 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#roteiros" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Nossos Roteiros
                </Link>
              </li>
              <li>
                <Link href="/#explorar" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Passeios
                </Link>
              </li>
              <li>
                <Link href="/pacotes" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Pacotes Especiais
                </Link>
              </li>
              <li>
                <Link href="/#diferenciais" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Por que nos escolher
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Depoimentos
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Roteiros Personalizados</li>
              <li className="text-gray-300">Guias Locais</li>
              <li className="text-gray-300">Suporte 24h</li>
              <li className="text-gray-300">Experiências Gastronômicas</li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-4">
              <a 
                href="mailto:contato@essentia.travel"
                className="flex items-center space-x-3 hover:text-orange-400 transition-colors pb-2 border-b border-gray-800"
              >
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm font-medium">contato@essentia.travel</span>
              </a>

              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-orange-500/30 bg-orange-500/10 hover:bg-orange-50 hover:text-white transition-all text-orange-400 text-sm font-semibold cursor-pointer shadow-sm"
              >
                <Mail className="w-4 h-4" /> Enviar Mensagem por E-mail
              </button>

              {/* Roma, Itália */}
              <div className="space-y-1.5">
                <span className="font-semibold block text-orange-400 text-sm">Roma, Itália:</span>
                <div className="flex items-start space-x-2 text-gray-300 text-sm">
                  <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Roma, Itália</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <a href="tel:+39123456789" className="hover:text-orange-400 transition-colors">
                    +39 123 456 789
                  </a>
                </div>
              </div>

              {/* WhatsApp Brasil */}
              <div className="space-y-1.5">
                <span className="font-semibold block text-orange-400 text-sm">WhatsApp Atendimento:</span>
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <MessageCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">
                    +55 11 99999-9999
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 my-8"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 ESSENTIA TRAVEL. Todos os direitos reservados.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
      <ContactModal open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </footer>
  );
}