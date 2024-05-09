"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CardContent, Card } from "@/components/ui/card"
import { BACKEND_URL, FRONTEND_URL } from "@/utils/constants"
import { useApiSend } from "@/hooks/network/rq"
import { loginInstructor } from "@/hooks/server/auth/url"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useRef } from "react"
import { LoadingSpinner } from "../home/loader"
import { Package2Icon } from "../../icons/page"
import { useSearchParams } from "next/navigation"
import Contact from "../home/Contact"

export function InstructorLogin() {
  const { toast } = useToast();
  const searchParams = useSearchParams()

  const email = searchParams.get('email');

  const emailref = useRef(null);
  const passwordref = useRef(null);

  useEffect(() => {
    emailref.current.value = email;
  }, [email, emailref])


  const handleOauth = async (event: any) => {
    event.preventDefault();
    window.location.href = `${BACKEND_URL}/auth/callback/google`;
  };

  const { mutate, isError, isPending } = useApiSend(
    loginInstructor,
    (data: any) => {
      console.log(data)
      toast({
        title: "success",
        description: "Login Successful"
      })
      window.location.href = `${FRONTEND_URL}/oauth?token=${data?.access_token}&i_user=${JSON.stringify(data?.user)}`;
    },
    (e: any) => {
      toast({
        variant: "destructive",
        title: "Cannot Login",
        description: e?.message
      })
    },

  );

  const onSubmit = async () => {
    mutate({
      email: (emailref)?.current?.value,
      password: (passwordref)?.current?.value,
    });
  }

  if (isPending) {
    return (<div className="h-full w-full flex-col flex items-center gap-5 justify-center">
      <Package2Icon className="h-6 w-6" />
      <span className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">MASCCA</span>
      <LoadingSpinner />
    </div>)
  }


  return (
    <Card className="max-w-sm mx-auto">
      <CardContent className="space-y-4">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-8" />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Test Creator Login</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Enter your credentials to access your account</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input ref={emailref} id="email" name="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="password">Password</Label>
              {/* <Link className="text-sm underline" href="#">
                Forgot password
              </Link> */}
            </div>
            <Input ref={passwordref} id="password" name="password" placeholder="Enter your password" type="password" />
          </div>
          <Button className="w-full" onClick={onSubmit} >Login</Button>
          <Separator className="my-8" />
          <Button onClick={handleOauth} className="w-full" variant="outline">
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            <div className="underline">
            <Contact name={"Sign up"} />
            </div>
            Don&apos;t have an account?
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
