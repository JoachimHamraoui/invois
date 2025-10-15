import { prisma } from "@/app/utils/db";

async function getData(invoiceId: string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId
        },
    });
}

export default function EditInvoiceRoute() {
    return (
      <div>
        <h1>Edit Invoice</h1>
      </div>
    );
}