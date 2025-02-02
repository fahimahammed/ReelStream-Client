import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
  FormField,
} from "@/components/ui/form";
import regImage from "@/assets/reg.webp";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { NavLink, useNavigate } from "react-router";
import { registerValidationSchema } from "@/schema/register.validation";
import Logo from "@/assets/Logo";
import { registerUser } from "@/services/auth.api";

export default function Register() {
  const form = useForm({
    resolver: zodResolver(registerValidationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form || {};

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      if (res.success) {
        toast.success(res.message);
        navigate("/login");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen container mx-auto gap-10">
      <div>
        <img src={regImage} alt="Register Illustration" className="w-full h-auto" />
      </div>
      <div className="border-2  rounded-xl flex-grow max-w-md w-full p-5 bg-background">
        <div className="flex items-center space-x-2 mb-2">
          <Logo width={100} fill="#fffff" />
          <div>
            <h1 className="text-xl font-semibold">Register</h1>
            <p className="font-extralight text-sm text-white/60">
              Become a part of the ReelStream community and explore endless reels!
            </p>
          </div>
        </div>
        <hr className="mb-4" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        value={field.value || ""}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-0 -translate-y-1/2"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-5 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Register"}
            </Button>
          </form>
        </Form>
        <p className="text-sm text-white/60 text-center my-3">
          Already have an account?
          <NavLink to="/login" className="text-primary ml-1">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}
