import { useState, useCallback } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { AuthBackground } from "@/components/AuthBackground";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import logoAsset from "@/assets/ai-summit-logo.png.asset.json";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account: AI to the Summit" },
      {
        name: "description",
        content:
          "Create your AI to the Summit account to unlock trail guidance, live weather alerts and emergency SOS built for trekkers in remote mountain regions.",
      },
      { property: "og:title", content: "Create Account: AI to the Summit" },
      {
        property: "og:description",
        content:
          "Join AI to the Summit: the multilingual AI mountain companion for trekkers and rescue teams.",
      },
    ],
    links: [{ rel: "canonical", href: "https://ai-summit-mountain.lovable.app/register" }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fullName, email, password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: fullName },
      },
    });
    setIsSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created! Check your email to confirm.");
    window.location.href = "/dashboard";
  };

  const handleGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/dashboard",
    });
    if (result.error) {
      toast.error(result.error.message ?? "Google sign-in failed");
      return;
    }
    if (result.redirected) return;
    window.location.href = "/dashboard";
  };

  return (
    <AuthBackground>
      <div className="animate-[fade-up_0.6s_ease-out]">
        {/* Glassmorphism Card */}
        <div className="glass-strong rounded-3xl overflow-hidden shadow-2xl border border-neon/15">
          <div className="grid lg:grid-cols-2">
            {/* Left Side: Branding */}
            <div className="relative p-10 lg:p-14 flex flex-col justify-center items-center text-center bg-neon/5">
              <div className="hidden" />

              <div className="relative">
                <img
                  src={logoAsset.url}
                  alt="AI to the Summit brandmark"
                  className="w-24 h-24 rounded-2xl object-cover mb-6 mx-auto border border-neon/30 shadow-[0_0_40px_rgba(34,211,238,0.25)]"
                />
                <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Create Account: AI to the <span className="text-gradient">Summit</span>
                </h1>
                <p className="text-sm text-muted-foreground max-w-[240px]">
                  Your Intelligent Mountain Companion
                </p>
              </div>
            </div>
    </AuthBackground>
  );
}
