import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <Container className="py-14">
      <AuthForm mode="signup" />
    </Container>
  );
}
