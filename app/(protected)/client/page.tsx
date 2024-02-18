"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrentUser();

  return ( 
    // UserInfo ahora labura en el cliente....
    <UserInfo
      label="💻 Client component"
      user={user}
    />
   );
}
 
export default ClientPage;