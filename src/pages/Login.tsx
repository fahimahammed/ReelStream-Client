import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { loginValidationSchema } from "@/schema/login.validation";
import Logo from "@/assets/Logo";
import { NavLink, useLocation, useNavigate } from "react-router";
import { loginUser } from "@/services/auth.api";
import { useUser } from "@/hooks/user";
import regImage from "@/assets/reg.webp";

export default function Login() {
  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const redirect_url = location.state?.from?.pathname || "/profile";

  const {
    formState: { isSubmitting },
  } = form || {};

  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoading } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res.message);
        navigate(redirect_url, { replace: true });
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen container mx-auto gap-10">
      <div>
        <img src={regImage} alt="Register Illustration" className="w-full h-auto" />
      </div>
      <div className="border-2 rounded-xl flex-grow max-w-md w-full p-5 bg-background">
        <div className="flex items-center space-x-2 mb-2">
          <Logo width={50} fill="#fff" />
          <div>
            <h1 className="text-xl font-semibold">Welcome Back to ReelStream!</h1>
            <p className="font-extralight text-sm text-white/60">Log in to explore and stream endless reels.</p>
          </div>
        </div>
        <hr className="mb-4" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <Button type="submit" className="mt-5 w-full">
              {isSubmitting ? "Processing..." : "Login"}
            </Button>
          </form>
        </Form>
        <p className="text-sm text-white/60 text-center my-3">
          Don&apos;t have any account?
          <NavLink to="/register" className="text-primary ml-1">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}
