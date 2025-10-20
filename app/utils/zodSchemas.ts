import { Currency } from "lucide-react";
import { date, z } from "zod";

export const onboardingSchema = z.object({
    firstName: z.string().min(2, { message: "First name is required" }),
    lastName: z.string().min(2, { message: "Last name is required" }),
    address: z.string().min(2, { message: "Address is required" })
});

export const invoiceSchema = z.object({
    invoiceName: z.string().min(1, { message: "Invoice name is required" }),
    total: z.number().min(1, { message: "Total is required" }),
    status: z.enum(["PAID", "PENDING"]).default("PENDING"),
    date: z.string().min(1, { message: "Date is required" }),
    dueDate: z.number().min(0, { message: "Due date is required" }),
    fromName: z.string().min(1, { message: "Your name is required" }),
    fromEmail: z.string().email("Invalid email address"),
    fromAddress: z.string().min(1, { message: "Your address is required" }),
    clientName: z.string().min(1, { message: "Client name is required" }),
    clientEmail: z.string().email("Invalid email address"),
    clientAddress: z.string().min(1, { message: "Client address is required" }),
    currency: z.string().min(1, { message: "Currency is required" }),
    invoiceNumber: z.number().min(1, { message: "Minimum of 1 is required" }),
    note: z.string().optional(),
    invoiceItemDescription: z.string().min(1, { message: "Item description is required" }),
    invoiceItemQuantity: z.number().min(1, { message: "Quantity is minimum 1" }),
    invoiceItemRate: z.number().min(1, { message: "Rate is minimum 1" })
})