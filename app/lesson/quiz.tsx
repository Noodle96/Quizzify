"use client";
import React, { Fragment, useState } from 'react'
import { challenges, challengesOptions } from '@/db/schema';
import { HeaderLesson } from './header-lesson';
import { QuestionBubble } from './question-bubble';
import { Challenge } from './challenge';

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
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState( () => {
        const uncompletedIndex = challenges.findIndex( (challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });
    const challenge = challenges[activeIndex];
    const options = challenge?.challengesOptions ?? [];

    const title = challenge.type === "ASSIST" ? "Seleccione el significado correcto" : challenge.question;
    return (
        <Fragment>
            <HeaderLesson
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscripcion={!!userSubscription?.isActive}
            />
            <div className='flex-1'>
                <div className='h-full flex flex-row items-center justify-center'>
                    <div className='lg:min-h-[350px]  lg:w-[600px] w-full px-6  lg:px-0 flex flex-col gap-y-12'>
                        <h1 className='text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700'>
                            {title}
                        </h1>
                        <div>
                            {challenge.type === "ASSIST" && (
                                <QuestionBubble
                                    question = {challenge.question}
                                />
                            )}
                            <Challenge
                                options = {options}
                                onSelected = {() => {}}
                                status = "ninguno"
                                selectedOption = {undefined}
                                disabled = {false}
                                type = {challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}