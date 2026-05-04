"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Lock,
  User as UserIcon,
  Feather,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";

import { toast } from "sonner";
import { Role } from "@/lib/types";
import { redirect } from "next/navigation";
import Link from "next/link";
import { RegisterService } from "@/server-action/auth.service";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("STUDENT");

  // const submit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!name.trim() || !email.trim() || !password) {
  //     toast.error("Please fill out every field");
  //     return;
  //   }
  //   signup(name.trim(), email.trim(), role);
  //   toast.success(`Welcome to BookLoop, ${name.split(" ")[0]}`);
  //   redirect(role === "SELLER" ? "/dashboard" : "/browse");
  // };

  const handleFormSubmit = async () => {
    if (!name || !email.trim() || !password) {
      toast.error("Enter your email and password");
      return;
    }
    await RegisterService(name, email, password, role);
    toast.success(`Welcome to BookLoop, ${name.split(" ")[0]}`);
  
  };

  return (
    <div className="min-h-dvh grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-10 order-2 lg:order-1">
        <motion.form
          action={handleFormSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo />
          </div>
          <h1 className="font-serif text-3xl mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-6 text-sm">
            Already a member?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>

          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            I am a
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              {
                value: "STUDENT" as Role,
                label: "Student",
                desc: "Discover & borrow",
                icon: BookOpen,
              },
              {
                value: "SELLER" as Role,
                label: "Author",
                desc: "Lend my books",
                icon: Feather,
              },
            ].map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setRole(opt.value)}
                className={`relative text-left p-4 rounded-xl border transition ${
                  role === opt.value
                    ? "border-primary bg-primary/10 shadow-glow"
                    : "border-border bg-card/60 hover:border-border/80"
                }`}>
                <opt.icon
                  className={`h-5 w-5 mb-3 ${
                    role === opt.value
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                />
                <div className="font-serif text-lg">{opt.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {opt.desc}
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full name</Label>
              <div className="relative mt-1.5">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Eleanor Vance"
                  className="pl-9 h-11"
                />
              </div>
            </div>
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
            Create account <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.form>
      </div>

      <div className="hidden lg:flex relative overflow-hidden flex-col justify-between p-10 bg-sidebar border-l border-sidebar-border order-1 lg:order-2">
        <div className="flex justify-end">
          <Logo />
        </div>
        <div className="absolute inset-0 bg-glow pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-md ml-auto text-right">
          <div className="text-[11px] uppercase tracking-[0.22em] text-primary mb-4">
            Begin your loop
          </div>
          <h2 className="font-serif text-4xl leading-tight">
            A library is a doorway —
            <br />
            you choose which side to stand.
          </h2>
          <p className="text-muted-foreground mt-4">
            Read or lend. Switch any time. Your books, your loop.
          </p>
        </motion.div>
        <div className="relative text-xs text-muted-foreground text-right">
          Built for authors and readers alike.
        </div>
      </div>
    </div>
  );
}
