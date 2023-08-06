import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";

export async function getCurrentUser() {
  const session = await getAuthSession();

  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return user;
}
