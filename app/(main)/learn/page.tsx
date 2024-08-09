import { getUnits,
    getUserProgress
} from "@/db/queries";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { redirect } from "next/navigation";

const LearnPage = async () => {
    console.log("Calling LearnPage");
    
    const getUserProgressData = getUserProgress();
    const getUnitsData = getUnits();
    const [
        userProgress,
        units,
    ] = await Promise.all([
        getUserProgressData,
        getUnitsData,
    ]);
    console.log("[LearnPage] UserProgres: ", userProgress);
    console.log("[LearnPage] UserProgres.activeCourse: ", userProgress?.activeCourse);

    console.log("[LearnPage] Units: ", units);
    
    
    //Solo entra aqui cuando el usuario aun no ha seleccionado un curso
    if(!userProgress || !userProgress.activeCourse){
        console.log("[LearnPage] !userProgress || !userProgress.activeCourse");
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
                {/* <div className="space-y-4">
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>

                </div> */}
                { units.map((unit) => (
                    <div key={unit.id} className=" mb-10">
                        {JSON.stringify(unit)}
                    </div>
                ))}
            </FeedWrapper>
        </div>
    );
}
export default LearnPage;