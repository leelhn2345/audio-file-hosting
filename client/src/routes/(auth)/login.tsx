import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { toast } from "sonner";
import { useSetAtom } from "jotai";
import { userAtom } from "@stores/user";
import { isAuthenticated } from "@/utils/auth";
import { getUserData } from "@/api/user";
import { LogIn, ArrowRight } from "lucide-react";

const loginSchema = z.object({ email: z.string().optional() });

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: "/" });
    }
  },
  validateSearch: loginSchema,
});

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address format." }),
  password: z.string().min(8),
});

function RouteComponent() {
  const { email } = Route.useSearch();
  const setUserAtom = useSetAtom(userAtom);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email ?? "",
      password: "",
    },
  });

  const { mutate: loginMutation } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => login(values),
    onSuccess: () => {
      form.reset();
      userMutation();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: userMutation } = useMutation({
    mutationFn: getUserData,
    onSuccess: (data) => {
      setUserAtom(data);
      toast.success("Login success.");
      navigate({ to: "/" });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation(values);
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
              <LogIn className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome Back
            </CardTitle>
            <p className="mt-2 text-gray-600">
              Sign in to your AudioHost account
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
                          autoComplete="username"
                          {...field}
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
                          placeholder="Enter your password"
                          className="h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="h-11 w-full bg-gradient-to-r from-purple-600 to-blue-600 font-medium text-white
                    hover:from-purple-700 hover:to-blue-700"
                >
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-purple-600 transition-colors hover:text-purple-700"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
