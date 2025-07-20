
import {db, questionCollection } from '../name';
import { Permission } from 'appwrite';
import { databases } from './config';
import { IndexType } from 'node-appwrite';

export const createQuestionCollection = async () => {
    //create collection
    await databases.createCollection(
        db,
        questionCollection,
        questionCollection,
        [
            Permission.read("any"),
            Permission.read("users "),
            Permission.create("users"),
            Permission.delete("users")
        ]
    )
    console.log('Question collection created')

    // attributes and tags
    await Promise.all([
        databases.createStringAttribute(db, questionCollection, "title", 256, true, "", false),
        databases.createStringAttribute(db, questionCollection, "content", 10000, true, "", false),
        databases.createStringAttribute(db, questionCollection, "tags", 256, true, undefined, true),
        databases.createStringAttribute(db, questionCollection, "authorId", 256, true, "", false),
        databases.createStringAttribute(db, questionCollection, "attachmentId", 256,false)

    ])
    console.log('Question collection attributes created')

    // indexes
    await Promise.all([
        databases.createIndex(db, questionCollection, "title", IndexType.Fulltext, ["title"],["asc"]),
        databases.createIndex(db, questionCollection, "content",IndexType.Fulltext,['content'],['asc'])
    ])
    console.log('Question collection indexes created')
};