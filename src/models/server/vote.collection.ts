import { Permission } from "appwrite"
import { db, voteCollection } from "../name"
import { databases } from "./config"


export const createVoteCollection = async()=>{
    // create collection

    await databases.createCollection(db, voteCollection, voteCollection, [
        Permission.create("users"),
        Permission.read("users"),
        Permission.read("any"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log('vote collection created successfully')

    // create attribute
        await Promise.all([
            databases.createEnumAttribute(db, voteCollection, "type",["question","answer"],true),
            databases.createStringAttribute(db, voteCollection, "typeId",50,true),
            databases.createEnumAttribute(db, voteCollection, "voteStatus",["upvoted","downvoted"],true),
            databases.createStringAttribute(db, voteCollection, "votedById",50,true),
        ])

        console.log('vote attribute created');
}