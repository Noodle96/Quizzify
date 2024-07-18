import {getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";

const CoursesPage = async () => {
    console.log("Calling CoursesPage");
    
    const coursesData = getCourses();
    const userProgressData = getUserProgress();
    
    const [courses, userProgress] = await Promise.all([coursesData, userProgressData]);

    console.log("[CoursesPage] courses: ",courses);
    console.log("[CoursesPage] userProgress: ",userProgress);
    // console.log("de aqui");
    // console.log(data);

    return (
        <div className="h-full max-w-[912px] \
                        px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Language courses
            </h1>
            {/* {JSON.stringify(data)} */}
            <List
                courses = {courses}
                activeCourseId = {userProgress?.activeCourseId}
            />
        </div>
    );
};

export default CoursesPage;