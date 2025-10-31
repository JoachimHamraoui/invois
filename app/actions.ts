"use server";
// use Zod V3.25.0
import { requireUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { parse } from "path";
import { emailClient } from "./utils/mailtrap";
import { formatCurrency } from "./utils/formatCurrency";
import { Day } from "react-day-picker";

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
      userId: session.user?.id,
    },
  });

  console.log(data);

  const sender = {
    email: "hello@joachimhamraoui.com",
    name: "Joachim Hamraoui",
  };

  emailClient.send({
    from: sender,
    to: [
      {
        email: submission.value.clientEmail,
        name: submission.value.clientName,
      },
    ],
    template_uuid: "18812ce5-6b5c-42d6-a06b-957332d525da",

    template_variables: {
      company_name: "InVois",

      client_name: submission.value.clientName,

      invoice_number: submission.value.invoiceNumber,

      due_date: new Intl.DateTimeFormat("fr-BE", {
        dateStyle: "medium",
      }).format(new Date(submission.value.date)),

      total_amount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),

      pay_link: `http://localhost:3000/api/invoice/${data.id}`,

      current_year: new Date().getFullYear(),
    },
  });

  return redirect("/dashboard/invoices");
}

export async function editInvoice(previousState: any, formData: FormData) {
  const session = await requireUser();
  const submission = parseWithZod(formData, { schema: invoiceSchema });

  if (submission.status!== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
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
  });

  const sender = {
    email: "hello@joachimhamraoui.com",
    name: "Joachim Hamraoui",
  };

   emailClient.send({
    from: sender,
    to: [
      {
        email: submission.value.clientEmail,
        name: submission.value.clientName,
      },
    ],
    template_uuid: "cb440d41-2b33-462e-80d6-c1da5c8037a7",

    template_variables: {
      company_name: "InVois",

      client_name: submission.value.clientName,

      invoice_number: submission.value.invoiceNumber,

      due_date: new Intl.DateTimeFormat("fr-BE", {
        dateStyle: "medium",
      }).format(new Date(submission.value.date)),

      total_amount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),

      pay_link: `http://localhost:3000/api/invoice/${data.id}`,

      current_year: new Date().getFullYear(),
    },
  });

  return redirect("/dashboard/invoices");
}

export async function DeleteInvoice(invoiceId: string) {
  const session = await requireUser();

  const data = await prisma.invoice.delete({
    where: {
      userId: session.user?.id as string,
      id: invoiceId
    }
  })

  return redirect("/dashboard/invoices")
}

export async function MarkAsPaidAction(invoiceId: string) {
  const session = await requireUser();

  const data = await prisma.invoice.update({
    where: {
      userId: session.user?.id as string,
      id: invoiceId
    },
    data: {
      status: "PAID"
    }
  })

  return redirect("/dashboard/invoices");
}
