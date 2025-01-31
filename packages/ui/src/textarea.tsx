import * as React from "react";
import { cn } from "@inf/ui";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, rows = 3, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
          className,
        )}
        ref={ref}
        rows={rows}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";

export { TextArea };
