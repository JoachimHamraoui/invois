"use server";
// use Zod V3.25.0
import { requireUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { parse } from "path";

export async function onboardUser(previousState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, { schema: onboardingSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
        firstName: submission.value.firstName,
        lastName: submission.value.lastName,
        address: submission.value.address,
    },
  });
  redirect("/dashboard");
    
}


 export async function createInvoice(previousState: any, formData: FormData) {
  const session = await requireUser(); 

  const submission = parseWithZod(formData, { schema: invoiceSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      invoiceName: submission.value.invoiceName,
      total: submission.value.total,
      status: submission.value.status,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromName: submission.value.fromName,
      fromEmail: submission.value.fromEmail,
      fromAddress: submission.value.fromAddress,
      clientName: submission.value.clientName,
      clientEmail: submission.value.clientEmail,
      clientAddress: submission.value.clientAddress,
      currency: submission.value.currency,
      invoiceNumber: submission.value.invoiceNumber,
      note: submission.value.note,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
    },
  })  


 }