import {db, answerCollection } from '../name';
import { Permission } from 'appwrite';
import { databases } from './config';
import { IndexType } from 'node-appwrite';

export const createAnswerCollection= async()=>{
// create collection

await databases.createCollection(db, answerCollection, answerCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.delete("users"),
    Permission.create("users"),
])

console.log('answer collection created')

// add attributes
    await Promise.all([
        databases.createStringAttribute(db, answerCollection, "content", 10000, true, "", true),
        databases.createStringAttribute(db, answerCollection, "questionId", 256, true),
        databases.createStringAttribute(db, answerCollection, "authorId", 256, true,)
    ])
    console.log('Answers collection attributes created')
}