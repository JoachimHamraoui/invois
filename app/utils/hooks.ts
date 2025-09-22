import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireUser() {
    const session = await auth();

    if (!session) {
        return (
            redirect("/login")
        );
    }

    return session;
}

// export function formatCurrency(amount: number) {
//     return new Intl.NumberFormat("fr-BE", {
//         style: "currency",
//         currency: "USD",
//     }).format(amount);
// }