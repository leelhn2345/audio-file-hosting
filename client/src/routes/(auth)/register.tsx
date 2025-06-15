import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
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
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/(auth)/register")({
  component: RouteComponent,
  params: {},
});

const formSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email({ message: "Invalid email address format." }),
  password: z.string().min(8),
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
      form.reset();
      navigate({ to: "/login" });
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="mb-10 text-2xl font-bold">Registration</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-72 space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Titor" {...field} />
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
