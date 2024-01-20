"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@repo/ui/index";
import { LoginLayout } from "@repo/ui/index";

const AdminLoginForm = () => {
  const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    console.log(formData);
  };

  return <div></div>;
};

export default AdminLoginForm;
