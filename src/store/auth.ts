import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { AppwriteException, ID, Models } from 'appwrite'
import { account } from "../models/client/config";

export interface UserPrefs {
    reputation: number
};

interface IAuthStore {
    session: Models.Session | null,
    jwt: string | null,
    user: Models.User<UserPrefs> | null,
    hydrated: boolean,

    setHydrated(): void;  //it will checking things that they were comming back from local storage or not 
    verfiySession(): Promise<void>
    login(
        email: string,
        password: string
    ): Promise<
        {
            success: boolean,
            error?: AppwriteException | null
        }
    >
    createAccount(
        name:string,
        email: string,
        password: string
    ): Promise<
        {
            success: boolean,
            error?: AppwriteException | null
        }
    >
    logout():Promise<void>
}


export const useAuthStore = create<IAuthStore>()(
  persist(//apis |  persist-> to keep everything in local storage
    immer((set) => ({//immer will check either state is mutated or not mutated    | set is used to make a new state every time
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      setHydrated() {
        set({hydrated: true})
      },

      async verfiySession() {
        try {
          const session = await account.getSession("current")
          set({session})

        } catch (error) {
          console.log(error)
        }
      },

      async login(email: string, password: string) {
        try {
          const session = await account.createEmailPasswordSession(email, password)
          const [user, {jwt}] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT()

          ])
          if (!user.prefs?.reputation) await account.updatePrefs<UserPrefs>({
            reputation: 0
          })

          set({session, user, jwt})
          
          return { success: true}

        } catch (error) {

          console.log(error)
          return {
            success: false,
            error: error instanceof AppwriteException ? error: null,
            
          }
        }
      },

      async createAccount(name:string, email: string, password: string) {
        try {
          await account.create(ID.unique(), email, password, name)
          return {success: true}
        } catch (error) {
          console.log(error)
          return {
            success: false,
            error: error instanceof AppwriteException ? error: null,
            
          }
        }
      },

      async logout() {
        try {
          await account.deleteSessions()
          set({session: null, jwt: null, user: null})
          
        } catch (error) {
          console.log(error)
        }
      },
    })),
    { //configuration
      name: "auth",
      onRehydrateStorage(){
        return (state, error) => {
          if (!error) state?.setHydrated()
        }
      }
    }
  )
)