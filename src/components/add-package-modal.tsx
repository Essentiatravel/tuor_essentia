"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Upload, Loader2, Check } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";

interface AddPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (packageData: PackageData) => void;
  initialData?: PackageData;
  isEdit?: boolean;
}

interface PackageData {
  id?: string;
  nome: string;
  descricao: string;
  link: string;
  imagem: string;
  passeios: string[]; // List of tour IDs
  ativo: boolean;
}

interface Tour {
  id: string;
  nome: string;
  preco: number;
  duracao: string;
  categoria: string;
}

export default function AddPackageModal({ isOpen, onClose, onSubmit, initialData, isEdit = false }: AddPackageModalProps) {
  const { uploadImage, uploading, error, clearError } = useImageUpload();

  const [formData, setFormData] = useState<PackageData>(initialData || {
    nome: "",
    descricao: "",
    link: "",
    imagem: "",
    passeios: [],
    ativo: true,
  });

  const [tours, setTours] = useState<Tour[]>([]);
  const [loadingTours, setLoadingTours] = useState(false);
  const [newImage, setNewImage] = useState("");

  // Load tours from DB
  useEffect(() => {
    if (isOpen) {
      const fetchTours = async () => {
        try {
          setLoadingTours(true);
          const res = await fetch('/api/passeios');
          if (res.ok) {
            const data = await res.json();
            setTours(data);
          }
        } catch (err) {
          console.error("Erro ao carregar passeios no modal:", err);
        } finally {
          setLoadingTours(false);
        }
      };
      fetchTours();
    }
  }, [isOpen]);

  // Sync initialData
  useEffect(() => {
    if (initialData && isEdit) {
      setFormData(initialData);
    } else if (!isEdit) {
      setFormData({
        nome: "",
        descricao: "",
        link: "",
        imagem: "",
        passeios: [],
        ativo: true,
      });
    }
  }, [initialData, isEdit, isOpen]);

  const handleInputChange = (field: keyof PackageData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTourToggle = (tourId: string) => {
    setFormData(prev => {
      const exists = prev.passeios.includes(tourId);
      if (exists) {
        return {
          ...prev,
          passeios: prev.passeios.filter(id => id !== tourId)
        };
      } else {
        return {
          ...prev,
          passeios: [...prev.passeios, tourId]
        };
      }
    });
  };

  const handleImageUpload = async (file: File) => {
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setFormData(prev => ({
        ...prev,
        imagem: imageUrl
      }));
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
    event.target.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">{isEdit ? "Editar Pacote" : "Criar Novo Pacote"}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="nome">Nome do Pacote *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                placeholder="Ex: Combo Aventura Total"
                required
              />
            </div>

            <div>
              <Label htmlFor="link">Link Personalizado / CTA *</Label>
              <Input
                id="link"
                value={formData.link}
                onChange={(e) => handleInputChange("link", e.target.value)}
                placeholder="Ex: /checkout/pacote-aventura ou link do WhatsApp"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="descricao">Descrição do Pacote</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange("descricao", e.target.value)}
              placeholder="Descreva o que está incluído no pacote, vantagens, etc."
              rows={4}
            />
          </div>

          {/* Selecionar Passeios (Puxar passeios) */}
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-semibold text-gray-950">Vincular Passeios (Puxar Passeios) *</Label>
              <p className="text-xs text-gray-500 mt-1">Selecione quais passeios fazem parte deste pacote</p>
            </div>
            
            {loadingTours ? (
              <div className="py-4 text-center">
                <Loader2 className="h-6 w-6 animate-spin text-orange-600 mx-auto" />
                <p className="text-xs text-gray-500 mt-1">Carregando passeios...</p>
              </div>
            ) : tours.length === 0 ? (
              <div className="p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
                Nenhum passeio cadastrado para vincular.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                {tours.map((tour) => {
                  const isChecked = formData.passeios.includes(tour.id);
                  return (
                    <button
                      key={tour.id}
                      type="button"
                      onClick={() => handleTourToggle(tour.id)}
                      className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                        isChecked
                          ? "border-orange-500 bg-orange-50/50 text-orange-950"
                          : "border-gray-200 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{tour.nome}</p>
                        <p className="text-xs text-gray-500">{tour.categoria} • €{Number(tour.preco || 0).toFixed(2)}</p>
                      </div>
                      <div className={`h-5 w-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
                        isChecked ? "bg-orange-500 border-orange-500 text-white" : "border-gray-300"
                      }`}>
                        {isChecked && <Check className="h-3 w-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Imagem do Pacote */}
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-semibold text-gray-950">Imagem do Pacote</Label>
              <p className="text-xs text-gray-500 mt-1">Faça upload ou adicione a URL da imagem principal</p>
            </div>

            {/* Upload de arquivo */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="package-image-upload"
                disabled={uploading}
              />
              <label
                htmlFor="package-image-upload"
                className={`cursor-pointer flex flex-col items-center gap-2 ${uploading ? 'opacity-50' : 'hover:text-orange-600'}`}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  {uploading ? (
                    <Loader2 className="h-6 w-6 text-orange-600 animate-spin" />
                  ) : (
                    <Upload className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-orange-600">
                    {uploading ? 'Enviando...' : 'Clique para fazer upload'}
                  </span>
                  <span className="text-gray-500"> ou arraste uma imagem aqui</span>
                </div>
                <p className="text-xs text-gray-400">PNG, JPG, JPEG até 5MB</p>
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
                <button
                  onClick={clearError}
                  className="text-xs text-red-500 hover:text-red-700 mt-1"
                >
                  Fechar
                </button>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">ou adicione uma URL</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="https://exemplo.com/imagem-pacote.jpg"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={() => {
                  if (newImage.trim()) {
                    handleInputChange("imagem", newImage.trim());
                    setNewImage("");
                  }
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Aplicar
              </Button>
            </div>

            {formData.imagem && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={formData.imagem}
                      alt="Preview Pacote"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm text-orange-700 truncate font-medium">
                    {formData.imagem.length > 50 ? `${formData.imagem.substring(0, 50)}...` : formData.imagem}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleInputChange("imagem", "")}
                  className="text-orange-500 hover:text-orange-700 transition-colors ml-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Ativo/Inativo */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="ativo"
              checked={formData.ativo}
              onChange={(e) => handleInputChange("ativo", e.target.checked)}
              className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <Label htmlFor="ativo" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
              Pacote Ativo (visível no site)
            </Label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancelar
            </Button>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold">
              {isEdit ? "Salvar Alterações" : "Criar Pacote"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
