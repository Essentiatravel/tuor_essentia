"use client";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
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
              <h3 className="text-2xl font-bold text-orange-400 mb-4 cursor-pointer">EXPLORA AVENTURA</h3>
            </Link>
            <p className="text-gray-300 leading-relaxed mb-6">
              Explore o mundo com quem entende. Sua aventura começa aqui.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/exploraaventura.stp?igsh=Zm9qZHY0amR1cHZs&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 bg-transparent text-gray-400 hover:text-white hover:bg-gradient-to-tr hover:from-yellow-500 hover:to-purple-600 hover:border-transparent transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/351924361850"
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
                href="mailto:contact@explora-aventura.com"
                className="flex items-center space-x-3 hover:text-orange-400 transition-colors pb-2 border-b border-gray-800"
              >
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm font-medium">contact@explora-aventura.com</span>
              </a>

              {/* São Tomé */}
              <div className="space-y-1.5">
                <span className="font-semibold block text-orange-400 text-sm">São Tomé:</span>
                <div className="flex items-start space-x-2 text-gray-300 text-sm">
                  <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Av. Marginal 12 de Julho, São Tomé</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <a href="tel:+2399048171" className="hover:text-orange-400 transition-colors">
                    +239 904 8171
                  </a>
                </div>
              </div>

              {/* Suíça */}
              <div className="space-y-1.5">
                <span className="font-semibold block text-orange-400 text-sm">Suíça:</span>
                <div className="flex items-start space-x-2 text-gray-300 text-sm">
                  <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Rue des Bossons 4, 1213 Genève</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <a href="tel:+41795369072" className="hover:text-orange-400 transition-colors">
                    +41 79 536 90 72
                  </a>
                </div>
              </div>

              {/* Portugal */}
              <div className="space-y-1.5">
                <span className="font-semibold block text-orange-400 text-sm">Portugal:</span>
                <div className="flex items-start space-x-2 text-gray-300 text-sm">
                  <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>R. da Fonte de Prata 38, Amora, Portugal</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <a href="tel:+351924361850" className="hover:text-orange-400 transition-colors">
                    +351 924 361 850
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
            © 2024 EXPLORA AVENTURA. Todos os direitos reservados.
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
    </footer>
  );
}