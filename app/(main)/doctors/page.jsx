import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SPECIALTIES } from "@/lib/specialities";

export default async function DoctorsPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <h1 className="text-5xl font-bold text-emerald-400 mb-2 py-20 gradient-title">Find Your Doctor</h1>
        <p className="text-white text-lg">
          Browse by speciality or view all available healthcare providers
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {SPECIALTIES.map((speciality) => (
          <Link key={speciality.name} href={`/doctors/${speciality.name}`}>
            <Card className="hover:border-emerald-700/40 transition-all cursor-pointer border-emerald-900/20 h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center mb-4">
                  <div className="text-emerald-400">{speciality.icon}</div>
                </div>
                <h3 className="font-medium text-white">{speciality.name}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}