"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Layers, CheckCircle2, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/format-utils";

interface Package {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  passeios: string[];
  ativo: boolean;
}

interface Tour {
  id: string;
  nome: string;
}

export default function PacotesCards({ limite }: { limite?: number }) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [tours, setTours] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [pkgRes, tourRes] = await Promise.all([
          fetch("/api/pacotes"),
          fetch("/api/passeios")
        ]);

        if (pkgRes.ok && tourRes.ok) {
          const pkgData: Package[] = await pkgRes.json();
          const tourData: any[] = await tourRes.json();

          let activePackages = pkgData.filter(p => p.ativo);
          if (limite) activePackages = activePackages.slice(0, limite);
          
          setPackages(activePackages);

          const tourMap: Record<string, string> = {};
          tourData.forEach(t => {
            tourMap[t.id] = t.nome;
          });
          setTours(tourMap);
        }
      } catch (err) {
        console.error("Erro ao carregar pacotes:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [limite]);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-100 rounded-2xl h-80" />
        ))}
      </div>
    );
  }

  if (packages.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {packages.map((pkg, idx) => (
        <motion.div
          key={pkg.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
        >
          {/* Card Image */}
          <div className="h-48 w-full relative bg-orange-50 overflow-hidden">
            {pkg.imagem ? (
              <img
                src={pkg.imagem}
                alt={pkg.nome}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-tr from-orange-100 to-amber-50">
                <Layers className="h-12 w-12 text-orange-400" />
              </div>
            )}
            <div className="absolute top-4 right-4 bg-orange-600 text-white font-bold text-[10px] uppercase px-2 py-1 rounded-full shadow-md flex items-center gap-1">
              <Star className="h-2.5 w-2.5 fill-white" />
              Combo Especial
            </div>
          </div>

          {/* Card Content */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                {pkg.nome}
              </h3>
              <p className="mt-2 text-gray-600 text-xs leading-relaxed line-clamp-2">
                {pkg.descricao}
              </p>

              {/* Included Tours list */}
              <div className="mt-4 space-y-1.5">
                {pkg.passeios.slice(0, 3).map(id => (
                  <div key={id} className="flex items-center gap-2 text-[11px] text-gray-600">
                    <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                    <span className="truncate">{tours[id] || "Passeio incluso"}</span>
                  </div>
                ))}
                {pkg.passeios.length > 3 && (
                  <p className="text-[10px] text-gray-400 ml-5">+ {pkg.passeios.length - 3} outros passeios</p>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold">A partir de</span>
                <span className="text-lg font-bold text-orange-600">
                  {formatCurrency(pkg.preco)}
                </span>
              </div>

              <Link href={`/pacote/${pkg.id}`}>
                <Button
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 rounded-lg"
                >
                  Ver Detalhes
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
