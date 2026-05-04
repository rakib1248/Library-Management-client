"use server";

import { cookies } from "next/headers";

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return {
    "Content-Type": "application/json",
    Cookie: `accessToken=${token}`,
  };
};


export const getAllUsers = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    headers,
    cache: "no-store",
  });
  return res.json();
};

export const getCategory = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
    headers,
    cache: "no-store",
  });
  return res.json();
};


export const deleteUser = async (userId: string) => {
  const headers = await getAuthHeaders();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      method: "DELETE",
      headers,
    },
  );
  return res.json();
};

// লাইব্রেরির ওভারঅল রিপোর্ট দেখা
export const getLibraryStats = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/stats/admin-summary`,
    {
      headers,
      cache: "no-store",
    },
  );
  return res.json();
};
