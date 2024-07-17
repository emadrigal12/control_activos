import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function BillingRow(props) {
  const {
    ubicacion,
    observaciones,
    estado,
    descripcion,
    modelo,
    marca,
    tipo,
    activoNum,
    responsable,
  } = props;

  return (
    <Box p="24px" bg="#3D3D3D" my="22px" borderRadius="20px">
      <Flex justify="space-between" w="100%" align="flex-start">
        <Flex direction="column" maxW="70%">
          <Text color="#fff" fontSize="sm" mb="10px">
            Ejemplo de Activo
          </Text>
          <Text color="gray.400" fontSize="xs">
            Ubicación: {window.innerWidth < 768 ? <br /> : null}
            <Text as="span" color="gray.500">
              {ubicacion}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="xs">
            Responsable: {window.innerWidth < 768 ? <br /> : null}
            <Text as="span" color="gray.500">
              {responsable}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="xs">
            Activo #:{" "}
            <Text as="span" color="gray.500">
              {activoNum}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="xs">
            Tipo:{" "}
            <Text as="span" color="gray.500">
              {tipo}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="xs">
            Marca:{" "}
            <Text as="span" color="gray.500">
              {marca}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="xs">
            Modelo:{" "}
            <Text as="span" color="gray.500">
              {modelo}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="xs">
            Descripción:{" "}
            <Text as="span" color="gray.500">
              {descripcion}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="xs">
            Estado:{" "}
            <Text as="span" color="gray.500">
              {estado}
            </Text>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default BillingRow;
