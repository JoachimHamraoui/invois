import { DeleteInvoice } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Invoice } from "@/lib/generated/prisma";
import { CrossIcon, Delete, DeleteIcon, FileWarning } from "lucide-react";
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

export default async function DeleteInvoiceRoute({ params }: { params: Params }) {
    const { invoiceId } = await params;
    const session = await requireUser();

    await Authorize(invoiceId, session.user?.id as string);
    return (
      <div className="flex flex-1 justify-center items-center">
        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle>Delete Invoice</CardTitle>
                <CardDescription>Are you sure you want to delete this invoice ?</CardDescription>
            </CardHeader>
            <CardContent>
                <FileWarning className="text-red-300 mx-auto size-24 my-10" />
            </CardContent>
            <CardFooter className="flex justify-between">
                <Link className={buttonVariants({ variant: "outline" })} href="/dashboard/invoices">Cancel</Link>
                <form action={async () => {
                    "use server"
                    await DeleteInvoice(invoiceId)
                }
                }>
                    <SubmitButton text="Delete Invoice" variant="destructive" />
                </form>
            </CardFooter>
        </Card>
      </div>
    );
}