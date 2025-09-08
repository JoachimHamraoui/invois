"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../components/SubmitButtons";
import { useActionState } from "react";
import { onboardUser } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchemas";
import { redirect } from "next/dist/server/api-utils";

export default function Onboarding() {
  const [lastResult, action] = useActionState(onboardUser, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onboardingSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="w-[480px]">
        <CardHeader>
          <CardTitle className="text-xl">You are almost there !</CardTitle>
          <CardDescription>
            Enter your information to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            action={action}
            id={form.id}
            onSubmit={form.onSubmit}
            noValidate
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>First Name</Label>
                <Input
                  type="text"
                  name={fields.firstName.name}
                  key={fields.firstName.key}
                  defaultValue={fields.firstName.initialValue}
                  placeholder="John"
                />
                <p className="text-sm text-red-500">
                  {fields.firstName.errors}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Last Name</Label>
                <Input
                  type="text"
                  name={fields.lastName.name}
                  key={fields.lastName.key}
                  defaultValue={fields.lastName.initialValue}
                  placeholder="John"
                />
                <p className="text-sm text-red-500">
                  {fields.lastName.errors}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Address</Label>
              <Input
                type="text"
                name={fields.address.name}
                key={fields.address.key}
                defaultValue={fields.address.initialValue}
                placeholder="Berlin Ave. 123"
              />
              <p className="text-sm text-red-500">{fields.address.errors}</p>
            </div>
            <SubmitButton text="Finish onboarding"  />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
