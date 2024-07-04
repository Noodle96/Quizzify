import { cn } from "@/lib/utils"
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { Loader } from "lucide-react";
import {
    ClerkLoaded,
    ClerkLoading,
    UserButton,
} from "@clerk/nextjs";

type Props = {
    classname?: string;
};
export const Sidebar = ({classname}:Props) => {
    return(
        <div className={cn("h-full lg:w-[256px] lg:fixed \
                        left-0 top-0 border-r-2 flex flex-col px-4",classname)}>
            <Link href="/learn">
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
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem
                    label = "Learn"
                    iconSrc="/learn.svg"
                    href="/learn"
                />
                <SidebarItem
                    label = "Leaderboard"
                    iconSrc="/leaderboard.svg"
                    href="/leaderboard"
                />
                <SidebarItem
                    label = "quests"
                    iconSrc="/quests.svg"
                    href="/quests"
                />
                <SidebarItem
                    label = "shop"
                    iconSrc="/shop.svg"
                    href="/shop"
                />
            </div>
            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/" />
                </ClerkLoaded>
            </div>
        </div>
    );
}