"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, PersonStanding } from 'lucide-react';
import Link from 'next/link';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
  accountType: z.enum(["personal", "company"]),
  companyName: z.string().optional(),
  numberOfEmployees: z.coerce.number().optional(),
  dob: z.date().refine((date) => {
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate(),
    );

    return date <= eighteenYearsAgo;

  }, "You must be above eighten years")
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

  const dobFromDate = new Date();

  dobFromDate.setFullYear(dobFromDate.getFullYear() - 120);

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

              <FormField control={form.control} name='dob' render={({field}) => (
              <FormItem className='flex flex-col pt-2'>
                <FormLabel>Date of birth:</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className='normal-case flex items-center justify-between pr-2'>
                        { !!field.value 
                        ? format(field.value, "PPP") 
                        : <span>Pick a date</span> 
                        }
                        <CalendarIcon />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align='start' className='w-auto'>
                    <Calendar
                    mode='single'
                    defaultMonth={field.value}
                    selected={field.value}
                    onSelect={field.onChange}
                    fixedWeeks
                    weekStartsOn={1}
                    fromDate={dobFromDate}
                    toDate={new Date()}
                    className='w-[300px]'
                    />
                  </PopoverContent>
                </Popover>
                  <FormMessage />
              </FormItem>
              )} />


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