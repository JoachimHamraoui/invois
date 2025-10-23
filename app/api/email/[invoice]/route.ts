import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(request: Request, {params} : {params: Promise<{invoice: string}>}) {
    try {
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

    const sender = {
        email: "hello@joachimhamraoui.com",
        name: "Joachim Hamraoui",
      };
    
       emailClient.send({
        from: sender,
        to: [{email: invoiceData.clientEmail, name: invoiceData.clientName}],
        subject: `Reminder - Invoice ${invoiceData.invoiceNumber}`,
        text: `Hello ${invoiceData.clientName},\n\nPlease find attached the invoice for ${invoiceData.invoiceName}.\n\nBest regards,\n${invoiceData.fromName}`,
      });

      return NextResponse.json({success: true});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false});
    }
}

