import { cn } from "@/lib/utils"
type Props = {
    classname?: string;
};
export const Sidebar = ({classname}:Props) => {
    return(
        <div className={cn("bg-blue-500 h-full lg:w-[256px] lg:fixed \
                        left-0 top-0 border-r-2 flex flex-col px-4",classname)}>
            Sidebars
        </div>
    );
}