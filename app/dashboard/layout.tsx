import Link from "next/link";
import { requireUser } from "../utils/hooks";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireUser();
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-1 bg-muted/40 p-4 dark:bg-muted/50 md:block">
          <div className="flex flex-col max-h-screen h-full gap-2">
            <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg;px-6">
                <Link href="/" className="flex items-center">
                    <span className="text-lg font-bold">InVois</span>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
