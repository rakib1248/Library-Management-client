"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const LoginService = async (email: string, password: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    return {
      error: result.message || "Login failed. Please check your credentials.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/dashboard");
};
export const RegisterService = async (
  name: string,
  email: string,
  password: string,
  role: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    },
  );

  const result = await response.json();
  
  redirect("/login");
};

export const getProfile = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/my-profile`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${token}`,
          "Content-Type": "application/json",
        },

        cache: "no-store",
      },
    );

    return await response.json();
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return null;
  }
};


 export const logoutAction = async () => {
   const cookieStore = await cookies();
   cookieStore.delete("accessToken");
   redirect("/login");
 };
