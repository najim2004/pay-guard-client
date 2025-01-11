import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRegisterMutation } from "@/redux/services/authApi";
import { useSelector } from "react-redux";

export const Signup = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const { toast } = useToast();
  const navigator = useNavigate();
  const [onSignup, { isLoading }] = useRegisterMutation();
  const authState = useSelector((state) => state.auth);
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  if (authState?.token) {
    return <Navigate to="/" />;
  }
  const handleToast = (res) => {
    if (res?.status) {
      toast({
        variant: "default",
        title: "Success",
        description: res.status_message || "Account created successfully",
      });
      navigator("/login");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: res.status_message || "Failed to create account",
      });
    }
  };

  const onSubmit = async (data) => {
    // example:{"name":"Naimul Hasan","email":"naim.microdeft@gmail.com","password": "12345678"}
    try {
      const response = await onSignup({
        name: data?.fullName,
        email: data?.email,
        password: data?.password,
      }).unwrap();
      /*
      success response example:
        {
            "status": true,
            "status_message": "Success! Registration successful.",
            "data": {
                "token": "338|Yg8uUk9ecqX8FjR0yQOsB5nJMyVUXGPvi1dg6eSffe3f7ffd",
                "user": {
                    "id": 130,
                    "name": "Najim",
                    "email": "user@japalearn.com"
                }
            },
            "status_code": 200,
            "status_class": "success"
        }
      */
      handleToast(response);
    } catch (err) {
      handleToast({
        status: false,
        status_message:
          err?.data?.message || err.message || "An error occurred",
      });
    }
  };

  const togglePasswordView = () => {
    setViewPassword(!viewPassword);
  };
  return (
    <div className="bg-white w-full min-h-[calc(100vh-100px)] flex flex-col">
      <div className="flex flex-col items-center justify-center p-4 w-full flex-grow">
        <Card className="w-full max-w-[400px]">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Create Your Account
            </CardTitle>
            <p className="text-sm text-gray-500 font-medium text-center">
              Welcome! Please enter your details
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Full Name Input */}
                <FormField
                  control={form.control}
                  name="fullName"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Input */}
                <FormField
                  control={form.control}
                  name="email"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Input */}
                <FormField
                  control={form.control}
                  name="password"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={viewPassword ? "text" : "password"}
                            placeholder="Enter password"
                            {...field}
                          />
                          <span
                            onClick={togglePasswordView}
                            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                          >
                            {viewPassword ? <FaRegEye /> : <FaEyeSlash />}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? "Loading..." : "Sign Up"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <p className="text-sm text-gray-500 mt-4 text-center">
              Already have an account?{" "}
              <Link to={"/login"} className="hover:underline font-semibold">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
