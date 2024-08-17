import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "hooks/AuthContext";

// Icons
import { ArrowForwardIcon } from "@chakra-ui/icons";

// Hooks
import useFetchData from "hooks/useFetchData";
import useDeleteData from "hooks/useDeleteData";
import { usePost } from "hooks/usePostData";

function TablesTableRow(props) {
  const {
    Id,
    imagen,
    Descripcion,
    email,
    subdomain,
    Ubicacion,
    En_Uso,
    Depreciado,
    lastItem,
    Responsable,
    Activo_Num,
    Cantidad,
    Tipo,
    Marca,
    onModificarClick,
    selectedProjectId,
  } = props;
  const colorStatus = useColorModeValue("white", "gray.400");

  // Manejo de los permisos de usuario
  const { userRole } = useContext(AuthContext);
  const allowedRoles = [1, 2];
  const isRoleAllowed = allowedRoles.includes(userRole);

  // USO DEL HOOK PARA OBTENER LOS DATOS DE UN ARTÍCULO
  const { data } = useFetchData(`http://localhost:4000/articulos/${Id}`);

  // USO DEL HOOK PARA ACTUALIZAR LA CANTIDAD DE UN ARTÍCULO EN EL PROYECTO
  const { postData } = usePost(
    `http://localhost:4000/reducir-cantidad-activos/${selectedProjectId}/${props.Id}`
  );

  // USO DEL HOOK PARA ELIMINAR UN ARTÍCULO
  const deleteUrl = `http://localhost:4000/proyectos/eliminar-activo/${selectedProjectId}/${props.Id}`;
  const { deleteItem } = useDeleteData(deleteUrl);

  // Toast para mostrar mensajes de éxito o error
  const toast = useToast();

  // Se inicializa el estado del formulario
  const [formData, setFormData] = useState({
    cantidad: "",
  });

  // Se actualiza el estado del formulario con los datos del artículo
  useEffect(() => {
    if (data) {
      setFormData({
        cantidad: props.Cantidad,
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
    const dataToSend = {
      cantidad: formData.cantidad,
    };

    const success = await postData(dataToSend);
    if (success) {
      props.onDeleteSuccess(Id);
      toast({
        title: "Elemento actualizado",
        description: `El Artículo ha sido actualizado correctamente.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Cierra el modal
    } else {
      toast({
        title: "Error al actualizar",
        description:
          "Hubo un problema al intentar actualizar el artículo. Por favor, intenta de nuevo más tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Función para manejar la eliminación de un artículo
  const handleDelete = async () => {
    const success = await deleteItem();

    if (success) {
      props.onDeleteSuccess(Id);
      toast({
        title: "Elemento eliminado",
        description: `El activo ha sido eliminado correctamente.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error al eliminar",
        description: `Hubo un problema al intentar eliminar el elemento con ID ${Id}. Por favor, intenta de nuevo más tarde.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Tr>
        <Td
          minWidth={{ sm: "250px" }}
          ps="0px"
          border={lastItem ? "none" : null}
          borderBottomColor="#56577A"
        >
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Avatar
              src={imagen}
              w="50px"
              borderRadius="12px"
              me="18px"
              border="none"
            />
            <Flex direction="column">
              <Text
                fontSize="sm"
                color="#fff"
                fontWeight="normal"
                minWidth="100%"
              >
                {Descripcion}
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {email}
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {Responsable}
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {Activo_Num}
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {Tipo}
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {Marca}
              </Text>
            </Flex>
          </Flex>
        </Td>

        <Td
          border={lastItem ? "none" : null}
          borderBottomColor="#56577A"
          minW="150px"
        >
          <Flex direction="column">
            <Text fontSize="sm" color="#fff" fontWeight="normal">
              {Ubicacion}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {subdomain}
            </Text>
          </Flex>
        </Td>
        <Td border={lastItem ? "none" : null} borderBottomColor="#56577A">
          <Badge
            bg={En_Uso === "Disponible" ? "green.400" : "transparent"}
            color={En_Uso === "Disponible" ? "white" : colorStatus}
            fontSize="sm"
            p="3px 10px"
            borderRadius="8px"
            border={En_Uso === "Disponible" ? "none" : "1px solid #fff"}
            fontWeight="normal"
          >
            {En_Uso}
          </Badge>
        </Td>
        <Td border={lastItem ? "none" : null} borderBottomColor="#56577A">
          <Text fontSize="sm" color="#fff" fontWeight="normal">
            {Depreciado}
          </Text>
        </Td>
        <Td border={lastItem ? "none" : null} borderBottomColor="#56577A">
          <Text fontSize="sm" color="#fff" fontWeight="normal">
            {Cantidad}
          </Text>
        </Td>
        {isRoleAllowed && (
          <Td border={lastItem ? "none" : null} borderBottomColor="#56577A">
            <Button
              rightIcon={<ArrowForwardIcon />}
              size="sm"
              bg="brand.400"
              _hover={{ opacity: "0.8" }}
              _active={{ opacity: "0.9" }}
              onClick={() => {
                onModificarClick(props.Id, props.cantidad);
                onOpen();
              }}
            >
              <Text
                fontSize="sm"
                color="gray.200"
                fontWeight="bold"
                cursor="pointer"
              >
                Modificar
              </Text>
            </Button>
          </Td>
        )}
      </Tr>
      {/* Modal */}
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
          <ModalHeader>Cantidad Asignada al Proyecto</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Ingrese la nueva cantidad</FormLabel>
              <Input
                name="cantidad"
                type="number"
                value={formData.cantidad}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={handleSave}>
              Guardar
            </Button>
            <Button onClick={onOpenAlert} variant="ghost" colorScheme="red">
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
              Eliminar Activo del Proyecto
            </AlertDialogHeader>

            <AlertDialogBody>
              Estás seguro que deseas eliminar este activo?
              <span style={{ fontSize: "13px", color: "gray" }}>
                <br /> (Esta acción no eliminará el activo de la base de datos)
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
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onCloseAlert();
                  onClose();
                  handleDelete();
                }}
                ml={3}
              >
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default TablesTableRow;
