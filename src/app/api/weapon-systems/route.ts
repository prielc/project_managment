import { prisma } from "@/lib/prisma";
import { lookupListHandlers } from "@/lib/lookupApi";

export const { GET, POST } = lookupListHandlers(
  prisma.weaponSystem,
  'אמל"ח מוביל',
);
