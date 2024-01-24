"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import { setCookie } from "cookies-next";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
} from "@repo/ui/index";
import { LoginHandler } from "../../lib/actions";
import { redirect, useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Must be a valid email.",
  }),
  password: z.string().min(8, { message: "Must be at least 8 characters." }),
});

export function AdminLoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    LoginHandler(values)
      .then((token) => {
        if (token instanceof Error) {
          toast.error(token.message);
        } else {
          setCookie("token", token, {
            maxAge: 60 * 60,
          });
          toast.success("Login successful!");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
