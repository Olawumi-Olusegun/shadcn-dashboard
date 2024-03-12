"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PersonStanding } from 'lucide-react';
import Link from 'next/link';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';


const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
 
export default function LoginPage() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const handleFormSubmit = (values: any) => {
    
  }

  return (
    <>
    <PersonStanding size={50} />
     <Card className='w-full max-w-sm mx-auto'>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Signin to your support me account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='flex flex-col gap-y-4 ' onSubmit={form.handleSubmit(handleFormSubmit)}>
            <FormField control={form.control} name='email' render={({field}) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input placeholder='john@doe.com' type='email' {...field} />
                  </FormControl>
                  <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name='password' render={({field}) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input placeholder='Password' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
              </FormItem>
            )} />

            <Button type='submit'>Sign in</Button>

          </form>
        </Form>
      </CardContent>
      <CardFooter className='justify-between'>
        <small>{"Don't have an account ?"}</small>
        <Button asChild variant="outline" size="sm">
          <Link href="/signup" >Sign up</Link>
        </Button>
      </CardFooter>
     </Card>
    </>
  )
}