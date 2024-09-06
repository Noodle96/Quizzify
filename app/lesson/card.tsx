import {cn} from "@/lib/utils";
import { challenges } from "@/db/schema";
import Image from "next/image";

type Props = {
    id:number;
    text:string;
    imageSrc:string | null;
    shortCut:string;
    selected?:boolean;
    onClick: () => void;
    status: "correcto" | "incorrecto" | "ninguno";
    audioSrc: string | null;
    disabled?: boolean;
    type: typeof challenges.$inferSelect["type"];
};

export const Card = ({
    id,
    text,
    imageSrc,
    shortCut,
    selected,
    onClick,
    status,
    audioSrc,
    disabled,
    type
}: Props) => {
    return(
        <div
            onClick={() => {}}
            className={cn(
                "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
                selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
                selected && status == "correcto" && "border-green-300 bg-green-100 hover:bg-green-100",
                selected && status == "incorrecto" && "border-rose-300 bg-rose-100 hover:bg-rose-100",
                disabled && "pointer-events-none hover:bg-white",
                type === "ASSIST" && "lg:p-3 w-full",
            )}>
            {imageSrc && (
                <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
                    <Image
                        src={imageSrc}
                        width={80}
                        height={80}
                        alt={text}
                    />
                </div>
            )}
            <div className={cn(
                "flex flex-row items-center justify-between",
                type === "ASSIST" && "flex-row-reverse",
            )}>
                {type === "ASSIST" && <div />}
                <p className={cn(
                    "text-neutral-600 text-sm lg:text-base font-semibold",
                    selected && "text-sky-500",
                    selected && status == "correcto" && "text-green-500",
                    selected && status == "incorrecto" && "text-rose-500",
                )}>
                    {text}
                </p>
            </div>
        </div>
    );
};