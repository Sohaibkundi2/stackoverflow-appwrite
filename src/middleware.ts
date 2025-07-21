import { NextResponse, NextRequest } from 'next/server'
import getOrConnectDb from './models/server/debSetup';
import { getOrCreateStorage } from './models/server/storageSetup';

export async function middleware(request: NextRequest) {

await Promise.all([
    getOrConnectDb(),
    getOrCreateStorage()
])

  return NextResponse.next()
}
 
export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - API routes: /api/*
     * - Static files: /_next/*, /static/*, /favicon.ico, /icon.png, etc.
     * - Public assets: /images/* or any other custom folders
     */
    "/((?!api|_next|static|favicon.ico|icon.png|images).*)",
  ],
};