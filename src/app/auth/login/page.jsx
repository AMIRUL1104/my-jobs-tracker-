"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { useAuth } from "@/context/AuthProvider";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

export default function LoginPage() {
  //   const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // await login(data);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1E293B] border border-slate-800 rounded-2xl p-8 shadow-2xl">
        {/* Header / Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            JobTracker <span className="text-blue-500">.</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Sign in to track your job applications
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            label="Email Address"
            type="email"
            placeholder="example@email.com"
            error={errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          <div className="mt-6">
            <Button type="submit" isLoading={isSubmitting}>
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
