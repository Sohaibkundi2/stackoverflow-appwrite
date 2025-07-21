import {questionAttachmentBucket  } from '../name';
import { Permission } from 'appwrite';
import {  storage } from './config';

export const getOrCreateStorage = async()=>{

    try {
        await storage.getBucket(questionAttachmentBucket)
        console.log('storage connected')
    } catch (error) {
        try {
            await storage.createBucket(questionAttachmentBucket,questionAttachmentBucket,
                [
                    Permission.create("users"),
                    Permission.read("users"),
                    Permission.read("any"),
                    Permission.update("users"),
                    Permission.delete("users"),
                ],
                false,
                undefined,
                undefined,
                ['jpg','png','gif','jpeg','webp','heic']
            )
            console.log('Storage Created')
            console.log('storage connected')
        } catch (error:any) {
            console.error('Error while creating storage', error)
        }
    }

}