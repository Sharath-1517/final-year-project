"use client";

import React from "react";
import { LoginLayout } from "@repo/ui/index";
import { AdminLoginForm } from "./AdminLoginForm";

const Page = () => {
  return (
    <LoginLayout name="Admin" className="bg-gray-400 text-xl">
      <AdminLoginForm />
    </LoginLayout>
  );
};

export default Page;
