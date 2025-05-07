import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "!rounded-xs w-full h-9 !bg-[#F9EDFF] !border-0 ",
        className
      )}
      {...props}
    />
  );
}

export { Input };
