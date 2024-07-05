import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ClerkLoaded,
        ClerkLoading,
        SignInButton,
        SignUpButton,
        SignedIn,
        SignedOut
} from "@clerk/nextjs";

export default function Home() {
  return(
    <div className="max-w-[988px] mx-auto flex flex-col flex-1 \ 
                    w-full lg:flex-row items-center  \
                    p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] \
                      lg:h-[424px] mb-8 lg:mb-0">
          <Image src="/hero.svg" fill alt="logo hero"/>
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          Practica y aprende rapidamente e interactivamente con Quizzify.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>

            {/* significa que el usuario no esta autenticado */}
            <SignedOut>
              {/* afterSignInUrl = "/learn" afterSignUpUrl = "/learn" */}
              {/* usuario crear una cuenta */}
              <SignUpButton mode="modal" forceRedirectUrl="/learn">
                <Button variant="secondary" size="lg" className="w-full">
                  Comenzar
                </Button>
              </SignUpButton>
              {/* usuario login(ya tiene una cuenta) */}
              <SignInButton mode="modal" forceRedirectUrl="/learn">
                <Button variant="primaryOutline" size="lg" className="w-full">
                  Ya tengo una cuenta
                </Button>
                
              </SignInButton>
            </SignedOut>

            {/* significa que el usuario esta autenticado */}
            <SignedIn>
              {/* importante aschild props ya que estamos usando el componente Link
              como hijo de Button */}
              <Button variant="secondary" size="lg" className="w-full" asChild>
                <Link href="/learn">Continuar aprendiendo</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}