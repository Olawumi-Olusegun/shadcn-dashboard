import { PropsWithChildren } from "react";

export default function LandingPageLayout({children}: PropsWithChildren) {
    return (
      <main className='flex flex-col gap-4 min-h-screen items-center justify-center p-24 '>
          {children}
      </main>
    )
  }