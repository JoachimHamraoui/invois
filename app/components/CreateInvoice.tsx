"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { useActionState, useState } from "react";
import { SubmitButton } from "./SubmitButtons";
import { createInvoice } from "../actions";
import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { invoiceSchema } from "../utils/zodSchemas";
import { get } from "http";
import { formatCurrency } from "../utils/formatCurrency";
// import { formatCurrency } from "../utils/hooks";

interface iAppProps {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

export function CreateInvoice({address, firstName, lastName, email}: iAppProps) {
  const [lastResult, action] = useActionState(createInvoice, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: invoiceSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");

  const [currency, setCurrency] = useState("EUR");

  const calcTotal = (Number(quantity) || 0) * (Number(rate) || 0);
  

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardContent className="p-6">
        <form action={action} id={form.id} onSubmit={form.onSubmit} noValidate>
          <input
            type="hidden"
            name={fields.date.name}
            value={selectedDate.toISOString()}
          />
          <input type="hidden" name={fields.total.name} value={calcTotal} />
          <div className="flex flex-col gap-1 w-fit mb-6">
            <div className="flex items-center gap-4">
              <Badge variant={"secondary"}>Draft</Badge>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={fields.invoiceName.initialValue}
                placeholder="Invoice Name"
              />
            </div>
            <p className="text-red-500 text-sm">{fields.invoiceName.errors}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <Label className="mb-2">Invoice No.</Label>
              <div className="flex">
                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                  #
                </span>
                <Input
                  type="number"
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={fields.invoiceNumber.initialValue}
                  placeholder="5"
                  className="rounded-l-none"
                />
              </div>
              <p className="text-red-500 text-sm">
                {fields.invoiceNumber.errors}
              </p>
            </div>
            <div>
              <Label className="mb-2">Currency</Label>
              <Select
                name={fields.currency.name}
                key={fields.currency.key}
                defaultValue="EUR"
                onValueChange={(value) => setCurrency(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    className="px-6"
                    placeholder="Select a currency"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-sm">{fields.currency.errors}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label className="mb-2">From</Label>
              <div className="space-y-2">
                <Input
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  placeholder="Your Name"
                  defaultValue={firstName + " " + lastName}
                />
                <p className="text-red-500 text-sm">{fields.fromName.errors}</p>
                <Input
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  placeholder="Your Email"
                  defaultValue={email}
                />
                <p className="text-red-500 text-sm">
                  {fields.fromEmail.errors}
                </p>
                <Input
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  placeholder="Your Address"
                  defaultValue={address}
                />
                <p className="text-red-500 text-sm">
                  {fields.fromAddress.errors}
                </p>
              </div>
            </div>
            <div>
              <Label className="mb-2">To</Label>
              <div className="space-y-2">
                <Input
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={fields.clientName.initialValue}
                  placeholder="Client Name"
                />
                <p className="text-red-500 text-sm">
                  {fields.clientName.errors}
                </p>
                <Input
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={fields.clientEmail.initialValue}
                  placeholder="Client Email"
                />
                <p className="text-red-500 text-sm">
                  {fields.clientEmail.errors}
                </p>
                <Input
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={fields.clientAddress.initialValue}
                  placeholder="Client Address"
                />
                <p className="text-red-500 text-sm">
                  {fields.clientAddress.errors}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="">
              <Label className="mb-2">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"}>
                    <CalendarIcon className="size-4" />
                    {selectedDate ? (
                      new Intl.DateTimeFormat("fr-BE", {
                        dateStyle: "medium",
                      }).format(selectedDate)
                    ) : (
                      <p>Pick a date</p>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    disabled={(date) => date < new Date()}
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-red-500 text-sm">{fields.date.errors}</p>
            </div>

            <div>
              <Label className="mb-2">Invoice Due</Label>
              <Select
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue={fields.dueDate.initialValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a due date" />
                  <SelectContent>
                    <SelectItem value="0">Due on receipt</SelectItem>
                    <SelectItem value="15">Net 15</SelectItem>
                    <SelectItem value="30">Net 30</SelectItem>
                  </SelectContent>
                </SelectTrigger>
              </Select>
              <p className="text-red-500 text-sm">{fields.dueDate.errors}</p>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
              <p className="col-span-6">Description</p>
              <p className="col-span-2">Quantity</p>
              <p className="col-span-2">Rate</p>
              <p className="col-span-2">Amount</p>
            </div>

            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-6">
                <Textarea
                  name={fields.invoiceItemDescription.name}
                  key={fields.invoiceItemDescription.key}
                  defaultValue={fields.invoiceItemDescription.initialValue}
                  placeholder="Item name & Description"
                />
                <p className="text-red-500 text-sm">
                  {fields.invoiceItemDescription.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  name={fields.invoiceItemQuantity.name}
                  key={fields.invoiceItemQuantity.key}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="1"
                />
                <p className="text-red-500 text-sm">
                  {fields.invoiceItemQuantity.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  name={fields.invoiceItemRate.name}
                  key={fields.invoiceItemRate.key}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <p className="text-red-500 text-sm">
                  {fields.invoiceItemRate.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input value={formatCurrency({ amount: calcTotal, currency: currency as any })} disabled />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-1/3">
              <div>
                <span className="font-medium">Subtotal</span>
                <span className="float-right">{formatCurrency({ amount: calcTotal, currency: currency as any })}</span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span className="font-medium">Total ({currency})</span>
                <span className="font-bold underline underline-offset-2">
                  {formatCurrency({ amount: calcTotal, currency: currency as any })}
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label className="mb-2">Note</Label>
            <Textarea
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={fields.note.initialValue}
              placeholder="Internal notes"
            />
            <p className="text-red-500 text-sm">{fields.note.errors}</p>
          </div>

          <div className="flex items-center justify-end mt-6">
            <div>
              <SubmitButton text="Create Invoice" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
