"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | undefined
    | null;
}

export function SubmitButton({ text, variant }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button type="submit" className="w-full" variant={variant} disabled>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full" variant={variant}>
          {text}
        </Button>
      )}
    </>
  );
}
