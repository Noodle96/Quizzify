"use server";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { userAgentFromString } from "next/server";

export const upsertUserProgress = async (courseId: number) => {
    console.log("calling upsertUserProgress");
    
    const {userId} = await auth();
    const user = await currentUser();
    console.log("[upsertUserProgress] userId:",userId);
    console.log("[upsertUserProgress] user: ", user);
    
    

    if(!userId || !user){
        throw new Error("Unauthorized");
    }
    const course = await getCourseById(courseId);
    console.log("[upsertUserProgress] course: ", course);
    
    if(!course){
        throw new Error("Course not found");
    }

    // throw new Error("Test")
    // TODO: Enable once units and lesson are created
    // if(!course.units.length || !course.units[0].lessons.length){
    //     throw new Error("Course is empty");
    // }
    const existingUserProgress = await  getUserProgress();
    console.log("[upsertUserProgress] existingUserProgress: ", existingUserProgress);
    //cuando el usuario entra por primera vez a seleccionar un curso y ya existe
    if(existingUserProgress){
        console.log("[upsertUserProgress] existingUserProgress conditional");
        
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName:user.firstName || "User random",
            userImageSrc: user.imageUrl || "/mascot.svg",
        });
        // .where(inArray(userProgress.userId, [userId]));


        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn")
    }
    //cuando el usuario entra por primera vez a seleccionar un curso
    console.log("[upsertUserProgress] existingUserProgress conditional 2");
    
    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName:user.firstName || "User random",
        userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
};