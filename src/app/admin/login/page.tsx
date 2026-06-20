import { Suspense } from "react";

import { LoginForm } from "@/features/admin/login-form";

export const metadata = {
  title: "Admin Login | Lullaby Candle Co."
};

export default function AdminLoginPage() {
  return (
    <section className="container-padded py-20">
      <Suspense>
        <LoginForm />
      </Suspense>
    </section>
  );
}
