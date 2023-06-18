import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  FC,
} from "react";
import User from "../models/User/User";

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children, ...props }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
