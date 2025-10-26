import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  CreditCard,
  DollarSign,
  EuroIcon,
  Users,
} from "lucide-react";
import { prisma } from "../utils/db";
import { requireUser } from "../utils/hooks";

async function getData(userId: string) {
  // Promise.all to run multiple async functions/queries
  const [data, openInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: userId,
      },
      select: {
        total: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PENDING",
      },
      select: {
        id: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PAID",
      },
      select: {
        id: true,
      },
    }),
  ]);

  return {
    data,
    openInvoices,
    paidInvoices,
  };
}
export async function DashboardBlocks() {
  const session = await requireUser();
  const { data, openInvoices, paidInvoices } = await getData(
    session.user?.id as string
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Total revenue</CardTitle>
          <EuroIcon className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div>
            <h2 className="text-3xl font-bold">
              €{" "}
              {new Intl.NumberFormat("fr-BE", {
                style: "currency",
                currency: "EUR",
              }).format(data.reduce((acc, invoice) => acc + invoice.total, 0))}
            </h2>
            <p className="text-xs text-muted-foreground">
              Based on the last 30 days
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Total Invoices Issued
          </CardTitle>
          <Users className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div>
            <h2 className="text-3xl font-bold">{data.length}</h2>
            <p className="text-xs text-muted-foreground">
              Total Invoices Issued
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">PaidInvoices</CardTitle>
          <CreditCard className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div>
            <h2 className="text-3xl font-bold">{paidInvoices.length}</h2>
            <p className="text-xs text-muted-foreground">Total Invoices Paid</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Open Invoices</CardTitle>
          <Activity className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div>
            <h2 className="text-3xl font-bold">{openInvoices.length}</h2>
            <p className="text-xs text-muted-foreground">
              Total Unpaid Invoices
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
