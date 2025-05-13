import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "!text-[16px] !rounded-[5px] w-full h-11.75 !bg-[#F9EDFF] !border-0 placeholder:text-[13px] ",
        className
      )}
      {...props}
    />
  );
}

export { Input };
