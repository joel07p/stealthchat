import { createContext, PropsWithChildren, useContext, useState } from 'react';

type AuthContextType = {
    signedIn: boolean;
    setSignedInState: (state: boolean) => void;
}  

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const setSignedInState = (state: boolean) => {
    setSignedIn(state)
  }

  return <AuthContext.Provider value={{signedIn, setSignedInState}}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};