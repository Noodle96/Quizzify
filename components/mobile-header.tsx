import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
    return(
        <nav className="lg:hidden px-6 h-[50px] flex flex-row items-center \
                        bg-green-500 border-b fixed top-0 min-w-full to-zinc-500">
            <MobileSidebar />
        </nav>
    );
}