import {cache} from 'react';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import db from "./drizzle";
import { courses,
        units,
        userProgress
} from '@/db/schema';

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

export const getUnits = cache(async () => {
    const userProgress = await getUserProgress();
    if(!userProgress?.activeCourseId){
        return [];
    }
    const data = await db.query.units.findMany({
        where:eq(units.courseId, userProgress.activeCourseId),
        with:{
            lessons:{
                with:{
                    challenges:{
                        with:{
                            challengesProgress: true,
                        }
                    }
                }
            }
        }
    });

    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map( (lesson) => {
            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengesProgress
                        && challenge.challengesProgress.length > 0
                        && challenge.challengesProgress.every((progress) => progress.completed);
            });
            return {...lesson, completed: allCompletedChallenges};
        });
        return {...unit,lessons:lessonsWithCompletedStatus};
    });
    return normalizedData;
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