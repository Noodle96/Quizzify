import { redirect } from 'next/navigation';
import React, { Fragment } from 'react'
import { getLesson,
        getUserProgress,
} from '@/db/queries';
import { Quiz } from './quiz';

const LessonPage = async () => {

    const lessonData = getLesson();
    const userProgressData = getUserProgress();

    const [
        lesson,
        userProgress,
    ] = await Promise.all([
        lessonData,
        userProgressData
    ]);
    if(!lesson || !userProgress){
        redirect("/learn");
    }
    const completedChallenges = lesson.challenges.filter((challenge) => challenge.completed).length;
    const allChallenges = lesson.challenges.length;
    const initialPercentage =(completedChallenges/allChallenges)*100;


    return (
        // <Fragment>
        //     <div className='bg-yellow-300'>
        //         <h1>lesson: </h1>
        //         <div>{lesson?.id}</div>
        //         <div>{lesson?.title}</div>
        //         <div>{lesson?.unitId}</div>
        //         <div>{lesson?.order}</div>
        //         <div>{lesson?.challenges.length}</div>
        //     </div>

        //     <div className='bg-red-400'>
        //         <h1>userProgress</h1>
        //         <div>{userProgress?.userId}</div>
        //         <div>{userProgress?.userName}</div>
        //     </div>
        //     <div>
        //         <h1>percentage: </h1>
        //         <div>{completedChallenges}</div>
        //         <div>{allChallenges}</div>
        //         <div>{initialPercentage}</div>
        //     </div>
        // </Fragment>
        <Quiz
            initialLessonId = {lesson.id}
            initialLessonChallenges = {lesson.challenges}
            initialHearts = {userProgress.hearts}
            initialPercentage = {initialPercentage}
            userSubscription = {null}
        />
        
    )
}
export default LessonPage;
