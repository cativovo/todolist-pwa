import { login, logout, signup } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

const loginMutationKeys = ["login"];
const logoutMutationKeys = ["logout"];
const signupMutationKeys = ["signup"];

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

export function useSignup() {
  return useMutation({
    mutationKey: signupMutationKeys,
    mutationFn: signup,
  });
}
