import { MarkAsPaidAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Verified } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Authorize(invoiceId: string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId
        },
    })

    if (!data) {
        return redirect("/dashboard/invoices")
    }
}

type Params = Promise<{invoiceId: string}>

 export default async function MarkAsPaid({ params }: { params: Params }) {
    const { invoiceId } = await params;
    const session = await requireUser();
    await Authorize(invoiceId, session.user?.id as string);
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
                        await MarkAsPaidAction(invoiceId)
                    }}>
                        <SubmitButton text="Mark as paid" variant="default" />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}