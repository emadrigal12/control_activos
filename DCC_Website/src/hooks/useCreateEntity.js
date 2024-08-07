import { useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";

const createEntity = async ({ data, url }) => {
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Error al crear la entidad");
  }
  return response.json();
};

export const useCreateEntity = (resetForm) => {
  const toast = useToast();

  return useMutation(createEntity, {
    onSuccess: () => {
      toast({
        title: "Dato Enviado exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      resetForm();
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
