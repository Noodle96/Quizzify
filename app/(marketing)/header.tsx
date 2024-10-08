import Image from "next/image";
import { Loader } from "lucide-react";
import { ClerkLoaded,
        ClerkLoading,
        SignedIn,
        SignedOut,
        SignInButton,
        UserButton,
 } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const Header = () => {
    return (
        <header className="h-20 w-full border-b-2 border-slate-200 px-4">
            <div className="lg:max-w-screen-lg mx-auto flex items-center \
                            justify-between h-full pr-3">
                <div className="pt-8 pl-4 pb-7 flex flex-row gap-x-3 ">
                    <Image
                        src="/mascot.svg"
                        alt="logo"
                        width={40}
                        height={40}
                    />
                    <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
                        Quizzify
                    </h1>
                </div>

                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>

                <ClerkLoaded>
                    <SignedIn>
                        <UserButton
                            // is working 
                            afterSignOutUrl="/" 
                        />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton
                            mode="modal"
                            // afterSignInUrl="/learn"
                            // afterSignUpUrl="/learn"
                            // forceRedirectUrl="learn"
                        >
                            
                            <Button variant="ghost" size="lg">Login</Button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>         
            </div>
        </header>
    );
}