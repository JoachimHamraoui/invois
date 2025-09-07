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

export default function Onboarding() {
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
          <form className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label >First Name</Label>
                <Input type="text" name="firstName" placeholder="John" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Last Name</Label>
                <Input type="text" name="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label>Address</Label>
                <Input type="text" name="lastName" placeholder="Berlin Ave. 123" />
              </div>
              <SubmitButton text="Finish onboarding" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
