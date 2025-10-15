import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import { format } from "path";
import { formatCurrency } from "@/app/utils/formatCurrency";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoice: string }>;
  }
) {
  const { invoice } = await params;

  const data = await prisma.invoice.findUnique({
    where: {
      id: invoice,
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
      note: true,
    },
  });

  if (!data) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // set font
  pdf.setFont("helvetica", "bold");

  //set header
  pdf.setFontSize(24);
  pdf.text(data.invoiceName, 20, 20);

  //from section
  pdf.setFontSize(12);
  pdf.text("From", 20, 40);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(
    [data.fromName, data.fromAddress, data.fromEmail].join("\n"),
    20,
    50
  );

  //to section
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("To", 20, 70);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(
    [data.clientName, data.clientAddress, data.clientEmail].join("\n"),
    20,
    80
  );

  // invoice details
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("Invoice Details", 120, 40);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(`Invoice Number: ${data.invoiceNumber}`, 120, 45);
  pdf.text(
    `Date: ${new Intl.DateTimeFormat("fr-BE").format(data.date)}`,
    120,
    50
  );
  pdf.text(`Due Date: ${data.dueDate}`, 120, 55);

  // item table header
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("Description", 20, 100);
  pdf.text("Quantity", 100, 100);
  pdf.text("Rate", 130, 100);
  pdf.text("Total", 160, 100);

  // draw line separator
  pdf.line(20, 105, 190, 105);

  // item details

  pdf.setFont("helvetica", "normal");
  pdf.text(data.invoiceItemDescription, 20, 110);
  pdf.text(data.invoiceItemQuantity.toString(), 100, 110);
  pdf.text(
    formatCurrency({
      amount: data.invoiceItemRate,
      currency: data.currency as any,
    }),
    130,
    110
  );
  pdf.text(
    formatCurrency({ amount: data.total, currency: data.currency as any }),
    160,
    110
  );

  // draw line separator
  pdf.line(20, 115, 190, 115);
  pdf.setFont("helvetica", "bold");

  // total
  pdf.text(`Total (${data.currency})`, 160, 130);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    formatCurrency({ amount: data.total, currency: data.currency as any }),
    160,
    135
  );

  if(data.note) {
    pdf.setFont("helvetica", "bold");
    pdf.text("Note", 20, 150);
    pdf.setFont("helvetica", "normal");
    pdf.text(data.note, 20, 155);
  }

  //generate as buffer
  const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

  // return pdf as download
  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline"`,
    },
  });
}
