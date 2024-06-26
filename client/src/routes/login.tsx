import { login, me } from "@/api/auth";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: Login,
  async beforeLoad({ context, search }) {
    if (context.user) {
      throw redirect({
        to: search.redirect || "/",
        replace: true,
      });
    }
  },
});

const LoginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});
type LoginFormSchema = z.infer<typeof LoginFormSchema>;

function Login(): JSX.Element {
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess() {
      router.invalidate();
    },
  });
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
  });

  function handleSubmit(values: LoginFormSchema) {
    mutation.mutate(values);
  }

  const buttonsDisabled = mutation.isPending || mutation.isSuccess;

  return (
    <div className="flex items-center justify-center h-screen">
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
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password:</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
              <Button type="submit" disabled={buttonsDisabled}>
                {mutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
              </Button>
              {/* TODO: redirect to signup page */}
              <Button type="button" disabled={buttonsDisabled}>
                Sign up
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
