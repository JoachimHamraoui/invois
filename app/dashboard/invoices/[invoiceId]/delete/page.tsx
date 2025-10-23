import { prisma } from "@/app/utils/db";
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

export default function DeleteInvoiceRoute() {
    return (
      <div>
        <h1>Delete Invoice</h1>
      </div>
    );
}