"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
// client component....
import { useSession, signOut } from "next-auth/react";
// server actions...
// import { logout } from "@/actions/logout";

const SettingPage = () => {
  // const session = useSession();
  const user = useCurrentUser()

  const onClick = () => {
    signOut();
    // logout()
  }

  return (
    <div className="bg-white p-10 rounded-xl">
      {/* {JSON.stringify(session.data?.user)} */}
      {/* {JSON.stringify(user)} */}
      <button onClick={ onClick } type="submit">
          Sign Out
        </button>
    </div>
  )
}

export default SettingPage