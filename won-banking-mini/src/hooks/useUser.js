import { useContext } from "react";
import { AccountContext, UserContext } from "../contexts/contextDefinitions.js";

export function useUser() {
  return useContext(UserContext);
}

export function useAccount() {
  return useContext(AccountContext);
}