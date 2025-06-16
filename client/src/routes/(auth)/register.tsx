import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/auth";
import { toast } from "sonner";
import { UserPlus, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/(auth)/register")({
  component: RouteComponent,
  params: {},
});

const formSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email({ message: "Invalid email address format." }),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    ),
});

function RouteComponent() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => register(values),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate({
        to: "/login",
        search: { email: form.getValues("email") },
      });
      form.reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50
        via-white to-blue-50 px-4"
    >
      {/* Background Elements */}
      <div
        className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br
          from-purple-400 to-pink-400 opacity-20 blur-3xl"
      ></div>
      <div
        className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br
          from-blue-400 to-cyan-400 opacity-20 blur-3xl"
      ></div>

      <div className="relative w-full max-w-md">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="pb-6 text-center">
            <div
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl
                bg-gradient-to-br from-purple-600 to-blue-600"
            >
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Create Your Account
            </CardTitle>
            <p className="mt-2 text-gray-600">
              Join AudioHost and start sharing your audio content
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          className="h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          className="h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                          {...field}
                          autoComplete="username"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Create a strong password"
                          className="h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
                  <p className="mb-1 font-medium">Password requirements:</p>
                  <ul className="space-y-1">
                    <li>• At least 12 characters long</li>
                    <li>• Include uppercase and lowercase letters</li>
                    <li>• Include at least one number</li>
                    <li>• Include at least one special character</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full bg-gradient-to-r from-purple-600 to-blue-600 font-medium text-white
                    hover:from-purple-700 hover:to-blue-700"
                >
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-purple-600 transition-colors hover:text-purple-700"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
