"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layers, ArrowRight, CheckCircle2, Star, Calendar, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer";

interface Package {
  id: string;
  nome: string;
  descricao: string;
  link: string;
  imagem: string;
  preco: number;
  passeios: string[];
  ativo: boolean;
}

interface Tour {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao: string;
  categoria: string;
  imagens: string[];
}

export default function PacotesPublicPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [tours, setTours] = useState<Record<string, Tour>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Load active packages
        const pkgRes = await fetch("/api/pacotes");
        const tourRes = await fetch("/api/passeios");

        if (pkgRes.ok && tourRes.ok) {
          const pkgData: Package[] = await pkgRes.json();
          const tourData: Tour[] = await tourRes.json();

          // Filter only active packages
          setPackages(pkgData.filter(p => p.ativo));

          const tourMap: Record<string, Tour> = {};
          tourData.forEach(t => {
            tourMap[t.id] = t;
          });
          setTours(tourMap);
        }
      } catch (err) {
        console.error("Erro ao carregar dados dos pacotes:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-20">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-white/30 blur-3xl -top-40 -left-40 animate-pulse" />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-amber-300/30 blur-3xl -bottom-20 -right-20 animate-pulse" />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-white/10"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin" />
            Experiências Combinadas
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Nossos Pacotes Especiais
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light"
          >
            Aproveite o melhor de São Tomé e Príncipe com combos pensados para maximizar sua aventura e oferecer o melhor custo-benefício.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-16 container mx-auto px-4 max-w-6xl">
        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-500 text-sm font-medium">Carregando pacotes especiais...</p>
          </div>
        ) : packages.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md mx-auto">
            <Layers className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Nenhum pacote disponível</h3>
            <p className="text-gray-500 mt-2 text-sm px-6">No momento não temos pacotes promocionais ativos. Fique atento às nossas redes para novidades!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => {
              // Calculate total price and count of tours
              let totalRegularPrice = 0;
              const linkedToursList: Tour[] = [];
              
              pkg.passeios.forEach(id => {
                const tour = tours[id];
                if (tour) {
                  totalRegularPrice += Number(tour.preco || 0);
                  linkedToursList.push(tour);
                }
              });

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100/80 group"
                >
                  {/* Card Image */}
                  <div className="h-56 w-full relative bg-orange-50 overflow-hidden">
                    {pkg.imagem ? (
                      <img
                        src={pkg.imagem}
                        alt={pkg.nome}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-tr from-orange-100 to-amber-50">
                        <Layers className="h-16 w-16 text-orange-400" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-orange-600 text-white font-bold text-xs uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Star className="h-3 w-3 fill-white" />
                      Combo Especial
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {pkg.nome}
                      </h2>
                      <p className="mt-2 text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {pkg.descricao || "Explore roteiros únicos criados especialmente para tornar sua viagem inesquecível."}
                      </p>

                      {/* Included Tours list */}
                      <div className="mt-6 border-t border-gray-100 pt-6">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                          Passeios Inclusos ({linkedToursList.length})
                        </h4>
                        <ul className="space-y-2.5">
                          {linkedToursList.map(tour => (
                            <li key={tour.id} className="flex items-start gap-2.5 text-sm text-gray-700">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0">
                                <span className="font-semibold block truncate">{tour.nome}</span>
                                <span className="text-xs text-gray-500">{tour.categoria} • {tour.duracao}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-gray-400 font-semibold uppercase">Valor do Pacote:</span>
                        <span className="text-lg font-bold text-orange-600">
                          € {Number(pkg.preco || 0).toFixed(2)}
                        </span>
                      </div>

                      <Link
                        href={pkg.link}
                        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Garantir este Pacote
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
