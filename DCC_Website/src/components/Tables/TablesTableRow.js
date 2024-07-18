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
  Select,
  Stack,
  Checkbox,
  Textarea,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

// Hooks
import useFetchData from "hooks/useFetchData";
import useDeleteData from "hooks/useDeleteData";

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
    Tipo,
    Marca,
    onViewMoreClick,
  } = props;
  const colorStatus = useColorModeValue("white", "gray.400");

  const { data } = useFetchData(`http://localhost:4000/articulos/${Id}`);

  const deleteUrl = "http://localhost:4000/articulos";
  const { loading, error, deleteItem } = useDeleteData(deleteUrl);
  const toast = useToast();

  const handleDelete = async () => {
    const success = await deleteItem(Id);

    if (success) {
      props.onDeleteSuccess(Id);
      toast({
        title: "Elemento eliminado",
        description: `El elemento con ID ${Id} ha sido eliminado correctamente.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Aquí podrías agregar más lógica después de la eliminación exitosa
    } else {
      toast({
        title: "Error al eliminar",
        description: `Hubo un problema al intentar eliminar el elemento con ID ${Id}. Por favor, intenta de nuevo más tarde.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      // Manejo de errores
    }
  };
  const [enUsoChecked, setEnUsoChecked] = useState(false); // Estado inicial del checkbox 'En Uso'
  const [depreciadoChecked, setDepreciadoChecked] = useState(false); // Estado inicial del checkbox 'Depreciado'

  useEffect(() => {
    if (data) {
      setEnUsoChecked(data.En_Uso === 1);
      setDepreciadoChecked(data.Depreciado === 1);
    }
  }, [data]);

  const handleEnUsoChange = () => {
    setEnUsoChecked(!enUsoChecked); // Invierte el estado actual del checkbox 'En Uso'
  };

  const handleDepreciadoChange = () => {
    setDepreciadoChecked(!depreciadoChecked); // Invierte el estado actual del checkbox 'Depreciado'
  };

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
          <Button
            p="0px"
            bg="transparent"
            variant="no-hover"
            onClick={() => {
              onViewMoreClick(props.Id); // Aquí pasas el ID al hacer clic
              onOpen();
            }}
          >
            <Text
              fontSize="sm"
              color="gray.400"
              fontWeight="bold"
              cursor="pointer"
            >
              Ver Más
            </Text>
          </Button>
        </Td>
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
          <ModalHeader>Información de Activo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Ubicación</FormLabel>
              <Input value={data?.Ubicacion} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Activo #</FormLabel>
              <Input value={data?.Activo_Num} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tipo</FormLabel>
              <Select>
                <option style={{ color: "black" }} value={data?.Tipo}>
                  {data?.Tipo}
                </option>
                <option
                  style={{ color: "black" }}
                  value=" Mobiliario y Equipos"
                >
                  Mobiliario y Equipos
                </option>
                <option
                  style={{ color: "black" }}
                  value="Tecnología y Electrónica"
                >
                  Tecnología y Electrónica
                </option>
                <option
                  style={{ color: "black" }}
                  value="Herramientas y Utensilios"
                >
                  Herramientas y Utensilios
                </option>
                <option
                  style={{ color: "black" }}
                  value="Suministros de Oficina"
                >
                  Suministros de Oficina
                </option>
                <option style={{ color: "black" }} value="Equipos de Seguridad">
                  Equipos de Seguridad
                </option>
                <option
                  style={{ color: "black" }}
                  value="Materiales de Construcción"
                >
                  Materiales de Construcción
                </option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Marca</FormLabel>
              <Input value={data?.Marca} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Modelo</FormLabel>
              <Input value={data?.Modelo} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Descripción</FormLabel>
              <Input value={data?.Descripcion} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Estado</FormLabel>
              <Stack spacing={5} direction="row">
                <Checkbox
                  colorScheme="orange"
                  isChecked={enUsoChecked}
                  onChange={handleEnUsoChange}
                >
                  En Uso
                </Checkbox>
                <Checkbox
                  colorScheme="orange"
                  isChecked={depreciadoChecked}
                  onChange={handleDepreciadoChange}
                >
                  Depreciado
                </Checkbox>
              </Stack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="brand" mr={3}>
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
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar Activo
            </AlertDialogHeader>

            <AlertDialogBody>
              Estás seguro que deseas eliminar este activo?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
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
