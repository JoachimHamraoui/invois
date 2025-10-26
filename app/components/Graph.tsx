"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
    {
        date: "Nov 05",
        amount: 1000
    },
    {
        date: "Nov 06",
        amount: 2000
    },
    {
        date: "Nov 07",
        amount: 650
    },
    {
        date: "Nov 08",
        amount: 4500
    },
    {
        date: "Nov 09",
        amount: 5000
    }
]

export function Graph() {
    return (
        <ChartContainer config={{
            amount: {
                label: "Amount",
                color: "hsl(var(--primary))",
            },
        }} className="min-h-300px">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                    <Line type="monotone" dataKey="amount" stroke="blue" strokeWidth={2}/>
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}