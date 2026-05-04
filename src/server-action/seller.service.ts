"use server";

import { books } from "@/lib/types";
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

export const getMyBooks = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/seller/my-books`,
    {
      headers,
      cache: "no-store",
    },
  );
  return res.json();
};
export const getSingleBooks = async (id: string) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
    headers,
    cache: "no-store",
  });
  return res.json();
};

export const addBooks = async (formData: FormData) => {
  const bookData = Object.fromEntries(formData.entries());
  console.log(bookData);
  const headers = await getAuthHeaders();
 await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...bookData,
      purchasePrice: Number(bookData.purchasePrice),
      rentPrice: Number(bookData.rentPrice),
      stockCount: Number(bookData.stockCount),
    }),
  });
  revalidatePath("dashboard/seller")
};

export const updatBook = async (bookData: books) => {
  const headers = await getAuthHeaders();
 await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/${bookData.id}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        ...bookData,
        purchasePrice: Number(bookData.purchasePrice),
        rentPrice: Number(bookData.rentPrice),
        stockCount: Number(bookData.stockCount),
      }),
    },
  );
  revalidatePath("dashboard/seller")
};

export const authorSetup = async (name: string, bio: string) => {
  const headers = await getAuthHeaders();
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/author`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      bio,
    }),
  });

  redirect("/dashboard");
};
