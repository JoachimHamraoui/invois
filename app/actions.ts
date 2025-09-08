"use server";
// use Zod V3.25.0
import { requireUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";

export async function onboardUser(previousState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, { schema: onboardingSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
        firstName: submission.value.firstName,
        lastName: submission.value.lastName,
        address: submission.value.address,
    },
  });
    
}
