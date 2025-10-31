import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ invoice: string }> }
) {
  try {
    const session = await requireUser();
    const { invoice } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoice,
        userId: session.user?.id,
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
      return new Response("Invoice not found", { status: 404 });
    }

    const sender = {
      email: "hello@joachimhamraoui.com",
      name: "Joachim Hamraoui",
    };

    emailClient.send({
      from: sender,
      to: [{ email: invoiceData.clientEmail, name: invoiceData.clientName }],
      template_uuid: "89130ccf-19a8-4d46-8184-4a567e342c3c",

      template_variables: {
        first_name: invoiceData.clientName,

        company_info_name: "InVois",

        company_info_address: "Ruisbroeksesteenweg",

        company_info_city: "Sint-Pieters-Leeuw",

        company_info_zip_code: "1601",

        company_info_country: "Belgium",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
