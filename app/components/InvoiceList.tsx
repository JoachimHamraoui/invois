import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceActions } from "./InvoiceActions";

export function InvoiceList() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">#1</TableCell>
                    <TableCell className="font-medium">Joachim Hamraoui</TableCell>
                    <TableCell className="font-medium">$55.00</TableCell>
                    <TableCell className="font-medium">Paid</TableCell>
                    <TableCell className="font-medium">2023-06-01</TableCell>
                    <TableCell className="text-right">
                        <InvoiceActions />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}