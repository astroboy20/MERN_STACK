import { useContext } from "react";
import { AuthContext } from "../context/AutthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAutContext  must be used where it must be used");
  }
  return context;
};
