import { challenges, challengesOptions } from "@/db/schema"
import { cn } from "@/lib/utils";
import { Card } from "./card";

type Props = {
    options: typeof challengesOptions.$inferSelect[];
    onSelected: (optionId:number) => void; 
    status: "correcto" | "incorrecto" | "ninguno";
    selectedOption?: number;
    disabled: boolean;
    type: typeof challenges.$inferSelect["type"];
};

export const Challenge = ({
    options,
    onSelected,
    status,
    selectedOption,
    disabled,
    type,
}:Props) => {
    return(
        <div className={cn(
            "grid gap-2",
            type === "ASSIST" && "grid-cols-1",
            type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
        )}>
            {/* <div className="flex flex-col gap-y-40">
                {options.map( (option, i) => (
                    <div >
                        {JSON.stringify(option)}
                    </div>
                ))}
            </div> */}
            {options.map( (option, index) => (
                <Card
                    key={option.id}
                    id={option.id}
                    text={option.text}
                    imageSrc={option.imageSrc}
                    shortCut={`${index + 1}`}
                    selected={selectedOption === option.id}
                    onClick={ () => onSelected(option.id)}
                    status={status}
                    audioSrc={option.audioSrc}
                    disabled={disabled}
                    type={type}
                />
            ))}
        </div>
    );  
};
