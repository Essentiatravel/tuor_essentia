"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import PasseiosCards from "./passeios-cards";
import PacotesCards from "./pacotes-cards";
import Link from "next/link";
import { MapPin, Layers } from "lucide-react";

export default function Destinations() {
  const [activeTab, setActiveTab] = useState<"passeios" | "pacotes">("passeios");

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash === "#pacotes") {
        setActiveTab("pacotes");
      } else if (hash === "#passeios") {
        setActiveTab("passeios");
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    
    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);

  return (
    <section id="explorar" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            {activeTab === "passeios" ? "Nossos Passeios Exclusivos" : "Nossos Pacotes Promocionais"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {activeTab === "passeios" 
              ? "Explore roteiros únicos criados por quem vive e ama São Tomé e Príncipe."
              : "Economize garantindo combos especiais que reúnem as melhores experiências da ilha."}
          </p>
          
          <div className="flex justify-center bg-gray-100 p-1 rounded-xl w-fit mx-auto mb-12">
            <button
              onClick={() => setActiveTab("passeios")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "passeios" 
                  ? "bg-white text-orange-600 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <MapPin className="w-4 h-4" />
              Passeios Individuais
            </button>
            <button
              onClick={() => setActiveTab("pacotes")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "pacotes" 
                  ? "bg-white text-orange-600 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Layers className="w-4 h-4" />
              Pacotes de Viagem
            </button>
          </div>
        </motion.div>

        <div className="min-h-[400px]">
          {activeTab === "passeios" ? (
            <div id="passeios">
              <PasseiosCards />
            </div>
          ) : (
            <div id="pacotes">
              <PacotesCards />
              <div className="mt-12 text-center">
                <Link href="/pacotes">
                  <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 font-bold">
                    Ver Todos os Pacotes
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}