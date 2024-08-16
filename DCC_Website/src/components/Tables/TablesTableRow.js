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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

// Icons
import { MdOutlineReadMore } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";

// Hooks
import useFetchData from "hooks/useFetchData";
import useDeleteData from "hooks/useDeleteData";
import usePut from "hooks/usePut";
import useUserData from "hooks/useUserData";
import { usePost } from "hooks/usePostData";

function TablesTableRow(props) {
  const [selectedProject, setSelectedProject] = React.useState(null);

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
    Cantidad_Total,
    Tipo,
    Marca,
    onViewMoreClick,
  } = props;
  const colorStatus = useColorModeValue("white", "gray.400");

  // USO DEL HOOK PARA OBTENER LOS DATOS DEL USUARIO
  const { userData } = useUserData();

  // USO DEL HOOK PARA OBTENER LOS DATOS DE UN ARTÍCULO
  const { data } = useFetchData(`http://localhost:4000/articulos/${Id}`);

  // USO DEL HOOK PARA ACTUALIZAR UN ARTÍCULO
  const { putData } = usePut(`http://localhost:4000/articulos/${Id}`);

  // USO DEL HOOK PARA ELIMINAR UN ARTÍCULO
  const deleteUrl = `http://localhost:4000/articulos/${Id}`;
  const { deleteItem } = useDeleteData(deleteUrl);

  // USO DEL HOOK PARA OBTENER LOS PROYECTOS
  const { data: dataProyectos, loading: loadingProyectos } = useFetchData(
    "http://localhost:4000/proyectos"
  );

  // USO DEL HOOK PARA ACTUALIZAR LA CANTIDAD DE UN ARTÍCULO EN EL PROYECTO
  const { postData } = usePost(
    "http://localhost:4000/proyectos/asignar-activo"
  );

  // Toast para mostrar mensajes de éxito o error
  const toast = useToast();

  // Estado para la cantidad de activos a asignar
  const [cantidad, setCantidad] = useState(0);

  // Función para manejar los cambios en los inputs de la cantidad de activos
  const handleInputCantidadChange = (e) => {
    const { name, value } = e.target;
    setCantidad((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Se inicializa el estado del formulario
  const [formData, setFormData] = useState({
    Ubicacion: "",
    Activo_Num: "",
    Tipo: "",
    Marca: "",
    Modelo: "",
    Descripcion: "",
    Cantidad_Total: "",
    En_Uso: false,
    Depreciado: false,
  });
  // Se actualiza el estado del formulario con los datos del artículo
  useEffect(() => {
    if (data) {
      setFormData({
        Ubicacion: data.Ubicacion,
        Activo_Num: data.Activo_Num,
        Tipo: data.Tipo,
        Marca: data.Marca,
        Modelo: data.Modelo,
        Descripcion: data.Descripcion,
        Cantidad_Total: data.Cantidad_Total,
        En_Uso: data.En_Uso === 1,
        Depreciado: data.Depreciado === 1,
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
  // Función para manejar los cambios en los checkboxes del formulario
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Función para manejar la actualización del artículo
  const handleSave = async () => {
    // Convertir En_Uso y Depreciado a valores numéricos
    const dataToSend = {
      ...formData,
      En_Uso: formData.En_Uso ? 1 : 0,
      Depreciado: formData.Depreciado ? 1 : 0,
      Id_Usuario: userData.Id_Usuario,
    };
    const success = await putData(dataToSend);
    if (success) {
      props.onDeleteSuccess(Id);
      toast({
        title: "Elemento actualizado",
        description: `El Articulo ha sido actualizado correctamente.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Cierra el modal
    } else {
      toast({
        title: "Error al actualizar",
        description:
          "Hubo un problema al intentar actualizar el articulo. Por favor, intenta de nuevo más tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Función para manejar la eliminación de un artículo
  const handleDelete = async () => {
    const success = await deleteItem(Id);

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

  // Función para manejar la asignación de activos a un proyecto
  const handleAsignarActivo = async () => {
    onCloseAsignar();
    const dataToSend = {
      proyectoId: selectedProject.Id,
      articuloId: props.Id,
      cantidad: cantidad.Cantidad,
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
        title: "Error al asignar",
        description: "El activo ya ha sido asignado a este proyecto.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleItemClick = (item) => {
    setSelectedProject(item);
    onCloseProyectos();
    onOpenAsignar();
  };

  // Modals
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const {
    isOpen: isOpenProyectos,
    onOpen: onOpenProyectos,
    onClose: onCloseProyectos,
  } = useDisclosure();
  const {
    isOpen: isOpenAsignar,
    onOpen: onOpenAsignar,
    onClose: onCloseAsignar,
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
            {Cantidad_Total}
          </Text>
        </Td>
        <Td border={lastItem ? "none" : null} borderBottomColor="#56577A">
          <Button
            p="0px"
            bg="transparent"
            variant="no-hover"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              _hover: {
                ".icon": {
                  transform: "scale(1.1)",
                },
              },
            }}
            onClick={() => {
              onViewMoreClick(props.Id); // Aquí se pasa el ID al hacer click
              onOpen();
            }}
          >
            <Text
              fontSize="sm"
              color="gray.300"
              fontWeight="bold"
              cursor="pointer"
              display="inline-flex"
              alignItems="center"
            >
              Ver Más
              <MdOutlineReadMore
                className="icon" // Añade esta clase para aplicar el estilo de hover
                size="30px"
                style={{
                  marginLeft: "2px",
                  color: "orange",
                  transition: "transform 0.2s ease-in-out", // Transición suave aplicada al ícono
                }}
              />
            </Text>
          </Button>
        </Td>
        <Td border={lastItem ? "none" : null} borderBottomColor="#56577A">
          <Button
            p="5px"
            bg="brand.200"
            _hover={{ opacity: "0.8" }}
            _active={{ opacity: "0.9" }}
            onClick={onOpenProyectos}
          >
            <Text
              fontSize="sm"
              color="gray.200"
              fontWeight="bold"
              cursor="pointer"
            >
              Asignar
            </Text>
          </Button>
        </Td>
      </Tr>
      {/* Modal para mostrar los proyectos disponibles */}
      <Modal isOpen={isOpenProyectos} onClose={onCloseProyectos}>
        <ModalOverlay />
        <ModalContent
          bg="linear-gradient(90deg, rgba(46,46,46) 42%, rgba(47,47,47) 71%)"
          color="white"
        >
          <ModalHeader>Seleccionar Proyecto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={3}>
              {dataProyectos.map((project) => (
                <ListItem
                  key={project.id}
                  onClick={() => handleItemClick(project)}
                  cursor="pointer"
                  textColor="white"
                  bg="blackAlpha.500"
                  p={5}
                  borderRadius="md"
                  _hover={{ bg: "blackAlpha.600" }}
                >
                  <ListIcon as={FaProjectDiagram} color="brand.300" />
                  {project.Descripcion}
                </ListItem>
              ))}
            </List>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal para asignar cantidad de activos a Proyecto */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenAsignar}
        onClose={onCloseAsignar}
      >
        <ModalOverlay />
        <ModalContent
          bg="linear-gradient(90deg, rgba(46,46,46) 42%, rgba(47,47,47) 71%)"
          color="white"
        >
          <ModalHeader>Cantidad de Activos</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Ingrese la cantidad a asignar</FormLabel>
              <Input name="Cantidad" onChange={handleInputCantidadChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={handleAsignarActivo}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal Para Mostrar Info del Activo*/}
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
              <Input
                name="Ubicacion"
                value={formData.Ubicacion}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Activo #</FormLabel>
              <Input
                name="Activo_Num"
                value={formData.Activo_Num}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tipo</FormLabel>
              <Select
                name="Tipo"
                value={formData.Tipo}
                onChange={handleInputChange}
              >
                <option style={{ color: "black" }} value={formData.Tipo}>
                  {formData.Tipo}
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
              <Input
                name="Marca"
                value={formData.Marca}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Modelo</FormLabel>
              <Input
                name="Modelo"
                value={formData.Modelo}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Descripción</FormLabel>
              <Input
                name="Descripcion"
                value={formData.Descripcion}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Cantidad</FormLabel>
              <Input
                name="Cantidad_Total"
                value={formData.Cantidad_Total}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Estado</FormLabel>
              <Stack spacing={5} direction="row">
                <Checkbox
                  name="En_Uso"
                  colorScheme="orange"
                  isChecked={formData.En_Uso}
                  onChange={handleCheckboxChange}
                >
                  En Uso
                </Checkbox>
                <Checkbox
                  name="Depreciado"
                  colorScheme="orange"
                  isChecked={formData.Depreciado}
                  onChange={handleCheckboxChange}
                >
                  Depreciado
                </Checkbox>
              </Stack>
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
              Eliminar Activo
            </AlertDialogHeader>

            <AlertDialogBody>
              Estás seguro que deseas eliminar este activo?
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
