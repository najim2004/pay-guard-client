import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLoginMutation } from "@/redux/services/authApi";
import { useSelector } from "react-redux";

export const Login = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [onLogin, { isLoading }] = useLoginMutation();
  const { toast } = useToast();
  const navigator = useNavigate();
  const authState = useSelector((state) => state.auth);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  if (authState?.token) {
    return <Navigate to="/" />;
  }
  const handleToast = (response) => {
    const defaultSuccessMessage = "Successfully logged in to your account";
    const defaultErrorMessage = "Authentication failed. Please try again";

    if (response?.success) {
      toast({
        variant: "default",
        title: "Authentication Successful",
        description: response?.message || defaultSuccessMessage,
      });
      navigator("/");
    } else {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: response?.message || defaultErrorMessage,
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await onLogin({
        email: data?.email,
        password: data?.password,
      }).unwrap();
      handleToast(response);
    } catch (error) {
      console.error("Login Error:", error);
      handleToast({
        success: false,
        message:
          error?.data?.message ||
          error.message ||
          "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="bg-white w-full min-h-[calc(100vh-100px)] flex flex-col">
      <div className="flex flex-col items-center justify-center p-4 w-full flex-grow">
        <Card className="w-full max-w-[400px]">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Login In Your Account
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 font-medium text-center">
              Welcome Back! Please enter your details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: true,
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email format",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="yourname@gmail.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                            onClick={() => setViewPassword(!viewPassword)}
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
                  {isLoading ? "Loading..." : "Login"}
                </Button>
              </form>
            </Form>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Don&#39;t have an account?{" "}
              <Link to={"/signup"} className="hover:underline font-semibold">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
