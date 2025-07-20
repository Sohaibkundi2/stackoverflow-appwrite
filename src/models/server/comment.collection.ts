import {db, commentCollection } from '../name';
import { Permission } from 'appwrite';
import { databases } from './config';

export const createCommentCollection = async()=>{
    // create collection

    await databases.createCollection(db, commentCollection, commentCollection, [
        Permission.create("users"),
        Permission.read("users"),
        Permission.read("any"),
        Permission.update("users"),
        Permission.delete("users"),
    ])

    console.log('comment collection created successfully')

    // adding attributes

    await Promise.all([
        databases.createStringAttribute(db,commentCollection,"content",10000,true),
        databases.createEnumAttribute(db, commentCollection, "type",["answer","question"],true),
        databases.createStringAttribute(db, commentCollection, "typeId",50,true)
    ])
}