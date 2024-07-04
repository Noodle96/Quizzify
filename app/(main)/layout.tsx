import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";

type Props = {
    children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
    return (
        <>
            <MobileHeader />
            <Sidebar classname="hidden lg:flex" />
            {/* El sidebar aparecera solo "lg" */}
            {/* pt-50 solo en movil luego pt-0 en desktop */}
            <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
                <div className="bg-red-400 h-full">
                    {children}
                </div>
            </main>
        </>
    );
}

export default MainLayout;