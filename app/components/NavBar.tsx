import { buttonVariants } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/">
        <h1 className="text-3xl font-bold text-blue-600">Invois</h1>
      </Link>
      <Link href="/login"><RainbowButton>Get Started</RainbowButton></Link>
    </nav>
  );
}
