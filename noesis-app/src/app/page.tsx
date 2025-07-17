import Background from "@/components/Background";
import FadeIn from "@/components/FadeIn";
import { AuthProvider } from "@/auth/auth-context";

export default function Home() {
  return (
    <main>
      <AuthProvider>
        <Background />
      </AuthProvider>
    </main>
  );
}
