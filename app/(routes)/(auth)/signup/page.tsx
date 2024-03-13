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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
  accountType: z.enum(["personal", "company"]),
  companyName: z.string().optional(),
  numberOfEmployees: z.coerce.number().optional(),
}).superRefine((data, context) => {
  if(data.accountType === "company" && !data.companyName) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["companyName"],
      message: "Company name is required"
    })
  }
  if(data.accountType === "company" && (!data.numberOfEmployees || data.numberOfEmployees < 1 )) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["numberOfEmployees"],
      message: "Number of employees is required"
    })
  }
});
 
export default function SignupPage() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      // accountType: ["personal", "company"],
      // companyName: "",
      // numberOfEmployees: "",
    }
  });

  const accountType = form.watch("accountType");

  const handleFormSubmit = (values: any) => {
    
  }

  return (
    <>
    <PersonStanding size={50} />
     <Card className='w-full max-w-sm mx-auto'>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Signup for a new support me account</CardDescription>
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
            <FormField 
            control={form.control}
             name='accountType'
             render={({field}) => (
              <FormItem>
                <FormLabel>Account Type:</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an account type"></SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='personal'>Personal</SelectItem>
                    <SelectItem value='company'>Company</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
             )}
            />

            { accountType === "company" 
            ? (
              <>
              <FormField control={form.control} name='companyName' render={({field}) => (
              <FormItem>
                <FormLabel>Company name:</FormLabel>
                  <FormControl>
                    <Input placeholder='Company name' type='text' {...field} />
                  </FormControl>
                  <FormMessage />
              </FormItem>
              )} />

              <FormField control={form.control} name='numberOfEmployees' render={({field}) => (
              <FormItem>
                <FormLabel>Number of employees:</FormLabel>
                  <FormControl>
                    <Input placeholder='Number of employees' type='number' min={0} {...field} />
                  </FormControl>
                  <FormMessage />
              </FormItem>
              )} />

              </>
            ) 
            : null 
            }
            <Button type='submit'>Sign up</Button>

          </form>
        </Form>
      </CardContent>
      <CardFooter className='justify-between'>
        <small>{"Already have an account ?"}</small>
        <Button asChild variant="outline" size="sm">
          <Link href="/signin" >Sign in</Link>
        </Button>
      </CardFooter>
     </Card>
    </>
  )
}