import {
  Flex,
  Icon,
  Td,
  Text,
  Tr,
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
  ModalFooter,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "hooks/AuthContext";

// Icons
import { MdModeEdit } from "react-icons/md";

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

  // Manejo de los permisos de usuario
  const { userRole } = useContext(AuthContext);
  const allowedRoles = [1, 2];
  const isRoleAllowed = allowedRoles.includes(userRole);

  // USO DEL HOOK PARA OBTENER LOS DATOS DE UN PROYECTO POR ID
  const { data: ProyectoData } = useFetchData(
    `http://localhost:4000/proyecto/${props.Id}`
  );

  // USO DEL HOOK PARA ACTUALIZAR LOS DATOS DE UN PROYECTO
  const { putData } = usePut(`http://localhost:4000/proyectos/${props.Id}`);

  // USO DEL HOOK PARA FINALIZAR UN PROYECTO
  const { putData: putFinalizar } = usePut(
    `http://localhost:4000/proyectos/${props.Id}/finalizar`
  );

  // USO DEL HOOK PARA CANCELAR UN PROYECTO
  const { putData: putCancelar } = usePut(
    `http://localhost:4000/proyectos/${props.Id}/cancelar`
  );

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
    onClose();
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

  // Función para manejar la finalización del Proyecto
  const handleFinalizar = async () => {
    onClose();
    const success = await putFinalizar();
    if (success) {
      props.onDeleteSuccess(Id);
      toast({
        title: "Proyecto Finalizado",
        description: `El Proyecto ha sido finalizado exitosamente.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error al finalizar",
        description:
          "Hubo un problema al intentar finalizar el proyecto. Por favor, intenta de nuevo más tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Función para manejar la cancelación del Proyecto
  const handleCancelar = async () => {
    onClose();
    const success = await putCancelar();
    if (success) {
      props.onDeleteSuccess(Id);
      toast({
        title: "Proyecto Cancelado",
        description: `El Proyecto ha sido cancelado exitosamente.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error al cancelar",
        description:
          "Hubo un problema al intentar cancelar el proyecto. Por favor, intenta de nuevo más tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Modal Editar Proyecto
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const cancelRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const {
    isOpen: isOpenAlertFinalizar,
    onOpen: onOpenAlertFinalizar,
    onClose: onCloseAlertFinalizar,
  } = useDisclosure();

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
          {isRoleAllowed && (
            <Button
              size="sm"
              maxW={"105px"}
              rightIcon={<MdModeEdit />}
              colorScheme="orange"
              variant="outline"
              _hover={{ bg: "#353535" }}
              _active={{ bg: "#424242" }}
              onClick={() => {
                onEditClick(props.Id);
                onOpen();
              }}
            >
              <Text
                fontSize="sm"
                color="gray.300"
                fontWeight="bold"
                cursor="pointer"
              >
                Modificar
              </Text>
            </Button>
          )}
        </Flex>
      </Td>
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
              <FormLabel color={"orange.300"}>Descripción</FormLabel>
              <Input
                name="Descripcion"
                placeholder="Descripción o nombre del proyecto"
                value={formData.Descripcion}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"orange.300"}>Fecha de Inicio</FormLabel>
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
              <FormLabel color={"orange.300"}>Fecha de Finalización</FormLabel>
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
              Actualizar
            </Button>
            <Button colorScheme="brand" mr={3} onClick={onOpenAlertFinalizar}>
              Finalizar
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              mr={3}
              _hover={{ bg: "blackAlpha.300" }}
              _active={{ bg: "blackAlpha.400" }}
              onClick={onOpenAlert}
            >
              Cancelar Proyecto
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* AlertDialog para finalizar proyecto */}
      <AlertDialog
        isOpen={isOpenAlertFinalizar}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlertFinalizar}
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            bg="linear-gradient(90deg, rgba(46,46,46) 42%, rgba(47,47,47) 71%)"
            color="white"
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Finalizar Proyecto
            </AlertDialogHeader>

            <AlertDialogBody>
              Estás seguro que deseas finalizar este proyecto?
              <span style={{ fontSize: "13px", color: "gray" }}>
                <br /> (Esta acción no se podrá revertir)
              </span>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onCloseAlertFinalizar}
                bg="#4f4f4f"
                color="white"
                _hover={{ bg: "#3f3f3f" }}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onCloseAlert();
                  onClose();
                  handleFinalizar();
                }}
                ml={3}
              >
                Finalizar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* AlertDialog para cancelar proyecto */}
      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            bg="linear-gradient(90deg, rgba(46,46,46) 42%, rgba(47,47,47) 71%)"
            color="white"
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancelar Proyecto
            </AlertDialogHeader>

            <AlertDialogBody>
              Estás seguro que deseas cancelar este proyecto?
              <span style={{ fontSize: "13px", color: "gray" }}>
                <br /> (Esta acción no eliminará el proyecto de la base de
                datos)
              </span>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onCloseAlert}
                bg="#4f4f4f"
                color="white"
                _hover={{ bg: "#3f3f3f" }}
              >
                Volver
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onCloseAlert();
                  onClose();
                  handleCancelar();
                }}
                ml={3}
              >
                Cancelar Proyecto
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Tr>
  );
}

export default DashboardTableRow;
