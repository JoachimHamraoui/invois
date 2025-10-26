import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Graph } from "./Graph";
import { prisma } from "../utils/db";

async function getInvoices(userId: string) {
  const rawData = await prisma.invoice.findMany({
    where: {
      status: "PAID",
      userId: userId,
      createdAt: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Group and aggregate data

  const aggregatedData = rawData.reduce((acc: { [key: string]: number }, curr) => {
    const date = new Date(curr.createdAt).toLocaleDateString("fr-BE", {
        month: "short",
        day: "numeric",
    });
    acc[date] = (acc[date] || 0) + curr.total;

    return acc;
  }, {});

}

export function InvoiceGraph() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Invoices which have been paid in the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Graph />
      </CardContent>
    </Card>
  );
}
