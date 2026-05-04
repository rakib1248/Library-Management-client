"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return {
    "Content-Type": "application/json",
    Cookie: `accessToken=${token}`,
  };
};

export const getAlldBooks = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    headers,
    cache: "no-store",
  });
  return res.json();
};

// বই রির্টান করার রিকোয়েস্ট (যদি স্টুডেন্ট নিজে করতে পারে)
export const returnBookRequest = async (borrowId: string) => {
  const headers = await getAuthHeaders();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/return/${borrowId}`,
    {
      method: "POST",
      headers,
    },
  );
  return res.json();
};
export const buyBookRequest = async (id: string) => {
  const headers = await getAuthHeaders();
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/buy/${id}`, {
    method: "POST",
    headers,
  });
  redirect("/dashboard/my-rents");
};

export const rentBookRequest = async (id: string) => {
  const headers = await getAuthHeaders();
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/rent/${id}`, {
    method: "POST",
    headers,
  });
  redirect("/dashboard/my-rents");
};
