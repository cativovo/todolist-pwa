import { login, logout } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

const loginMutationKeys = ["login"];
const logoutMutationKeys = ["logout"];

export function useLogin() {
  return useMutation({
    mutationKey: loginMutationKeys,
    mutationFn: login,
  });
}

export function useLogout() {
  return useMutation({
    mutationKey: logoutMutationKeys,
    mutationFn: logout,
  });
}
