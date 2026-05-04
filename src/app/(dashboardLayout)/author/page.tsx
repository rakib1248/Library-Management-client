import SellerSetupPage from "@/components/Author";
import { getProfile } from "@/server-action/auth.service";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
       const data = await getProfile();
      
    if (data?.role === "SELLER") {
        if (data.authors) {
            redirect("/dashboard");
        }
    }
  return <div><SellerSetupPage/></div>;
}

export default page;
