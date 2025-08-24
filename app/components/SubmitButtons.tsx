"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
    const {pending } = useFormStatus();

    return (
        <>
           {pending ? (
            <Button type="submit" className="w-full" disabled><Loader2 className="mr-2 size-4 animate-spin" />Please wait...</Button>
           ): (
            <Button type="submit" className="w-full">Submit</Button>
           )}
        </>
    )
}