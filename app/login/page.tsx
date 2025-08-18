import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center px-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>Enter your email below to login to your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-y-4">
                            <div className="flex flex-col gap-y-4">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Email" />
                            </div>
                            <Button type="submit">Login</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}