import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { isAuth } from "src/service";
import { UserType } from "src/types";

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserType | null;
  error: string | null;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = async () => {
      setIsLoading(true);
      const user = await isAuth();
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setUser(user);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
