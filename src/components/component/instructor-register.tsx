"use client"
import Link from "next/link"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BACKEND_URL } from "@/utils/constants"

export function InstructorRegister() {


  const handleOauth = async (event: any) => {
    event.preventDefault();
    window.location.href = `${BACKEND_URL}/auth/callback/google`;
  };


  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader className="space-y-2">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-8" />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?
              <Link className="underline" href="#">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" required type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" required type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" required type="password" />
        </div>
        <Button className="w-full">Sign up</Button>
        <Separator className="h-8" />
        <Button onClick={handleOauth} className="w-full" variant="outline">
          Sign up with Google
        </Button>
      </CardContent>
    </Card>
  )
}
