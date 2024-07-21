import { useLogin } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input, InputPassword } from "../ui/input";

const LoginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});
type LoginFormSchema = z.infer<typeof LoginFormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const mutation = useLogin();
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
  });

  function handleSubmit(values: LoginFormSchema) {
    mutation.mutate(values, {
      onSuccess() {
        router.invalidate();
      },
    });
  }

  const buttonsDisabled = mutation.isPending || mutation.isSuccess;

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} name="login">
          <CardContent className="flex flex-col gap-3">
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <InputPassword {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {mutation.error && (
              <p className="text-center text-sm text-red-600">
                Invalid username/password
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="submit" disabled={buttonsDisabled}>
              {mutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
            </Button>
            <Link
              to="/signup"
              className={cn(buttonVariants({ variant: "link" }))}
              disabled={buttonsDisabled}
            >
              Sign up
            </Link>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
