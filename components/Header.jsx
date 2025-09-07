import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { checkUser } from "@/lib/checkUser";
import { Calendar, CreditCard, ShieldCheck, Stethoscope, User } from "lucide-react";
import { checkAndAllocateCredits } from "@/actions/credits";
import { Badge } from "./ui/badge";





export default async function Header(){
    const user=await checkUser()
    if(user?.role==="PATIENT"){
        await checkAndAllocateCredits
    }
    return(
        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 cursor-pointer">
                <Image
                    src="/logo-single.png"
                    alt="MediSnap Logo"
                    width={200}
                    height={60}
                    className="h-10 w-auto object-contain"
                />
                </Link>
                <div className="flex items-center space-x-2">
                    <SignedIn>
                    {/* Admin Links */}
                    {user?.role === "ADMIN" && (
                    <Link href="/admin">
                        <Button
                        variant="outline"
                        className="hidden md:inline-flex items-center gap-2  text-white bg-gray-900"
                        >
                        <ShieldCheck className="h-4 w-4  text-emerald-600 font-bold" />
                        Admin Dashboard
                        </Button>   
                        <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                        <ShieldCheck className="h-4 w-4  text-emerald-600 font-bold" />
                        </Button>
                    </Link>
                    )}

                    {/* Doctor Links */}
                    {user?.role === "DOCTOR" && (
                    <Link href="/doctor/verification">
                        <Button
                        variant="outline"
                        className="hidden md:inline-flex items-center gap-2  text-white bg-gray-900"
                        >
                        <Stethoscope className="h-4 w-4  text-emerald-600 font-bold" />
                        Doctor Dashboard
                        </Button>
                        <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                        <Stethoscope className="h-4 w-4  text-emerald-600 font-bold" />
                        </Button>
                    </Link>
                    )}
                    {/* Patient Link */}
                    {user?.role === "PATIENT" && (
                    <Link href="/appointments">
                        <Button
                        variant="outline"
                        className="hidden md:inline-flex items-center gap-2 text-white bg-gray-900"
                        >
                        <Calendar className="h-4 w-4 text-emerald-600 font-bold" />
                        My Appointments
                        </Button>
                        <Button variant="ghost" className="md:hidden w-10 h-10 p-0 text-white">
                        <Calendar className="h-4 w-4  text-emerald-600 font-bold" />
                        </Button>
                    </Link>
                    )}
                    {/* UNASSIGNED */}
                    {user?.role === "UNASSIGNED" && (
                    <Link href="/onboarding">
                        <Button
                        variant="outline"
                        className="hidden md:inline-flex items-center gap-2 text-white bg-gray-900 outline-emerald-600"
                        >
                        <User className="h-4 w-4 text-emerald-600"/>
                        Complete Profile
                        </Button>
                        <Button variant="ghost" className="md:hidden w-5 h-10 p-0 bg-emerald-500">
                        <User className="h-4 w-4" />
                        </Button>
                    </Link>
                    )}
                    </SignedIn>
                    {(!user || user?.role !== "ADMIN") && (
                    <Link href={user?.role === "PATIENT" ? "/pricing" : "/doctor"}>
                    <Badge
                        variant="outline"
                        className="h-9 bg-emerald-900/20 border-emerald-700/30 px-3 py-1 flex items-center gap-2"
                    >
                        <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">
                        {user && user.role !== "ADMIN" ? (  //if user is logged in and user is patient
                            <>  
                            {user.credits}{" "}     
                            <span className="hidden md:inline">         
                                {user?.role === "PATIENT"       
                                ? "Credits"                 //show user credits if patient else show earned credits 
                                : "Earned Credits"}         
                            </span>
                            </>
                        ) : (
                            <>Pricing</>
                        )}
                        </span>
                    </Badge>
                    </Link>
                )}
                <SignedOut>
                <SignInButton>
                    <Button variant="secondary" className="text-white">Sign in</Button>
                </SignInButton>
                </SignedOut>
                <SignedIn>
                    {console.log('user is signed in')}
                <UserButton appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"></UserButton>
                </SignedIn>
                </div>
            </nav>
        </header>
    )
}