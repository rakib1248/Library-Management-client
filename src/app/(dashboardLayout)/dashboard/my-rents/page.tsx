import MyBooksdash from "@/components/Mybooking";

import { getProfile } from "@/server-action/auth.service";

async function page() {
  const myBook  = await getProfile() 
  return (
    <div>
      <MyBooksdash userData={myBook} />
    </div>
  );
}

export default page;
