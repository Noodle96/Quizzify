import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button variant="ghost" size="lg" className="w-full">
                    <Image
                        src="/es.svg"
                        alt="Spanish flag"
                        width={40}
                        height={32}
                        className="mr-4 rounded-md"
                    /> Español
                </Button>
                <Button variant="ghost" size="lg" className="w-full">
                    <Image
                        src="/fr.svg"
                        alt="Frecnh flag"
                        width={40}
                        height={32}
                        className="mr-4 rounded-md"
                    /> Frances
                </Button>
                <Button variant="ghost" size="lg" className="w-full">
                    <Image
                        src="/hr.svg"
                        alt="Croatia flag"
                        width={40}
                        height={32}
                        className="mr-4 rounded-md"
                    /> Croata
                </Button>
                <Button variant="ghost" size="lg" className="w-full">
                    <Image
                        src="/it.svg"
                        alt="Italian flag"
                        width={40}
                        height={32}
                        className="mr-4 rounded-md"
                    /> Italiano
                </Button>
                <Button variant="ghost" size="lg" className="w-full">
                    <Image
                        src="/jp.svg"
                        alt="Japan flag"
                        width={40}
                        height={32}
                        className="mr-4 rounded-md"
                    /> Japones
                </Button>
            </div>
        </footer>
    );
}