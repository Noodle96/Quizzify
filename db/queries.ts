import {cache} from 'react';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import db from "./drizzle";
import { courses, userProgress } from '@/db/schema';

export const getUserProgress = cache(async () => {
    console.log("calling getUserProgress");
    const {userId} = await auth();
    console.log("[getUserProgress] userId:",userId);
    if(!userId){
        console.log("[getUserProgress] No user id");
        return null;
    }
    
    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with:{
            activeCourse: true,
        }
    });
    console.log("[getUserProgress] data:", data);
    return data;
});

export const getCourses = cache(async () => {
    const data =  await db.query.courses.findMany();
    return data;
});

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId ),
        // TODO: populate units and lessons
    });
    return data;
});