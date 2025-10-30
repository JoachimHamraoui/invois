import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/">
        <h1 className="text-3xl font-bold text-blue-600">Invois</h1>
      </Link>
      <Link href="/login" className={buttonVariants({ })}>Get Started</Link>
    </nav>
  );
}
