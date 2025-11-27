import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  const handleNuevaOferta = (oficio: {
    titulo: string;
    descripcion: string;
    curso: string;
    precio: string;
    email: string;
  }) => {
    console.log("Nueva oferta creada:", oficio)
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onSubmit={handleNuevaOferta} />
      </div>
    </div>
  )
}
