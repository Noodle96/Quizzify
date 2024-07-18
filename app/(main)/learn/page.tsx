import { getUserProgress } from "@/db/queries";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { redirect } from "next/navigation";

const LearnPage = async () => {
    const getUserProgressData = getUserProgress();
    const [
        userProgress
    ] = await Promise.all([
        getUserProgressData
    ]);
    console.log("User: ", userProgress);
    if(!userProgress || !userProgress.activeCourse){
        console.log("!userProgress || !userProgress.activeCourse");
        redirect("/courses");
    }
    
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                {/* My Stick wrapper */}
                <UserProgress
                    activeCourse = {{title: "Spanish", imageSrc:"/es.svg"}}
                    hearts = {7}
                    points = {101}
                    hasActiveSubscripcion = {false}
                />
            </StickyWrapper>

            <FeedWrapper>
                <Header title = "Spanish"/>
                <div className="space-y-4">
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>
                    <div className="h-[700px] bg-blue-500 w-full"/>

                </div>
            </FeedWrapper>
        </div>
    );
}
export default LearnPage;