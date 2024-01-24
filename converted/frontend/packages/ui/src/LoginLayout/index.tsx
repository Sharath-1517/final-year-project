import cn from "@repo/tailwind-config";
import React from "react";

export default function LoginLayout({
  children,
  className,
  name,
}: {
  children: React.ReactNode;
  className?: string;
  name: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center h-full",
        className
      )}
    >
      <div className="bg-white flex flex-col justify-center items-center gap-y-4 p-5 rounded-lg">
        <h1 className="text-capitalize text-2xl">{name} Login</h1>
        {children}
      </div>
    </div>
  );
}
