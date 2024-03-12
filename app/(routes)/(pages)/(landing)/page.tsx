import { Button } from "@/components/ui/button";
import { PersonStanding } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <h1 className="flex items-center  "> 
        <PersonStanding size={34} className="text-pink-500" /> SupportMe
      </h1>

      <p className="text-center">The best dashboard to manage your customers support</p>
      
      <div className="flex items-center gap-x-2">
        <Button asChild>
          <Link href="/signin" >Log in</Link>
        </Button>
        <small>or</small>
        <Button asChild variant="outline">
          <Link href="/signup" >Sign up</Link>
        </Button>
      </div>

    </>
  );
}
