import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: Parameters<typeof cx>) => twMerge(cx(inputs));

export { cn };

export * from "@radix-ui/react-icons";
export * from "@radix-ui/react-dropdown-menu";