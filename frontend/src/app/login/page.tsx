"use client";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, Building2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="flex w-full max-w-5xl flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Hero Section */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">ServAI</h1>
                <p className="text-sm text-muted-foreground">AI Operating System</p>
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
                Your entire home service business, automated by AI
              </h2>
              <p className="text-lg text-muted-foreground">
                Replace your executive team, marketing agency, call center, and operations
                department with one AI-powered platform.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">500+ businesses</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-emerald-500" />
                <span className="text-muted-foreground">40% avg. revenue increase</span>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>Sign in to your ServAI dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="you@company.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" asChild>
                <Link href="/dashboard">
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                By signing in, you agree to our Terms of Service.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}