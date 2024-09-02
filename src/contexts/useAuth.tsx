import axios from "@/lib/axios";
import Loading from "@/components/loading";
import { useToast } from "@/components/ui/use-toast";
import { deleteCookie, setCookie } from "cookies-next";
import type { UserInterface } from "@/interfaces/user-interface";
import type { RegisterAdministratorsSchemaFormProps, signInUserSchemaFormProps } from "@/validations/user-validate";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { AdministratorsInterface } from "@/interfaces/administrators-interface";

export interface LoginInterface {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: UserInterface;
  login: (data: signInUserSchemaFormProps) => Promise<UserInterface | void>;
  logout: () => void;
  adminStore: (payload: RegisterAdministratorsSchemaFormProps) => Promise<AdministratorsInterface>;
  adminList: () => Promise<AdministratorsInterface>;
}

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { data: user, mutate } = useSWR("/api/profile", async () => {
    try {
      const response = await axios.get("/api/profile");
      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar usuário:", error);
      if (error.response?.status === 401) {
        deleteCookie("auth_token");
      }
      throw error;
    }
  });

  const adminList = useCallback(
    async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/administrators`);

        return response.data;
      } catch (error) {
        toast({
          title: "Falha ao tentar listar!",
          description: "Não foi possivel listar administradores",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const adminStore = useCallback(
    async (payload: RegisterAdministratorsSchemaFormProps) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `api/register/`,
          payload
        );
        toast({
          title: "Novo Administrador",
          description: "Cadastrado com sucesso",
        });
        return response.data.data;
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const login = useCallback(
    async (data: signInUserSchemaFormProps) => {
      try {
        setLoading(true);
        const response = await axios.post("/api/login", data);

        if (response.status !== 200) throw new Error("Falha ao efetuar login");

        setCookie("auth_token", response.data.access_token);
        mutate();
        return response.data;
      } catch (error: any) {
        toast({
          title: "Falha ao efetuar login",
          description: error?.response?.data?.message,
        });
      } finally {
        setLoading(false);
      }
    },
    [mutate, toast]
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/logout");
      if (response.status === 200) {
        deleteCookie("auth_token");
        router.push("/");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [router]);

  const values = {
    user,
    adminStore,
    adminList,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={values}>
      {loading && <Loading />}
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
