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
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);

        //insert the default values in schema.courses
        await db.insert(schema.courses).values([
            {
                // id:1,
                title:"Spanish",
                imageSrc:"/es.svg",
            },
            {
                // id:2,
                title:"French",
                imageSrc:"/fr.svg",
            },
            {
                // id:3,
                title: "Croatian",
                imageSrc: "/hr.svg",
            },
            {
                // id:6,
                title: "Italian",
                imageSrc: "/it.svg",
            },
            {
                title: "Japanese",
                imageSrc: "/jp.svg",
            },
        ]);

        console.log("Seeding finished");
    }catch(error){
        console.log("Error: ", error);
        throw new Error("Failed to seed database");
    }
};
main();
