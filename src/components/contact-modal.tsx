"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, User, Send, Loader2, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !observacoes.trim()) {
      toast.error("Por favor, preencha todos os campos obrigatórios (*).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          telefone: telefone.trim() || null,
          passeioId: "contato_geral",
          passeioNome: "Contato Geral via Site",
          observacoes: observacoes.trim(),
          pessoas: 1,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
        setNome("");
        setEmail("");
        setTelefone("");
        setObservacoes("");
        onOpenChange(false);
      } else {
        toast.error(data.error || "Houve um erro ao enviar sua mensagem.");
      }
    } catch (error) {
      console.error("Erro ao enviar contato:", error);
      toast.error("Erro ao enviar mensagem. Por favor, tente novamente ou fale conosco no WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden rounded-xl border border-orange-100 shadow-2xl bg-white">
        {/* Banner de Cabeçalho do Modal */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white relative">
          <div className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors">
            {/* O botão X do DialogClose é renderizado automaticamente pelo DialogContent */}
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white/10 rounded-lg backdrop-blur-md">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-xl font-bold text-white">Enviar E-mail</DialogTitle>
          </div>
          <DialogDescription className="text-orange-50/90 text-sm">
            Preencha os dados abaixo para nos enviar uma mensagem direta por e-mail. Nossa equipe retornará o contato o mais rápido possível!
          </DialogDescription>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">
          {/* Nome */}
          <div className="space-y-1.5">
            <Label htmlFor="contact-nome" className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <User className="h-3.5 h-3.5 text-orange-500" />
              Nome Completo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contact-nome"
              type="text"
              placeholder="Ex: Maria Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={isSubmitting}
              className="h-11 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg text-sm"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="contact-email" className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Mail className="h-3.5 h-3.5 text-orange-500" />
              E-mail para retorno <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="Ex: maria@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="h-11 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg text-sm"
              required
            />
          </div>

          {/* Telefone */}
          <div className="space-y-1.5">
            <Label htmlFor="contact-telefone" className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Phone className="h-3.5 h-3.5 text-orange-500" />
              Telefone / WhatsApp <span className="text-gray-400 font-normal text-xs">(Opcional)</span>
            </Label>
            <Input
              id="contact-telefone"
              type="tel"
              placeholder="Ex: +55 (11) 99999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              disabled={isSubmitting}
              className="h-11 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg text-sm"
            />
          </div>

          {/* Observações / Mensagem */}
          <div className="space-y-1.5">
            <Label htmlFor="contact-observacoes" className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <MessageSquare className="h-3.5 h-3.5 text-orange-500" />
              Mensagem ou Observações <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="contact-observacoes"
              placeholder="Escreva aqui sua dúvida, observação ou detalhes da sua solicitação..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              disabled={isSubmitting}
              rows={4}
              className="border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg text-sm resize-none"
              required
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-3 border-t border-gray-100 mt-6">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11 border-gray-200 hover:bg-gray-50 rounded-lg text-gray-700 font-semibold"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-11 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold shadow-md hover:shadow-lg transition-all rounded-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensagem
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
