import {Client,Databases, Storage, Avatars, Users, } from 'node-appwrite'

let client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL!) 
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!) 
    .setKey(process.env.APPWRITE_PUBLIC_KEY!) 
;


const users = new Users(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatars = new Avatars(client);

export { client, users, databases, storage, avatars };
