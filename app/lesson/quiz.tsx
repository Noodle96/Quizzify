"use client";
import React, { Fragment, useState } from 'react'
import { challenges, challengesOptions } from '@/db/schema';
import { HeaderLesson } from './header-lesson';

type Props = {
    initialLessonId:number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengesOptions: typeof challengesOptions.$inferSelect[];
    })[];
    initialHearts: number;
    initialPercentage: number; 
    userSubscription: any; // TODO; replace with subscription DB type
}

export const Quiz = ({
    initialLessonId,
    initialLessonChallenges,
    initialHearts,
    initialPercentage,
    userSubscription,
}:Props) => {
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    return (
        <Fragment>
            <HeaderLesson
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscripcion={!!userSubscription?.isActive}
            />
        </Fragment>
    )
}