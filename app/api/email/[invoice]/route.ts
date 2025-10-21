import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";

export async function POST({params} : {params: Promise<{invoice: string}>}) {
    const session = await requireUser();
    const {invoice} = await params;

    const invoiceData = await prisma.invoice.findUnique({
        where: {
            id: invoice,
            userId: session.user?.id
        },
        select: {
            invoiceName: true,
            invoiceNumber: true,
            currency: true,
            fromName: true,
            fromEmail: true,
            fromAddress: true,
            clientName: true,
            clientAddress: true,
            clientEmail: true,
            date: true,
            dueDate: true,
            invoiceItemDescription: true,
            invoiceItemQuantity: true,
            invoiceItemRate: true,
            total: true,
        },
    });

    if (!invoiceData) {
        return new Response("Invoice not found", {status: 404});
    }

    
}