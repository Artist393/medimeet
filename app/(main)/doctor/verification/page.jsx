import { ClipboardCheck, AlertCircle, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCurrentUser } from "@/actions/onboarding";
import { redirect } from "next/navigation";

export default async function VerificationPage() {
  const user = await getCurrentUser();

  if (user?.verificationStatus === "VERIFIED") {
    redirect("/doctor");
  }

  const isRejected = user?.verificationStatus === "REJECTED";

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-emerald-950/20 border border-emerald-800 shadow-xl rounded-2xl backdrop-blur">
          <CardHeader className="text-center">
            <div
              className={`mx-auto p-4 rounded-full w-fit mb-4 ${
                isRejected ? "bg-red-900/30" : "bg-amber-900/30"
              }`}
            >
              {isRejected ? (
                <XCircle className="h-8 w-8 text-red-400" />
              ) : (
                <ClipboardCheck className="h-8 w-8 text-amber-400" />
              )}
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-1">
              {isRejected
                ? "Verification Declined"
                : "Verification in Progress"}
            </CardTitle>
            <CardDescription className="text-emerald-300 text-base">
              {isRejected
                ? "Your application requires revision"
                : "Thank you for submitting your information"}
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center mt-4">
            {isRejected ? (
              <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-5 mb-6 flex items-start gap-3 text-left">
                <AlertCircle className="h-5 w-5 text-red-400 mt-1" />
                <div className="text-sm text-red-200">
                  <p className="mb-2">
                    Our team reviewed your application and found it doesn't meet our current requirements. Common issues include:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-3">
                    <li>Insufficient or unclear credential documentation</li>
                    <li>Minimum experience not met</li>
                    <li>Incomplete or vague service description</li>
                  </ul>
                  <p>Please update your profile with the necessary corrections and resubmit.</p>
                </div>
              </div>
            ) : (
              <div className="bg-amber-900/10 border border-amber-800/30 rounded-lg p-5 mb-6 flex items-start gap-3 text-left">
                <AlertCircle className="h-5 w-5 text-amber-400 mt-1" />
                <p className="text-sm text-amber-200">
                  Your profile is currently under review by our team. This typically takes 1–2 business days. You’ll be notified via email once your account is verified.
                </p>
              </div>
            )}

            <p className="text-sm text-muted-foreground mb-6 text-white">
              {isRejected
                ? "You can edit your doctor profile and submit again for verification."
                : "In the meantime, feel free to explore our platform or contact support if needed."}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                variant="outline"
                className="border-emerald-700 text-emerald-300 hover:bg-emerald-900 transition-all"
              >
                <Link href="/">Return to Home</Link>
              </Button>

              {isRejected ? (
                <Button
                  asChild
                  className="bg-red-600 hover:bg-red-700 transition-all"
                >
                  <Link href="/doctor/update-profile">Update Profile</Link>
                </Button>
              ) : (
                <Button
                  asChild
                  className="bg-emerald-600 hover:bg-emerald-700 transition-all"
                >
                  <Link href="/contact-support">Contact Support</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}