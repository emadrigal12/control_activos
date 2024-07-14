import { useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";

const createEntity = async (data) => {
  console.log("Objeto a crear:", data);
  const response = await fetch("https://...", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Error al crear la entidad");
  }
  return response.json();
};

export const useCreateEntity = () => {
  const toast = useToast();

  return useMutation(createEntity, {
    onSuccess: () => {
      toast({
        title: "Dato Enviado exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Ocurrio un error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
};
