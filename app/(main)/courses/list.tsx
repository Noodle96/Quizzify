"use client";

import { courses, userProgress } from "@/db/schema";
import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ courses, activeCourseId }: Props) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    console.log("routerr: ", router);

    const onClick = (courseId: number) => {
        if(pending){
            console.log("pending");
            return;
        }
        if(courseId == activeCourseId){
            console.log("courseId == activeCourseId");
            return router.push("/learn");
        }
        // user selecting a new course
        startTransition(() => {
            console.log("startTransition");
            // router.push(`/courses/${courseId}`);
            upsertUserProgress(courseId).catch(() => toast.error("Something  went wrong."));
            // toast("Event has been created.")
        });
    };
    
    return(
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {courses.map((course) => (
                <Card
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    imageSrc={course.imageSrc}
                    onclick={onClick} // { () => {}}
                    disabled={pending}
                    active={course.id === activeCourseId}
                />
            ))}
        </div>
    );
}