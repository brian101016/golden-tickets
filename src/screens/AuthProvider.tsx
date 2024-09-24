import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "App";

// #region ##################################################################################### CONTEXT
type AuthContextProps = {
  user: typeof auth.currentUser;
  loading: boolean;
};
const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
});
// #endregion

// #region ##################################################################################### COMPONENT
const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------------------------------- WATCH FOR AUTH CHANGES
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((uu) => {
      setUser(uu);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ---------------------------------------------------------------------- RETURN
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};
// #endregion

// #region ##################################################################################### EXPORTS
export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
// #endregion
