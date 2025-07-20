const env = {
    appwrite:{
        endpoint:String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
        projectId:String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        apikey:String(process.env.APPWRITE_PUBLIC_KEY)
    }
}

export default env