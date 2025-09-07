import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
// import { checkUser } from "../lib/checkUser";



const inter=Inter({subsets : ["latin"]})

export const metadata = {
  title: "MediSnap-Doctor Appointment Form",
  description: "Connect with doctors anytime,anywhere",
};

export default async function RootLayout({ children }) {
  // const user=await checkUser()
  return (  
    <ClerkProvider appearance={{
      baseTheme : dark
    }}>
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}> 



      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
      {/* header */}
      <Header></Header>
      <main className="min-h-screen">  {children}</main>
      <Toaster richColors/>



      {/* footer */}
      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-4 text-center text-white">
          <p>Made by Shiva Wali(2K22/IT/152)</p>
        </div>
      </footer>


      </ThemeProvider>
      </body> 
    </html>
    </ClerkProvider>
  );
}
