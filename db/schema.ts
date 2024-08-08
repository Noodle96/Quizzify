// Al hacer un cambio(agregar o eliminar tabla u otros) hacer :
//     npm run db:push

import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

/**
    * Defines the `courses` table with the following columns:
    * - `id`: Serial primary key.
    * - `title`: Non-nullable text.
    * - `imageSrc`: Non-nullable text.
    * 
    * @returns {Table} The `courses` table definition.
*/
export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
});

/**
    * Defines the relations for the `courses` table:
    * - `userProgress`: One-to-many relation with the `userProgress` table.
    * 
    * It reads:
    * - Each course can have MANY userProgress.
    * 
    * @returns {Object} The relations for the `courses` table. 
*/
export const coursesRelations = relations(courses, ({ many }) => ({
    userProgress: many(userProgress)
}));


// Esta instruccion origina una nueva columna en la tabla courses llamada "units" (que es un arreglo de enteros) por revisar* 
/**
    * Defines the `units` table with the following columns:
    * - `id`: Serial primary key.
    * - `title`: Non-nullable text.
    * - `description`: Non-nullable text.
    * - `courseId`: Integer referencing `courses.id`, non-nullable, cascades on delete.
    * - `order`: Non-nullable integer.
    * 
    * @returns {Table} The `units` table definition.
*/
export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
    order: integer("order").notNull(),
});


/**
    * Defines the relations for the `units` table:
    * - `course`: One-to-one relation with the `courses` table based on `courseId`.
    * - `lesson`: One-to-many relation with the `lessons` table.
    * 
    * It reads:
    * - Each unit belongs to ONE course.
    * - Each unit can have MANY lessons.
    * 
    * @returns {Object} The relations for the `units` table.
 */
export const unitsRelations = relations(units, ({ one, many }) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id],
    }),
    lesson: many(lessons),
}));

/**
    * Defines the `lessons` table with the following columns:
    * - `id`: Serial primary key.
    * - `title`: Non-nullable text.
    * - `unitId`: Integer referencing `units.id`, non-nullable, cascades on delete.
    * - `order`: Non-nullable integer.
    * 
    * @returns {Table} The `lessons` table definition.
 */
export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade" }).notNull(),
    order: integer("order").notNull(),
});

/**
    * Defines the relations for the `lessons` table:
    * - `unit`: One-to-one relation with the `units` table based on `unitId`.
    * - `challenges`: One-to-many relation with the `challenges` table.
    * 
    * It reads:
    * - Each lesson belongs to ONE unit.
    * - Each lesson can have MANY challenges.
    * 
    * @returns {Object} The relations for the `lessons` table.
*/
const lessonsRelations = relations(lessons, ({ one, many }) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id],
    }),
    challenges: many(challenges),
}));

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);

/**
    * Defines the `challenges` table with the following columns:
    * - `id`: Serial primary key.
    * - `lessonId`: Integer referencing `lessons.id`, non-nullable, cascades on delete.
    * - `type`: Enum with values "SELECT" and "ASSIST", non-nullable.
    * - `question`: Non-nullable text.
    * - `order`: Non-nullable integer.
    * 
    * @returns {Table} The `challenges` table definition. 
*/
export const challenges = pgTable("challenges", {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").references(() => lessons.id, { onDelete: "cascade" }).notNull(),
    type: challengesEnum("type").notNull(),
    question: text("question").notNull(),
    order: integer("order").notNull(),
});

/**
    * Defines the relations for the `challenges` table:
    * - `lesson`: One-to-one relation with the `lessons` table based on `lessonId`.
    * - `challengesOptions`: One-to-Many relation with the `challengesOptions` table.
    * 
    * It reads:
    * - Each challenge belongs to ONE lesson.
    * - Each challenge can have MANY challengesOptions
    * 
    * @returns {Object} The relations for the `challenges` table. 
*/

export const challengesRelations = relations(challenges, ({ one, many }) => ({
    lesson: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id],
    }),
    challengesOptions: many(challengesOptions),
}));

/**
    * Defines the `challengeOptions` table with the following columns:
    * - `id`: Serial primary key.
    * - `challengeId`: Integer referencing `challenges.id`, non-nullable, cascades on delete.
    * - `text`: Non-nullable text.
    * - `isCorrect`: Non-nullable boolean.
    * - `imageSrc`: Text.
    * - `audioSrc`: Text.
    * 
    * @returns {Table} The `challengeOptions` table definition.
*/
export const challengesOptions = pgTable("challengeOptions", {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
    text: text("text").notNull(),
    isCorrect: boolean("is_correct").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("audio_src"),
});

/**
    * Defines the relations for the `challengesOptions` table:
    * - `challenge`: One-to-one relation with the `challenges` table based on `challenges.id`.
    * 
    * It reads:
    * - Each challengesOptions belongs to ONE challlenges.
    * 
    * @returns {Object} The relations for the `challenges` table.
*/
export const challengesOptionsRelations = relations(challengesOptions, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengesOptions.challengeId],
        references: [challenges.id],
    })
}));





/**
    * Defines the userProgress table with the following columns:
    * - `userId`: Text primary key.
    * - `userName`: Non-nullable text with a default value of "User".
    * - `userImageSrc`: Non-nullable text with a default value of "/mascot.svg".
    * - `activeCourseId`: Integer referencing `courses.id`, non-nullable, cascades on delete.
    * - `hearts`: Non-nullable integer with a default value of 5.
    * - `points`: Non-nullable integer with a default value of 0.
    * 
    * @returns {Table} The `userProgress` table definition. 
*/
export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_img_src").notNull().default("/mascot.svg"),
    activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade" }),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0),
});

/**
    * Defines the relations for the `userProgress` table:
    * - `activeCourse`: One-to-one relation with the `courses` table based on `activeCourseId`.
    * 
    * It reads:
    * - Each userProgress has ONE activeCourse.
    * 
    * @returns {Object} The relations for the `userProgress` table.
*/
export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id],
    }),
}));