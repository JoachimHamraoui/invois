import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function Verify()    {
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <Card className="w-[400px] px-5">
                <CardHeader className="text-center">
                    <div className="mx-auto flex mb-4 size-20 items-center justify-center rounded-full bg-blue-100">
                        <Mail className="size-12 text-blue-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
                    <CardDescription>Check your email to verify your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mt-4 rounded-md bg-yellow-50 p-4 border-yellow-300">
                        <div className="flex items-center">
                            <AlertCircle className="mr-2 size-5 text-yellow-500" />
                            <p className="text-sm font-medium text-yellow-800 ml-3">Be sure to check your spam folder !</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Link href="/" className={buttonVariants({ className: "w-full", variant: "outline" })}>
                        <ArrowLeft className="mr-2 size-4" /> Back to Homepage
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}