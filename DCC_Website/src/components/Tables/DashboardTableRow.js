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
  useToast,
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
  const { data: ProyectoData } = useFetchData(
    `http://localhost:4000/proyecto/${props.Id}`
  );

  function ProyectoDataPrueba() {
    console.log(ProyectoData);
    console.log(props.Id);
  }

  // USO DEL HOOK PARA ACTUALIZAR LOS DATOS DE UN PROYECTO
  const { putData } = usePut(`http://localhost:4000/proyectos/${props.Id}`);

  // Toast para mostrar mensajes de éxito o error
  const toast = useToast();

  // Se inicializa el estado del formulario
  const [formData, setFormData] = useState({
    Descripcion: "",
    Fecha_Inicio: "",
    Fecha_Fin: "",
    Estado: "",
  });
  // Se actualiza el estado del formulario con los datos del proyecto
  useEffect(() => {
    if (ProyectoData) {
      setFormData({
        Descripcion: ProyectoData.Descripcion,
        Fecha_Inicio: ProyectoData.Fecha_Inicio,
        Fecha_Fin: ProyectoData.Fecha_Fin,
        Estado: ProyectoData.Estado,
      });
    }
  }, [ProyectoData]);

  // Función para manejar los cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar la actualización del Proyecto
  const handleSave = async () => {
    // Convertir En_Uso y Depreciado a valores numéricos
    const dataToSend = {
      ...formData,
    };
    const success = await putData(dataToSend);
    if (success) {
      props.onDeleteSuccess(Id);
      toast({
        title: "Elemento actualizado",
        description: `El Proyecto ha sido actualizado correctamente.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Cierra el modal
    } else {
      toast({
        title: "Error al actualizar",
        description:
          "Hubo un problema al intentar actualizar el proyecto. Por favor, intenta de nuevo más tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
          <Icon as={logo} h={"24px"} w={"24px"} me="18px" color="brand.300" />
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
                  value={formData.Descripcion}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Fecha de Inicio</FormLabel>
                <Input
                  name="Fecha_Inicio"
                  size="md"
                  type="date"
                  textColor="white"
                  value={formData.Fecha_Inicio}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Fecha de Finalización</FormLabel>
                <Input
                  name="Fecha_Fin"
                  size="md"
                  type="date"
                  textColor="white"
                  value={formData.Fecha_Fin}
                  onChange={handleInputChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="brand" mr={3} onClick={handleSave}>
                Guardar
              </Button>
              <Button colorScheme="brand" mr={3} onClick={onEditClick}>
                Finalizar
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                mr={3}
                _hover={{ bg: "blackAlpha.300" }}
                onClick={ProyectoDataPrueba}
              >
                Cancelar Proyecto
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Td>
    </Tr>
  );
}

export default DashboardTableRow;
