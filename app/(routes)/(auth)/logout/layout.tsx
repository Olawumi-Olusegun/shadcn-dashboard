
import React, { PropsWithChildren } from 'react'


export default function LogoutLayout({children}: PropsWithChildren) {
  return (
    <main className='flex flex-col min-h-screen items-center p-24 '>
        {children}
    </main>
  )
}