import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "../utils/db";
import { requireUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      total: true,
      clientName: true,
      clientEmail: true,
      currency: true
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return data;
}

export async function RecentInvoices() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  const getInitials = (name?: string): string =>
    name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        {data.map((invoice) => (
          <div key={invoice.id} className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage
                className="hidden sm:flex size-9"
              />
              <AvatarFallback>{getInitials(invoice.clientName)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">
                {invoice.clientName}
              </p>
              <p className="text-sm text-muted-foreground">
                {invoice.clientEmail}
              </p>
            </div>
            <div className="ml-auto font-medium">+ {formatCurrency({amount: invoice.total, currency: invoice.currency as any})}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
