"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const whatsappUrl = "https://wa.me/41795369072"; // Official Swiss contact

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl relative transition-colors duration-300"
      >
        {/* Pulsating Ring Effect */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-35" />
        
        {/* Tooltip on Hover */}
        <span className="absolute right-16 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block border border-gray-800">
          Fale Connosco no WhatsApp! 💬
        </span>

        {/* WhatsApp Icon */}
        <MessageCircle className="w-8 h-8 fill-white text-green-500" />
      </motion.a>
    </div>
  );
}
