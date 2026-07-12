import { prisma } from "@/lib/prisma";
import { lookupItemHandlers } from "@/lib/lookupApi";

export const { PATCH, DELETE } = lookupItemHandlers(prisma.analyst, "אנליסט");
