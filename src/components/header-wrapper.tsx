"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./header";
import WhatsAppFloat from "./whatsapp-float";

export default function HeaderWrapper() {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Não renderizar no servidor para evitar problemas de hidratação
  if (!isClient) {
    return null;
  }

  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="pt-20 md:pt-[116px]" />
      <WhatsAppFloat />
    </>
  );
}
