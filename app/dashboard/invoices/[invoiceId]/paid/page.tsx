import { MarkAsPaidAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Verified } from "lucide-react";
import Link from "next/link";



type Params = Promise<{invoice: string}>

 export default async function MarkAsPaid({ params }: { params: Params }) {
    const { invoice } = await params
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
                    <form action={async () => {
                        "use server"
                        await MarkAsPaidAction(invoice)
                    }}>
                        <SubmitButton text="Mark as paid" variant="default" />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}