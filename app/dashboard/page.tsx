import { DashboardBlocks } from "../components/DashboardBlocks";
import { InvoiceGraph } from "../components/InvoiceGraph";
import { signOut } from "../utils/auth";
import { requireUser } from "../utils/hooks";

export default async function DashboardRoute() {
  const session = await requireUser();

  return (
    <>
      <DashboardBlocks />
      <div className="grid gap-4 lg:grid-cols-3">
        <InvoiceGraph />
        <h1 className="col-span-1">30</h1>
      </div>
    </>
  );
}
