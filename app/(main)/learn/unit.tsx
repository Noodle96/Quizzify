import { lessons, units } from "@/db/schema";
import { Fragment } from "react";
import { UnitBanner } from "./unit-baner";
import { LessonButton } from "./lesson-button";

type Props = {
    id:number;
    order:number;
    title:string;
    description:string;
    lessons: (typeof lessons.$inferSelect & {completed: boolean;})[];
    activeLesson: typeof lessons.$inferSelect & {unit: typeof units.$inferSelect} | undefined;
    activeLessonPercentage: number;
}


export const Unit = ({
    id,
    order,
    title,
    description,
    lessons,
    activeLesson,
    activeLessonPercentage
}:Props) => {
    return(
        <Fragment>
            <UnitBanner
                title={title}
                description={description}
            />
            <div className="flex flex-col items-center relative">
                {lessons.map( (lesson, index) => {
                    const isCurrent = lesson.id == activeLesson?.id;
                    const isLocked = !isCurrent && !lesson.completed;
                    return(
                        <LessonButton
                            key={lesson.id}
                            id={lesson.id}
                            index={index}
                            totalCount={lessons.length - 1}
                            locked={isLocked}
                            current={isCurrent}
                            percentage={activeLessonPercentage}
                        />
                    );
                } )};
            </div>
        </Fragment>
    );
}