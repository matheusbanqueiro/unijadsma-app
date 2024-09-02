"use client";

import Loading from "@/components/loading";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface ExampleContextProps {}

type ExampleProps = {
  children: ReactNode;
};

const ExampleContext = createContext({} as ExampleContextProps);

const ExampleProvider = ({ children }: ExampleProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const exampleIndex = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(``);

      toast({
        title: "Nome do Recurso",
        description: "Recurso cadastrado com sucesso",
      });

      return response.data;
    } catch (error) {
      toast({
        title: "Nome do Recurso",
        description: "Falha ao cadastrar",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const exampleStore = useCallback(
    async (payload: any) => {
      try {
        setLoading(true);
        const response = await axios.post(``, payload);

        toast({
          title: "Nome do Recurso",
          description: "Recurso cadastrado com sucesso",
        });

        return response.data;
      } catch (error) {
        toast({
          title: "Nome do Recurso",
          description: "Falha ao cadastrar",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const exampleUpdate = useCallback(
    async (uuid: string, payload: any) => {
      try {
        setLoading(true);
        const response = await axios.post(`${uuid}`, payload);

        toast({
          title: "Nome do Recurso",
          description: "Recurso atualizado com sucesso",
        });

        return response.data;
      } catch (error) {
        toast({
          title: "Nome do Recurso",
          description: "Falha ao atualizar",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const exampleShow = useCallback(
    async (uuid: string) => {
      try {
        setLoading(true);
        const response = await axios.get(`${uuid}`);

        toast({
          title: "Nome do Recurso",
          description: "Recurso encontrado com sucesso",
        });

        return response.data;
      } catch (error) {
        toast({
          title: "Nome do Recurso",
          description: "Falha ao buscar",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const exampleDestroy = useCallback(
    async (uuid: string) => {
      try {
        setLoading(true);
        const response = await axios.delete(`${uuid}`);

        toast({
          title: "Nome do Recurso",
          description: "Recurso excluido com sucesso",
        });

        return response.data;
      } catch (error) {
        toast({
          title: "Nome do Recurso",
          description: "Falha ao exluir",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const addItemOnList = useCallback(
    async (setItems: Dispatch<any>, newItem: any) => {
      setItems((prev: any | undefined) => {
        if (!prev) return prev;
        return { ...prev, data: [...prev.data, newItem] };
      });
    },
    []
  );

  const removeItemOnList = useCallback(
    async (setItems: Dispatch<any>, uuid: string) => {
      setItems((prev: any | undefined) => {
        if (!prev) return prev;
        return {
          ...prev,
          data: prev.data.filter((item: any) => item.uuid != uuid),
        };
      });
    },
    []
  );

  const updateItemOnList = useCallback(
    async (setReports: Dispatch<any>, itemUpdated: any) => {
      setReports((prev: any | undefined) => {
        if (!prev) return prev;
        return {
          ...prev,
          data: prev.data.map((item: any) => {
            if (item.uuid === itemUpdated.uuid) return itemUpdated;
            return item;
          }),
        };
      });
    },
    []
  );

  const values = {};

  return (
    <ExampleContext.Provider value={values}>
      {loading && <Loading />}
      {children}
    </ExampleContext.Provider>
  );
};

const useExample = () => {
  const context = useContext(ExampleContext);
  if (!context)
    throw new Error("useExample must be used within an HelpContext");
  return context;
};

export { useExample, ExampleProvider };
