import type { Metadata } from "next";
import { LoginForm } from "@/src/components/login/LoginForm";
import { PromoBanner } from "@/src/components/login/PromoBanner";

export const metadata: Metadata = {
  title: "Login | Yora",
  description: "Login to continue your healthy journey with Yora.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F8F5EE]">
      <div className="flex min-h-screen w-full">
        <LoginForm />
        <PromoBanner />
      </div>
    </main>
  );
}
