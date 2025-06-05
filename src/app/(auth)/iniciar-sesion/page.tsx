import { Metadata } from "next";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión | SpectraScan",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Bienvenid@ Doctor/a.
            </h1>
          </div>
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
