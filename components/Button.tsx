import { ReactNode } from "react";

export function Button({ children, secondary = false, className = "", ...props }: { children: ReactNode; secondary?: boolean; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${secondary ? "border border-[#dfe5df] bg-white text-[#172019] hover:bg-[#f5f7f5]" : "bg-[#2f7d55] text-white hover:bg-[#276b49]"} ${className}`}>
      {children}
    </button>
  );
}
