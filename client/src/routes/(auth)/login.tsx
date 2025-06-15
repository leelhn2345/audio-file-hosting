import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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

  const { mutate } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => login(values),
    onSuccess: (data) => {
      toast.success("Successful login.");
      form.reset();
      setUserAtom(data);
      navigate({ to: "/" });
    },

    onError: (err) => toast.error(err.message),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <p className="mb-6">Welcome back~</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-72 space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@email.com" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
