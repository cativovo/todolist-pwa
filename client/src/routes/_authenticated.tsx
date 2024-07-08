import { logout } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setUser } from "@/lib/user";
import { useMutation } from "@tanstack/react-query";
import {
  Outlet,
  createFileRoute,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/_authenticated")({
  component: Authenticated,
  beforeLoad({ context }) {
    if (!context.user) {
      throw redirect({
        to: "/login",
        replace: true,
      });
    }
  },
});

function Authenticated() {
  const router = useRouter();
  const context = Route.useRouteContext();
  const mutation = useMutation({
    mutationFn: logout,
    async onSettled() {
      setUser(null);
      await router.invalidate();
      context.queryClient.clear();
      context.user = null;
    },
  });

  function handleLogout() {
    mutation.mutate();
  }

  if (!context.user) {
    return <p>logging out...</p>;
  }

  return (
    <>
      <div className="p-2 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="inline-flex gap-1 p-2" variant="outline">
              <span>{context.user.username}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuCheckboxItem
              className="cursor-pointer"
              onSelect={handleLogout}
            >
              Logout
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Outlet />
    </>
  );
}
