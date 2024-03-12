import LightDarkToggle from "@/components/ui/light-dark-toggle";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export default function LoginPageLayout({children}: PropsWithChildren) {
    return (
      <>
      <main className='flex flex-col gap-4 min-h-screen items-center justify-center p-5 lg:p-24 '>
          {children}
      </main>
      <LightDarkToggle className={cn("fixed top-[calc(50%-12px)] right-2 lg:right-8 ")} />
      </>
    )
  }