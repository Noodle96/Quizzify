import {cache} from 'react';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import db from "./drizzle";
import { userProgress } from '@/db/schema';

export const getUserProgress = cache(async () => {
    const {userId} = await auth();
    console.log("userId:",userId);
    if(!userId){
        console.log("No user id");
        return null;
    }
    
    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with:{
            activeCourse: true,
        }
    });
    console.log("data:");
    console.log(data);
    return data;
});

export const getCourses = cache(async () => {
    const data =  await db.query.courses.findMany();
    return data;
});