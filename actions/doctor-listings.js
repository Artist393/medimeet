"use server";

import { db } from "@/lib/prisma";

/**
 * Get doctors by specialty
 */
export async function getDoctorsByspeciality(speciality) {
  try {
    const doctors = await db.user.findMany({
      where: {
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
        speciality: "General Medicine",
      },
      orderBy: {
        name: "asc",
      },
    });
    // console.log(doctors);

    return { doctors };
  } catch (error) {
    console.error("Failed to fetch doctors by speciality:", error);
    return { error: "Failed to fetch doctors" };
  }
}