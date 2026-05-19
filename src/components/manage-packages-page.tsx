"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  MapPin,
  Clock,
  DollarSign,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Image as ImageIcon,
  Layers,
  Link as LinkIcon
} from "lucide-react";
import AddPackageModal from "./add-package-modal";

interface Package {
  id: string;
  nome: string;
  descricao: string;
  link: string;
  imagem: string;
  preco: number;
  passeios: string[];
  ativo: boolean;
  criadoEm: string;
}

interface Tour {
  id: string;
  nome: string;
}

const ActionDropdown: React.FC<{
  pkg: Package;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ pkg, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative dropdown-container">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
        <MoreVertical className="h-4 w-4" />
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 py-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 rounded-none px-4 py-2 hover:bg-gray-50 text-gray-700"
            onClick={() => {
              onEdit(pkg.id);
              setIsOpen(false);
            }}
          >
            <Edit className="h-4 w-4" /> Editar
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 rounded-none px-4 py-2 hover:bg-gray-50 text-gray-700 text-red-600 hover:text-red-700"
            onClick={() => {
              onDelete(pkg.id);
              setIsOpen(false);
            }}
          >
            <Trash2 className="h-4 w-4" /> Excluir
          </Button>
        </div>
      )}
    </div>
  );
};

export default function ManagePackagesPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [tours, setTours] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPackages();
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await fetch('/api/passeios');
      if (res.ok) {
        const data = await res.json();
        const mapping: Record<string, string> = {};
        data.forEach((t: Tour) => {
          mapping[t.id] = t.nome;
        });
        setTours(mapping);
      }
    } catch (error) {
      console.error("Erro ao buscar passeios:", error);
    }
  };

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/pacotes');
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      }
    } catch (error) {
      console.error("Erro ao buscar pacotes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = async (data: any) => {
    try {
      const res = await fetch('/api/pacotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        fetchPackages();
        setIsAddOpen(false);
      }
    } catch (error) {
      console.error("Erro ao criar pacote:", error);
    }
  };

  const handleEditSubmit = async (data: any) => {
    try {
      const res = await fetch('/api/pacotes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        fetchPackages();
        setIsEditOpen(false);
        setSelectedPkg(null);
      }
    } catch (error) {
      console.error("Erro ao atualizar pacote:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este pacote?")) return;
    try {
      const res = await fetch(`/api/pacotes?id=${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchPackages();
      }
    } catch (error) {
      console.error("Erro ao excluir pacote:", error);
    }
  };

  return (
    <div className="p-4 lg:p-6 bg-gray-50/50 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
            Gerenciar Pacotes
          </h1>
          <p className="text-gray-500 mt-1">
            Crie combos exclusivos, vincule múltiplos passeios e publique links diretos.
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="bg-orange-600 hover:bg-orange-700 text-white font-semibold self-start shadow-md hover:shadow-lg transition-all duration-200">
          <Plus className="h-5 w-5 mr-2" />
          Novo Pacote
        </Button>
      </div>

      <Card className="border border-gray-100 shadow-sm overflow-hidden bg-white">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
              <p className="mt-4 text-gray-500 text-sm font-medium animate-pulse">Carregando pacotes...</p>
            </div>
          ) : packages.length === 0 ? (
            <div className="p-12 text-center">
              <Layers className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-900 font-semibold text-lg">Nenhum pacote cadastrado</p>
              <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">Comece a agrupar seus passeios e crie pacotes promocionais atrativos para os seus clientes.</p>
              <Button onClick={() => setIsAddOpen(true)} className="mt-4 bg-orange-600 hover:bg-orange-700 text-white" size="sm">
                Criar Primeiro Pacote
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Pacote
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Passeios Vinculados
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Valor
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {packages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-orange-50 border border-orange-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {pkg.imagem ? (
                              <img
                                src={pkg.imagem}
                                alt={pkg.nome}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Layers className="h-5 w-5 text-orange-500" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 truncate">{pkg.nome}</p>
                            <p className="text-xs text-gray-500 truncate max-w-xs">{pkg.descricao || 'Sem descrição'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5 max-w-xs">
                          {pkg.passeios && pkg.passeios.length > 0 ? (
                            pkg.passeios.map((tourId) => (
                              <span
                                key={tourId}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-800 border border-orange-100"
                              >
                                {tours[tourId] || 'Passeio indisponível'}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-gray-400 font-medium">Nenhum passeio vinculado</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-orange-600 text-sm">
                          € {Number(pkg.preco || 0).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={`font-semibold transition-all px-2.5 py-0.5 rounded-full border ${
                            pkg.ativo
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                          }`}
                        >
                          {pkg.ativo ? "Ativo" : "Inativo"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ActionDropdown
                          pkg={pkg}
                          onEdit={(id) => {
                            const found = packages.find(p => p.id === id);
                            if (found) {
                              setSelectedPkg(found);
                              setIsEditOpen(true);
                            }
                          }}
                          onDelete={handleDelete}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <AddPackageModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddSubmit}
      />

      {selectedPkg && (
        <AddPackageModal
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedPkg(null);
          }}
          onSubmit={handleEditSubmit}
          initialData={selectedPkg}
          isEdit={true}
        />
      )}
    </div>
  );
}
