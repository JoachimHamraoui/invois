import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, EuroIcon, Users } from "lucide-react";

export function DashboardBlocks() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-medium">Total revenue</CardTitle>
                    <EuroIcon className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div>
                        <h2 className="text-3xl font-bold"> € 45,231.89</h2>
                        <p className="text-xs text-muted-foreground">Based on the last 20 days</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-medium">Total Invoices Issued</CardTitle>
                    <Users className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div>
                        <h2 className="text-3xl font-bold">+30</h2>
                        <p className="text-xs text-muted-foreground">Total Invoices Issued</p>
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
                        <h2 className="text-3xl font-bold">+30</h2>
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
                        <h2 className="text-3xl font-bold">+30</h2>
                        <p className="text-xs text-muted-foreground">Total Unpaid Invoices</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}