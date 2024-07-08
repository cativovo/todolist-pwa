import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputPassword } from "@/components/ui/input";
import { useLogin, useSignup } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useForm, useFormState } from "react-hook-form";
import { isStrongPassword } from "validator";
import { z } from "zod";

export const Route = createFileRoute("/signup")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: Login,
  async beforeLoad({ context, search }) {
    if (context.user) {
      throw redirect({
        to: search.redirect || "/todos",
        replace: true,
      });
    }
  },
});

const strongPasswordOptions = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const passwordRequirements = [
  `Minimum length of ${strongPasswordOptions.minLength}`,
  `At least ${strongPasswordOptions.minLowercase} lowercase letter.`,
  `At least ${strongPasswordOptions.minUppercase} uppercase letter.`,
  `At least ${strongPasswordOptions.minNumbers} number.`,
  `At least ${strongPasswordOptions.minSymbols} symbol.`,
];

const SignupFormSchema = z
  .object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    password: z
      .string()
      .refine((val) => isStrongPassword(val, strongPasswordOptions)),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
type SignupFormSchema = z.infer<typeof SignupFormSchema>;

function Login(): JSX.Element {
  const router = useRouter();
  const mutation = useSignup();
  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(SignupFormSchema),
  });
  const formState = useFormState({ control: form.control });

  function handleSubmit(values: SignupFormSchema) {
    mutation.mutate(values, {
      onSuccess() {
        router.invalidate();
      },
    });
  }

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");
  const isPasswordValid = !form.getFieldState("password").error;
  const buttonsDisabled = mutation.isPending || mutation.isSuccess;
  const hasError = Object.values(formState.errors).length > 0;

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className="flex flex-col gap-3">
              <FormField
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password:</FormLabel>
                    <FormControl>
                      <InputPassword
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          if (confirmPassword) {
                            form.trigger();
                          }
                        }}
                      />
                    </FormControl>
                    {!isPasswordValid && (
                      <ul className="list-inside list-disc">
                        {passwordRequirements.map((v) => (
                          <li
                            key={v}
                            className="text-[0.8rem] font-medium text-destructive"
                          >
                            {v}
                          </li>
                        ))}
                      </ul>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password:</FormLabel>
                    <FormControl>
                      <InputPassword
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          if (password) {
                            form.trigger();
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button type="submit" disabled={buttonsDisabled || hasError}>
                {mutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign up
              </Button>
              <Link
                to="/login"
                className={cn(buttonVariants({ variant: "link" }))}
                disabled={buttonsDisabled}
              >
                Login
              </Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
