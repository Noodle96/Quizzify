import {cache} from 'react';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import db from "./drizzle";
import { challengesProgress,
        courses,
        lessons,
        units,
        userProgress
} from '@/db/schema';
import { log } from 'console';


/**
 * consultas de prueba
 */
export const getAllUserProgress = cache(async () => {
    const data = await db.query.userProgress.findMany();
    return data;
});

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
    const {userId} = await auth();
    const userProgress = await getUserProgress();
    if(!userId || !userProgress?.activeCourseId){
        return [];
    }
    const data = await db.query.units.findMany({
        where:eq(units.courseId, userProgress.activeCourseId),
        with:{
            lessons:{
                with:{
                    challenges:{
                        with:{
                            // challengesProgress: true,
                            challengesProgress:{
                                where: eq(challengesProgress.userId, userId),
                            }
                        }
                       
                    }
                }
            }
        }
    });
    // print data
    // console.log("[getUnits] data:", data);
    const normalizedData = data.map((unit) => {
        console.log("unit name: ", unit.title);
        
        const lessonsWithCompletedStatus = unit.lessons.map( (lesson) => {
            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                // console.log("\t 1: ", challenge.challengesProgress);
                // console.log("\t 2: ",challenge.challengesProgress.length > 0);
                // console.log("\t3: ",challenge.challengesProgress.every((progress2) => progress2.completed));
                
                
                return challenge.challengesProgress
                        && challenge.challengesProgress.length > 0
                        && challenge.challengesProgress.every((progress) => progress.completed);
            });
            console.log("[getUnits] allCompletedChallenges:", allCompletedChallenges);
            
            return {...lesson, completed: allCompletedChallenges};
        });
        // console.log("[getUnits] lessonsWithCompletedStatus:", lessonsWithCompletedStatus);
        
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


export const getCourseProgress = cache(async () => {
    const {userId} = await auth();
    const userProgress = await getUserProgress();
    if(!userId || !userProgress?.activeCourseId){
        return null;
    }
    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy:(units,{asc}) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with:{
            lessons:{
                orderBy:(lessons,{asc}) => [asc(lessons.order)],
                with:{
                    unit:true,
                    challenges:{
                        with:{
                            challengesProgress:{
                                where: eq(challengesProgress.userId, userId),
                            },
                        },
                    },
                },
            },
        },
    });
    const firstUnCompletedLesson = unitsInActiveCourse.flatMap((unit) => unit.lessons).find((lesson) => {
        // TODO: if something doesn't work, check the last if clause
        return lesson.challenges.some((challenge) => {
            return !challenge.challengesProgress
                    || challenge.challengesProgress.length === 0
                    || challenge.challengesProgress.some((progress) => progress.completed === false);
        });
    });
    return {
        activeLesson: firstUnCompletedLesson,
        activeLessonId: firstUnCompletedLesson?.id,
    };
});

export const getLesson = cache(async (id?: number) => {
    const {userId} = await auth();

    if(!userId){
        return null;
    }

    const courseProgress = await getCourseProgress();

    const lessonId = id || courseProgress?.activeLessonId;

    if(!lessonId){
        return null;
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with:{
            challenges:{
                orderBy: (challenges,{asc}) => [asc(challenges.order)],
                with:{
                    challengesOptions: true,
                    challengesProgress:{
                        where: eq(challengesProgress.userId, userId),
                    },
                },
            },
        },
    });

    if(!data || !data.challenges){
        return null;
    }

    const normalizedChallenges = data.challenges.map((challenge) => {
        // TODO: if something doesn't work, check the last if clause
        const completed = challenge.challengesProgress
                        && challenge.challengesProgress.length > 0
                        && challenge.challengesProgress.every((progress) => progress.completed);
        return {...challenge, completed: completed};
    });
    
    return {...data, challenges: normalizedChallenges};
});

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress();
    if(!courseProgress?.activeLessonId){
        return 0;
    }
    const lesson = await getLesson(courseProgress.activeLessonId);
    if(!lesson){
        return 0;
    }
    const completedChallenges = lesson.challenges.filter((challenge) => challenge.completed);
    const percentage = Math.round((completedChallenges.length / lesson.challenges.length) * 100);
    return percentage;
});