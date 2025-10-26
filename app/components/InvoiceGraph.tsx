import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function InvoiceGraph() {
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Paid Invoices</CardTitle>
                <CardDescription>Invoices which have been paid in the last 30 days.</CardDescription>
            </CardHeader>
            <CardContent>
                
            </CardContent>
        </Card>
    );
}