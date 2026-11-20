import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <Container className="py-14">
      <AuthForm mode="login" />
    </Container>
  );
}
