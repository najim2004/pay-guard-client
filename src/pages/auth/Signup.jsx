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
      full_name: "",
      email: "",
      password: "",
    },
  });
  if (authState?.token) {
    return <Navigate to="/" />;
  }
  const handleToast = (response) => {
    const defaultSuccessMessage = "Account created successfully";
    const defaultErrorMessage = "Failed to create account";

    if (response?.success) {
      toast({
        variant: "success",
        title: "Account Created",
        description: response.message || defaultSuccessMessage,
        duration: 3000,
      });
      navigator("/login", { replace: true });
    } else {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: response.message || defaultErrorMessage,
        duration: 3000,
      });
    }
  };

  const onSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.full_name,
        email: formData.email,
        password: formData.password,
      };

      const response = await onSignup(payload).unwrap();
      handleToast(response);
    } catch (error) {
      handleToast({
        success: false,
        message:
          error?.data?.message ||
          error.message ||
          "An unexpected error occurred",
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
                <FormField
                  control={form.control}
                  name="full_name"
                  rules={{
                    required: "Full name is required",
                    minLength: {
                      value: 3,
                      message: "Full name must be at least 3 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]*$/,
                      message: "Full name can only contain letters and spaces",
                    },
                    maxLength: {
                      value: 50,
                      message: "Full name cannot exceed 50 characters",
                    },
                  }}
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
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                    maxLength: {
                      value: 100,
                      message: "Email cannot exceed 100 characters",
                    },
                  }}
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
                <FormField
                  control={form.control}
                  name="password"
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                    },
                  }}
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
