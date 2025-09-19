"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export function CreateInvoice() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 w-fit mb-6">
            <Badge variant={"secondary"}>Draft</Badge>
            <Input placeholder="Invoice Number" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <Label className="mb-2">Invoice No.</Label>
            <div className="flex">
              <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                #
              </span>
              <Input placeholder="5" className="rounded-l-none" />
            </div>
          </div>
          <div>
            <Label className="mb-2">Currency</Label>
            <Select defaultValue="EUR">
              <SelectTrigger className="w-full">
                <SelectValue className="px-6" placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="INR">INR</SelectItem>
                <SelectItem value="JPY">JPY</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label className="mb-2">From</Label>
            <div className="space-y-2">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" />
              <Input placeholder="Your Address" />
            </div>
          </div>
          <div>
            <Label className="mb-2">To</Label>
            <div className="space-y-2">
              <Input placeholder="Client Name" />
              <Input placeholder="Client Email" />
              <Input placeholder="Client Address" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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
          </div>

          <div>
            <Label className="mb-2">Invoice Due</Label>
            <Select >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a due date" />
                <SelectContent>
                  <SelectItem value="0">Due on receipt</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </SelectTrigger>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
