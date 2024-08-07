import {
  Flex,
  Icon,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

// Hooks
import useFetchData from "hooks/useFetchData";
import usePut from "hooks/usePut";

function DashboardTableRow(props) {
  const {
    Id,
    logo,
    Descripcion,
    Fecha_Inicio,
    Fecha_Fin,
    lastItem,
    onEditClick,
  } = props;

  // USO DEL HOOK PARA OBTENER LOS DATOS DE UN PROYECTO POR ID
  const handleEditProyectClick = (id) => {
    console.log("Editando proyecto con id: ", id);
    onOpenEdit();
  };
  const { data } = useFetchData(`http://localhost:4000/articulos/${Id}`);

  // USO DEL HOOK PARA ACTUALIZAR LOS DATOS DE UN PROYECTO
  const { putData } = usePut(`http://localhost:4000/articulos/${Id}`);

  // Se inicializa el estado del formulario
  const [formData, setFormData] = useState({
    Descripcion: "",
    Fecha_Inicio: "",
    Fecha_Fin: "",
  });
  // Se actualiza el estado del formulario con los datos del proyecto
  useEffect(() => {
    if (data) {
      setFormData({
        Descripcion: "",
        Fecha_Inicio: "",
        Fecha_Fin: "",
        Estado: "",
      });
    }
  }, [data]);

  // Función para manejar los cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar la actualización del artículo
  const handleSave = async () => {
    console.log("Guardando...");
  };

  // Modal Editar Proyecto
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        ps="0px"
        borderBottomColor="#56577A"
        border={lastItem ? "none" : null}
      >
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Icon as={logo} h={"24px"} w={"24px"} me="18px" />
          <Text fontSize="sm" color="#fff" fontWeight="normal" minWidth="100%">
            {Descripcion}
          </Text>
        </Flex>
      </Td>

      <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
        <Text fontSize="sm" color="#fff" fontWeight="bold" pb=".5rem">
          {Fecha_Inicio}
        </Text>
      </Td>
      <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
        <Text fontSize="sm" color="#fff" fontWeight="bold" pb=".5rem">
          {Fecha_Fin}
        </Text>
      </Td>
      <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
        <Flex direction="column">
          <Button
            p="0px"
            colorScheme="orange"
            size="sm"
            direction="row"
            align="center"
            maxW={"100px"}
            variant="outline"
            spacing={4}
            _hover={{ opacity: "0.8" }}
            _active={{ opacity: "0.9" }}
          >
            Seleccionar
          </Button>
        </Flex>
      </Td>
      <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
        <Flex direction="column">
          <Button
            p="0px"
            bg="transparent"
            variant="no-hover"
            onClick={() => {
              onEditClick(props.Id);
              onOpen();
            }}
          >
            <Text
              fontSize="sm"
              color="gray.400"
              fontWeight="bold"
              cursor="pointer"
            >
              Editar
            </Text>
          </Button>
        </Flex>
        {/* Editar Proyecto Modal */}
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent
            bg="linear-gradient(90deg, rgba(46,46,46) 42%, rgba(47,47,47) 71%)"
            color="white"
          >
            <ModalHeader>Editar Proyecto</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Descripción</FormLabel>
                <Input
                  name="Descripcion"
                  placeholder="Descripción o nombre del proyecto"
                  //onChange={handleInputChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Fecha de Inicio</FormLabel>
                <Input
                  name="Fecha_Inicio"
                  size="md"
                  type="date"
                  textColor="white"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Fecha de Finalización</FormLabel>
                <Input
                  name="Fecha_Fin"
                  size="md"
                  type="date"
                  textColor="white"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Estado</FormLabel>
                <Select
                  name="Estado"
                  value={formData.Tipo}
                  onChange={handleInputChange}
                >
                  <option style={{ color: "black" }} value="Activo">
                    Activo
                  </option>
                  <option style={{ color: "black" }} value="Inactivo">
                    Inactivo
                  </option>
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="brand" mr={3} onClick={handleSave}>
                Guardar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Td>
    </Tr>
  );
}

export default DashboardTableRow;
