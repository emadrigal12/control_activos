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
} from "@chakra-ui/react";
import React from "react";

function TablesTableRow(props) {
  const {
    logo,
    name,
    email,
    subdomain,
    domain,
    status,
    date,
    lastItem,
    Responsable,
    ActivoNum,
    Tipo,
    Marca,
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

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
              src={logo}
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
                {name}
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {email}
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {Responsable}
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {ActivoNum}
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
              {domain}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {subdomain}
            </Text>
          </Flex>
        </Td>
        <Td border={lastItem ? "none" : null} borderBottomColor="#56577A">
          <Badge
            bg={status === "Disponible" ? "green.400" : "transparent"}
            color={status === "Disponible" ? "white" : colorStatus}
            fontSize="sm"
            p="3px 10px"
            borderRadius="8px"
            border={status === "Disponible" ? "none" : "1px solid #fff"}
            fontWeight="normal"
          >
            {status}
          </Badge>
        </Td>
        <Td border={lastItem ? "none" : null} borderBottomColor="#56577A">
          <Text fontSize="sm" color="#fff" fontWeight="normal">
            {date}
          </Text>
        </Td>
        <Td border={lastItem ? "none" : null} borderBottomColor="#56577A">
          <Button p="0px" bg="transparent" variant="no-hover" onClick={onOpen}>
            <Text
              fontSize="sm"
              color="gray.400"
              fontWeight="bold"
              cursor="pointer"
            >
              Editar
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
          <ModalHeader>Editar Activo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Ubicación</FormLabel>
              <Input ref={initialRef} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Activo #</FormLabel>
              <Input />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tipo</FormLabel>
              <Select>
                <option style={{ color: "black" }} value="Por Definir">
                  Por Definir
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
              <Input />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Modelo</FormLabel>
              <Input />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Descripción</FormLabel>
              <Input />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Estado</FormLabel>
              <Stack spacing={5} direction="row">
                <Checkbox colorScheme="orange">En Uso</Checkbox>
                <Checkbox colorScheme="orange">Depreciado</Checkbox>
              </Stack>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Observaciones</FormLabel>
              <Textarea maxH={130} />
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
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onCloseAlert();
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default TablesTableRow;
