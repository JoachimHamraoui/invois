import { redirect } from "next/navigation";
import { auth } from "../utils/auth";

export default async function DashboardRoute() {

    const session = await auth();

    if (!session) {
        return (
            redirect("/")
        );
    }

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}