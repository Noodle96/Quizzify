import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema  from "../db/schema"

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql,{schema});

// SI EN CASO ELIMINEMOS LA BASE DE DATOS, do
    // npm run db:push
    // npm run db:seed

const main = async () => {
    try{
        console.log("Seeding database");
        // await db.delete(schema.courses);
        // await db.delete(schema.userProgress); 

        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengesOptions);
        await db.delete(schema.challengesProgress);

        /**
            *Insert the default values in schema.courses 
        */
        // await db.insert(schema.courses).values([
        //     {
        //         id:1,
        //         title:"Ingles",
        //         imageSrc:"/ingles.png",
        //     },
        //     {
        //         id:2,
        //         title:"Verbal",
        //         imageSrc:"/verbal.png",
        //     },
        //     // {
        //     //     // id:3,
        //     //     title: "Croatian",
        //     //     imageSrc: "/hr.svg",
        //     // },
        //     // {
        //     //     // id:6,
        //     //     title: "Italian",
        //     //     imageSrc: "/it.svg",
        //     // },
        //     // {
        //     //     title: "Japanese",
        //     //     imageSrc: "/jp.svg",
        //     // },
        // ]);

        /**
            * Insert the default values in schema.units
            *  
        */
        await db.insert(schema.units).values([
            {
                id:1,
                title:"Unit 1",
                description:"Unit 1 description",
                courseId:1, // Ingles
                order:1,
            },
            {
                id:2,
                title:"Unit 2",
                description:"Unit 2 description",
                courseId:1, // Ingles
                order:2,
            },
            {
                id:3,
                title:"Unit 3",
                description:"Unit 3 description",
                courseId:1, // Ingles
                order:3,
            },
            {
                id:4,
                title:"Unit 1",
                description:"Unit 1 description",
                courseId:2, // Verbal
                order:1,
            },
            {
                id:5,
                title:"Unit 2",
                description:"Unit 2 description",
                courseId:2, // Verbal
                order:2,
            },
            {
                id:6,
                title:"Unit 3",
                description:"Unit 3 description",
                courseId:2,// Verbal
                order:3,
            },
        ]);

        /**
            * Insert the default values in schema.lessons 
        */
        await db.insert(schema.lessons).values([
            {
                id:1,
                title:"Lesson One",
                unitId:1, // Unit 1 del curso de ingles
                order:1,
            },
            {
                id:2,
                title:"Lesson 2",
                unitId:1, // Unit 1 del curso de ingles
                order:2,
            },
            {
                id:3,
                title:"Lesson 3",
                unitId:1, // Unit 1 del curso de ingles
                order:3,
            },
            {
                id:4,
                title:"Lesson 4",
                unitId:1, // Unit 1 del curso de ingles
                order:4,
            },
            {
                id:5,
                title:"Lesson 5",
                unitId:1, // Unit 1 del curso de ingles
                order:5,
            },
            {
                id:6,
                title:"Lesson 6",
                unitId:1, // Unit 1 del curso de ingles
                order:6,
            },
            {
                id:7,
                title:"Lesson 7",
                unitId:1, // Unit 1 del curso de ingles
                order:7,
            },
            {
                id:8,
                title:"Lesson 8",
                unitId:1, // Unit 1 del curso de ingles
                order:8,
            },
            {
                id:9,
                title:"Lesson 9",
                unitId:1, // Unit 1 del curso de ingles
                order:9,
            },
            {
                id:10,
                title:"Lesson 10",
                unitId:1, // Unit 1 del curso de ingles
                order:10,
            },
            {
                id:11,
                title:"Lesson 11",
                unitId:2, // Unit 1 del curso de ingles
                order:10,
            },
        ]);

        /**
            * Insert the default values in schema.challenges
        */
        await db.insert(schema.challenges).values([
            {
                id:1,
                lessonId:1, // Lesson 1 de la Unidad 1 del curso de ingles
                question: "¿Cual el lenguaje popular para aprender machine learning?",
                type:"SELECT",
                order:1,
            },
            {
                id:2,
                lessonId:1, // Lesson 1 de la Unidad 1 del curso de ingles
                question: "Question 2",
                type:"SELECT",
                order:2,
            },
        ]);

        /**
            * Insert the default values in schema.challengesOptions 
        */
        await db.insert(schema.challengesOptions).values([
            {
                id:1,
                challengeId:1, //" ¿Cual el lenguaje popular para aprender machine learning?",
                text:"Python",
                isCorrect:true,
                imageSrc:"/python.svg",
                audioSrc:"/python.mp3",
            },
            {
                id:2,
                challengeId:1,  //" ¿Cual el lenguaje popular para aprender machine learning?",
                text:"C++",
                isCorrect:false,
                imageSrc:"/cpp.svg",
                audioSrc:"/cpp.mp3",
            },
            {
                id:3,
                challengeId:1,  //" ¿Cual el lenguaje popular para aprender machine learning?",
                text:"Java",
                isCorrect:false,
                imageSrc:"/java.svg",
                audioSrc:"/java.mp3",
            },
        ]);



        console.log("Seeding finished");
    }catch(error){
        console.log("Error: ", error);
        throw new Error("Failed to seed database");
    }
};
main();
