"use client";

import { useState } from "react";
import { oficios as initialOficios } from "./oficios.js";
import { LoginForm } from "@/components/login-form";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface Oficio {
  titulo: string;
  descripcion: string;
  curso: string;
  precio: string;
  fecha: string;
}

// Componente hijo
function AceptarDialog({ titulo }: { titulo: string }) {
  const [nombreLocal, setNombreLocal] = useState("");
  const [emailLocal, setEmailLocal] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2 w-full bg-[#D46D85] hover:bg-[#D46D85] text-white cursor-pointer font-family: var(--font-montserrat);">
          Aceptar
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-title font-bold font-title text-[#124d58]">Aceptar oferta</DialogTitle>
          <DialogDescription>
            Introduce tu nombre y correo para aceptar la oferta de{" "}
            <strong>{titulo}.</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Nombre</label>
            <Input
              value={nombreLocal}
              onChange={(e) => setNombreLocal(e.target.value)}
              placeholder="Samuel García"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <Input
              value={emailLocal}
              onChange={(e) => setEmailLocal(e.target.value)}
              placeholder="usuario@dominio.es"
            />
          </div>

          <DialogDescription>
            En breves recibirás un correo del ofertante.
          </DialogDescription>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className=" bg-[#D46D85] hover:bg-[#D46D85] cursor-pointer">Aceptar oferta</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


function NuevaOfertaDialog({ onSubmit }: { onSubmit: (oficio: any) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#D46D85] hover:bg-[#D46D85] text-white cursor-pointer font-family: var(--font-montserrat);">
          + Crear oferta
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {/* Puedes descomentar esto si quieres título en el diálogo */}
          {/* <DialogTitle className="font-title">Crear nueva oferta</DialogTitle> */}
          {/* <DialogDescription>
            Rellena los datos de la oferta para publicarla.
          </DialogDescription> */}
        </DialogHeader>

        <div className="py-4">
          <LoginForm
            onSubmit={(oficio) => {
              onSubmit(oficio);
              setOpen(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function LoginPage() {
  const normalizedInitial: Oficio[] = initialOficios.map((o: any) => ({
    titulo: o.titulo ?? "",
    descripcion: o.descripcion ?? "",
    curso: o.curso ?? "",
    precio: o.precio ?? "",
    fecha: o.fecha ?? "",
  }));

  const [oficios, setOficios] = useState<Oficio[]>(normalizedInitial);

  const handleNuevaOferta = (oficio: {
    titulo: string;
    descripcion: string;
    curso: string;
    precio: string;
    fecha: string;
    email: string;
  }) => {
    let fechaFormateada = oficio.fecha;
    if (oficio.fecha.includes("-")) {
      const [year, month, day] = oficio.fecha.split("-");
      fechaFormateada = `${day}/${month}/${year}`;
    }

    const precioFormateado = oficio.precio.includes("€")
      ? oficio.precio
      : `${oficio.precio}€/h`;

    setOficios((prev) => [
      ...prev,
      {
        titulo: oficio.titulo,
        descripcion: oficio.descripcion,
        curso: oficio.curso,
        precio: precioFormateado,
        fecha: fechaFormateada,
      },
    ]);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>

        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>


        <div className="flex justify-end p-4">
          <NuevaOfertaDialog onSubmit={handleNuevaOferta} />
        </div>


        <h2 className="text-2xl font-bold px-4 font-title text-[#124d58]">
          Ofertas actuales
        </h2>


        <div className="flex flex-col gap-4 p-4">

          <div className="grid gap-4 md:grid-cols-4">
            {oficios.map((oficio, index) => (
              <div key={index} className="bg-white shadow rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(18,77,88,0.4)]">
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="font-semibold font-title">{oficio.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{oficio.descripcion}</p>
                  <p className="text-xs text-muted-foreground">Curso: {oficio.curso}</p>
                  <p className="text-xs text-muted-foreground">Fecha: {oficio.fecha}</p>
                  <p className="text-sm font-bold font-title text-[#124d58]">{oficio.precio}</p>

                  {/* Botón */}
                  <AceptarDialog titulo={oficio.titulo} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
