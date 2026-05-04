import StudentDashboard from "@/components/StudentDashbord";
import { getProfile } from "@/server-action/auth.service";
import { getAlldBooks } from "@/server-action/student.service";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const data = await getProfile();

  if (data?.role === "SELLER") {
    if (!data.authors) {
      redirect("/author");
    } else {
      redirect("/dashboard/seller");
    }
  }



  const bookData = await getAlldBooks()


  return (
    <>
      <StudentDashboard bookData={ bookData} />
    </>
  );
}

export default page;
