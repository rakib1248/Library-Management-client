/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";

import { toast } from "sonner";

import Link from "next/link";

import { Role } from "@/lib/types";
import { LoginService } from "@/server-action/auth.service";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("STUDENT");


  const handleFormAction = async () => {
    if (!email.trim() || !password) {
      toast.error("Enter your email and password");
      return;
    }
 
    await LoginService(email, password);
  };

  return (
    <div className="min-h-dvh grid lg:grid-cols-2">
      <div className="hidden lg:flex relative overflow-hidden flex-col justify-between p-10 bg-sidebar border-r border-sidebar-border">
        <Logo />
        <div className="absolute inset-0 bg-glow pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-md">
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary mb-4">
            Welcome back
          </div>
          <h2 className="font-serif text-4xl leading-tight">
            Every book you've ever loaned
            <br />
            is right where you left it.
          </h2>
          <p className="text-muted-foreground mt-4">
            Sign in to manage your library, track borrows, and see your stories
            travel the world.
          </p>
        </motion.div>
        <div className="relative text-xs text-muted-foreground">
          “A book is a loaded gun in the house next door.” — Bradbury
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.form
          // onSubmit={submit}
          action={handleFormAction}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo />
          </div>
          <h1 className="font-serif text-3xl mb-2">Sign in</h1>
          <p className="text-muted-foreground mb-8 text-sm">
            New here?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Create an account
            </Link>
          </p>

          <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg mb-6">
            {(["STUDENT", "SELLER"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`relative py-2 text-sm font-medium rounded-md transition ${
                  role === r
                    ? "text-primary-foreground"
                    : "text-muted-foreground"
                }`}>
                {role === r && (
                  <motion.span
                    layoutId="role-pill"
                    className="absolute inset-0 bg-gradient-primary rounded-md shadow-glow"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">
                  {r === "STUDENT" ? "Student" : "Author"}
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@library.co"
                  className="pl-9 h-11"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9 h-11"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-6 h-11 bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
            Sign in <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
