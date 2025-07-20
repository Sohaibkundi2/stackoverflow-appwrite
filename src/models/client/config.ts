import { Client, Account,Databases,Storage,Avatars } from "appwrite";
import { env } from "process";

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL!) 
    .setProject(process.env.projectId!);                 

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatars = new Avatars(client);

export { client, account, databases, storage, avatars };
