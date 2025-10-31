import { RainbowButton } from "@/components/ui/rainbow-button";
import Image from "next/image";
import Link from "next/link";

export function Hero(){
    return (
        <section className="w-full h-full relative flex flex-col items-center justify-center py-12 lg:py-20">
            <div className="text-center">
                <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">Introducing Invois Beta</span>
                <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-semibold tracking-tighter">
                    Invoicing made <span className="block -mt-2 bg-gradient-to-l from-blue-600 via-blue-400 to-blue-300 bg-clip-text text-transparent">simple !</span>
                </h1>
                <p className="max-w-xl mt-4 mx-auto lg:text-lg text-muted-foreground">
                    Create Invoices can be a hassle! We at Invois make it easier for you to get paid in due time !
                </p>
                <div className="mt-8 mb-12">
                    <Link href="/login">
                    <RainbowButton>Get Access</RainbowButton>
                </Link>
                </div>
            </div>

            <div className="relative items-center w-full py-12 mx-auto mt-12">
                <Image src="/hero.png" width={1920} height={1080} alt="hero" className="relative object-cover w-full border rounded-lg lg:rounded-2xl shadow-2xl" />
            </div>
        </section>
    )
}