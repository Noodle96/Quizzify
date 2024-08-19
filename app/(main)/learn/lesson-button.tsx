"use client";

import {Check,
        Crown,
        Star,
} from "lucide-react";
import Link from "next/link";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import "react-circular-progressbar/dist/styles.css";

type Props = {
    id: number;
    index: number
    totalCount: number;
    locked?: boolean;
    current?: boolean;
    percentage: number;
};

export const LessonButton = ({
    id,
    index,
    totalCount,
    locked,
    current,
    percentage
}:Props) => {
    const cycleLength = 8;
    const cicleIndex = index % cycleLength;
    let indentationLevel;

    if(cicleIndex <= 2){
        indentationLevel = cicleIndex;
    } else if(cicleIndex <=4){
        indentationLevel = 4 - cicleIndex;
    }else if (cicleIndex <= 6){
        // indentationLevel = cicleIndex - 6;
        indentationLevel = 4 - cicleIndex;// CORREGIR
    }else{
        indentationLevel = cicleIndex - 8
    }
    // console.log("index: ", index);

    const rightPosition = indentationLevel * 40;
    console.log("rightPosition: ", rightPosition);

    const isFirst = index === 0;
    const isLast = index === totalCount;
    const isCompleted = !current && !locked;
    const Icon = isCompleted ? Check : isLast ? Crown : Star;
    const href = isCompleted ? `/lesson/${id}` : "/lesson";
    console.log("href: ", href);
    
    

    return(
        <Link
            href={href}
            aria-disabled={locked}
            style={{pointerEvents:locked?"none":"auto"}}
        >
            <div
                className="relative"
                style={{
                    right: `${rightPosition}px`,
                    marginTop: isFirst && !isCompleted ? 60 : 24,
                }}
            >
                {/* the value of current:  {current} */}
                {current ? (
                    // bg-red-500
                    <div className="h-[102px] w-[102px] relative">
                        <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-4 font-bold \
                                        uppercase text-green-500 bg-white rounded-xl \
                                        animate-bounce tracking-wide z-10">
                            {/* {rightPosition} */}
                            Start
                            {/* little arrow down */}
                            <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 \
                                            border-x-transparent border-t-8 transform -translate-x-1/2"/>
                        </div>
                        <CircularProgressbarWithChildren
                            value={Number.isNaN(percentage) ? 0 : percentage}
                            styles = {{
                                path:{
                                    stroke: "#4ade80",
                                },
                                trail:{
                                    stroke: "#d6d6d6",
                                },
                            }}
                        >
                            <Button
                                size="rounded"
                                variant = {locked ? "locked" : "secondary" }
                                className="h-[70px] w-[70px] border-b-8"
                            >
                                <Icon
                                    className={cn(
                                        "h-10 w-10",
                                        locked
                                        ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                                        : "fill-primary-foreground text-primary-foreground",
                                        isCompleted && "fill-none stroke-[4]"
                                    )}
                                />
                            </Button>

                        </CircularProgressbarWithChildren>
                    </div>
                ): (
                    <Button
                        size="rounded"
                        variant = {locked ? "locked" : "secondary" }
                        className="h-[70px] w-[70px] border-b-8"
                    >
                        <Icon
                            className={cn(
                                "h-10 w-10",
                                locked
                                ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                                : "fill-primary-foreground text-primary-foreground",
                                isCompleted && "fill-none stroke-[4]"
                            )}
                        />
                    </Button>
                )}
            </div>
        </Link>
    );
};