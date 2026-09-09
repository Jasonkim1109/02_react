import { UserContext, AccountContext } from "./contextDefinitions";

export function UserProvider({ user, children }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function AccountProvider({ status, children }) {
  return (
    <AccountContext.Provider value={{ status }}>
      {children}
    </AccountContext.Provider>
  );
}

