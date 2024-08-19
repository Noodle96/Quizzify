import { getUnits,
    getUserProgress,
    getAllUserProgress,
    getCourseProgress,
    getLessonPercentage,
} from "@/db/queries";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { redirect } from "next/navigation";
import { Unit } from "./unit";

import {lessons, units as unitsSchema} from "@/db/schema";

const LearnPage = async () => {
    console.log("Calling LearnPage");
    
    const getUserProgressData = getUserProgress();
    const getUnitsData = getUnits();
    const getAllUserProgressData = getAllUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();

    const [
        userProgress,
        units,
        userAllUserProgress,
        courseProgress,
        lessonPercentage,

    ] = await Promise.all([
        getUserProgressData,
        getUnitsData,
        getAllUserProgressData,
        courseProgressData,
        lessonPercentageData,
    ]);
    console.log("[LearnPage] UserProgres: ", userProgress);
    console.log("[LearnPage] UserProgres.activeCourse: ", userProgress?.activeCourse);

    console.log("[LearnPage] Units: ", units);
    
    
    //Solo entra aqui cuando el usuario aun no ha seleccionado un curso
    if(!userProgress || !userProgress.activeCourse){
        console.log("[LearnPage] !userProgress || !userProgress.activeCourse");
        redirect("/courses");
    }
    if(!courseProgress){
        redirect("/courses");
    }
    
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                {/* My Stick wrapper */}
                <UserProgress
                    activeCourse = {userProgress.activeCourse}
                    hearts = {userProgress.hearts}
                    points = {userProgress.points}
                    hasActiveSubscripcion = {false}
                />
            </StickyWrapper>

            <FeedWrapper>
                <Header title = {userProgress.activeCourse.title}/>

                {/* <div>
                    {userAllUserProgress.map((user) => (
                        <div key={user.userId}>
                            <p>{user.userName}</p>
                            <p>{user.userImageSrc}</p>
                        </div>
                    ))}
                </div> */}
                
                { units.map((unit) => (
                    <div key={unit.id} className=" mb-10">
                        {/* {JSON.stringify(unit)} */}
                        <Unit
                            id = {unit.id}
                            order = {unit.order}
                            description = {unit.description}
                            title = {unit.title}
                            lessons = {unit.lessons}
                            activeLesson = {courseProgress.activeLesson as typeof lessons.$inferSelect & {
                                unit: typeof unitsSchema.$inferSelect;
                            } | undefined}
                            activeLessonPercentage = {lessonPercentage}
                        />
                    </div>
                ))}
                
            </FeedWrapper>
        </div>
    );
}
export default LearnPage;