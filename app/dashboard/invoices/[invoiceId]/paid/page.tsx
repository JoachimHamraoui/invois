import { SubmitButton } from "@/app/components/SubmitButtons";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Verified } from "lucide-react";
import Link from "next/link";

export default function MarkAsPaid() {
    return (
        <div className="flex flex-1 justify-center items-center">
            <Card className="w-[500px]">
                <CardHeader>
                    <CardTitle>Mark as paid ?</CardTitle>
                    <CardDescription>Are you sure you want to mark this invoice as paid ?</CardDescription>
                </CardHeader>
                <CardContent>
                    <Verified className="text-green-300 mx-auto size-24 my-10" />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Link className={buttonVariants({ variant: "outline" })} href="/dashboard/invoices">Cancel</Link>
                    <form>
                        <SubmitButton text="Mark as paid" variant="default" />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}