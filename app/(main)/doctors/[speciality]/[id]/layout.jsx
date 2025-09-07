import { getDoctorById } from "@/actions/appointments";
import { PageHeader } from "@/components/page-header";
import { redirect } from "next/navigation";

export default async function DoctorProfileLayout({ children, params }) {
  const { id } = params;
  const { doctor } = await getDoctorById(id);

  if (!doctor) {
    redirect("/doctors");
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title={`Dr. ${doctor.name}`}
        backLink={`/doctors/${doctor.speciality}`}
        backLabel={`Back to ${doctor.speciality}`}
      />
      {children}
    </div>
  );
}
