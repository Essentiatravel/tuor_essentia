"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import PasseiosCards from "./passeios-cards";
import Link from "next/link";

export default function Destinations() {
  const [mostrarPasseios, setMostrarPasseios] = useState(true);

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash === "#passeios" || hash === "#destinos" || hash === "") {
        setMostrarPasseios(true);
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    
    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);

  return (
    <section id="destinos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Nossos Passeios e Pacotes Especiais
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Escolha entre nossos roteiros exclusivos com guias especializados ou aproveite nossos combos promocionais
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => setMostrarPasseios(true)}
              variant="default"
              className="bg-orange-500 hover:bg-orange-600 shadow-md transform hover:scale-105 transition-all"
            >
              Ver Passeios
            </Button>
            <Link href="/pacotes">
              <Button
                variant="outline"
                className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 shadow-sm transform hover:scale-105 transition-all"
              >
                Pacotes Especiais
              </Button>
            </Link>
          </div>
        </motion.div>

        <PasseiosCards />
      </div>
    </section>
  );
}