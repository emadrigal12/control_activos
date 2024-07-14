import React from "react";
import { useCreateEntity } from "../../hooks/useCreateEntity";
import { useState } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Spacer,
  Text,
  Input,
  Textarea,
  Stack,
  Checkbox,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GradientBorder from "components/GradientBorder/GradientBorder";
import BillingRow from "components/Tables/BillingRow";

// Icons
import { FaPencilAlt } from "react-icons/fa";

// Data
import { billingData } from "variables/general";

function Billing() {
  const [formData, setFormData] = React.useState({
    ubicacion: "",
    responsable: "",
    activoNum: "",
    tipo: "",
    marca: "",
    modelo: "",
    descripcion: "",
    enUso: "",
    depreciado: "",
    observaciones: "",
  });

  const [errors, setErrors] = useState({});
  const { mutate, isLoading } = useCreateEntity();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (
        !formData[key] &&
        key !== "enUso" &&
        key !== "depreciado" &&
        key !== "observaciones"
      ) {
        newErrors[key] = "Este campo es requerido";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      mutate(formData);
    }
  };

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Limpiar el error cuando se cambia el valor del campo
    }));
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} mx="auto">
      <Grid templateColumns={{ sm: "1fr", lg: "60% 38%" }}>
        <Box>
          {/* Form para Ingresar Activos */}
          <Card>
            <form onSubmit={handleSubmit}>
              <Flex
                justify="space-between"
                align="center"
                minHeight="60px"
                w="100%"
                borderBottom="2px solid #595254"
                mb={5}
              >
                <Text fontSize="xl" color="#fff" fontWeight="bold">
                  Ingreso de Activos
                </Text>
              </Flex>
              <Grid
                templateColumns={{
                  sm: "1fr",
                  md: "1fr 1fr",
                }}
                gap={{ sm: "0px", md: "20px" }}
              >
                {/* Inputs */}
                <Box>
                  <FormControl isInvalid={errors.ubicacion}>
                    <Box>
                      <Flex
                        justify="space-between"
                        align="center"
                        minHeight="25px"
                        w="100%"
                      >
                        <FormLabel
                          fontSize="lg"
                          color="#fff"
                          fontWeight="normal"
                        >
                          Ubicación
                        </FormLabel>
                      </Flex>
                    </Box>
                    <CardBody>
                      <Flex
                        direction={{ sm: "column", md: "row" }}
                        align="center"
                        w="100%"
                        justify="center"
                        py="1rem"
                      >
                        <GradientBorder
                          mb={{ sm: "24px", md: "0px" }}
                          me={{ sm: "0px", md: "24px" }}
                          w="100%"
                          borderRadius="20px"
                        >
                          <Flex
                            p="5px"
                            bg="rgb(61, 61, 61)"
                            border="transparent"
                            borderRadius="20px"
                            align="center"
                            w="100%"
                          >
                            <Input
                              id="ubicacion"
                              name="ubicacion"
                              value={formData.ubicacion}
                              onChange={handleChange}
                              placeholder="Indicar la Ubicación"
                              _focus={{ border: "none", boxShadow: "none" }}
                              border="0px"
                              color="white"
                            ></Input>
                            <Spacer />
                          </Flex>
                        </GradientBorder>
                      </Flex>
                    </CardBody>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isInvalid={errors.responsable}>
                    <Box>
                      <Flex
                        justify="space-between"
                        align="center"
                        minHeight="25px"
                        w="100%"
                      >
                        <FormLabel
                          fontSize="lg"
                          color="#fff"
                          fontWeight="normal"
                        >
                          Responsable
                        </FormLabel>
                      </Flex>
                    </Box>
                    <CardBody>
                      <Flex
                        direction={{ sm: "column", md: "row" }}
                        align="center"
                        w="100%"
                        justify="center"
                        py="1rem"
                      >
                        <GradientBorder
                          mb={{ sm: "24px", md: "0px" }}
                          me={{ sm: "0px", md: "24px" }}
                          w="100%"
                          borderRadius="20px"
                        >
                          <Flex
                            p="5px"
                            bg="rgb(61, 61, 61)"
                            border="transparent"
                            borderRadius="20px"
                            align="center"
                            w="100%"
                          >
                            <Input
                              id="responsable"
                              name="responsable"
                              _focus={{ border: "none", boxShadow: "none" }}
                              border="0px"
                              color="white"
                              placeholder="Indicar el Responsable"
                              value={formData.responsable}
                              onChange={handleChange}
                            ></Input>
                            <Spacer />
                            <Button
                              p="0px"
                              bg="transparent"
                              w="16px"
                              h="16px"
                              variant="no-hover"
                            >
                              <Icon
                                as={FaPencilAlt}
                                color="#fff"
                                w="12px"
                                h="12px"
                              />
                            </Button>
                          </Flex>
                        </GradientBorder>
                      </Flex>
                    </CardBody>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isInvalid={errors.activoNum}>
                    <Box>
                      <Flex
                        justify="space-between"
                        align="center"
                        minHeight="25px"
                        w="100%"
                      >
                        <FormLabel
                          fontSize="lg"
                          color="#fff"
                          fontWeight="normal"
                        >
                          Activo #
                        </FormLabel>
                      </Flex>
                    </Box>
                    <CardBody>
                      <Flex
                        direction={{ sm: "column", md: "row" }}
                        align="center"
                        w="100%"
                        justify="center"
                        py="1rem"
                      >
                        <GradientBorder
                          mb={{ sm: "24px", md: "0px" }}
                          me={{ sm: "0px", md: "24px" }}
                          w="100%"
                          borderRadius="20px"
                        >
                          <Flex
                            p="5px"
                            bg="rgb(61, 61, 61)"
                            border="transparent"
                            borderRadius="20px"
                            align="center"
                            w="100%"
                          >
                            <Input
                              id="activoNum"
                              name="activoNum"
                              color="white"
                              _focus={{ border: "none", boxShadow: "none" }}
                              border="0px"
                              placeholder="Indicar Placa del Activo"
                              value={formData.activoNum}
                              onChange={handleChange}
                            ></Input>
                            <Spacer />
                            <Button
                              p="0px"
                              bg="transparent"
                              w="16px"
                              h="16px"
                              variant="no-hover"
                            >
                              <Icon
                                as={FaPencilAlt}
                                color="#fff"
                                w="12px"
                                h="12px"
                              />
                            </Button>
                          </Flex>
                        </GradientBorder>
                      </Flex>
                    </CardBody>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isInvalid={errors.tipo}>
                    <Box>
                      <Flex
                        justify="space-between"
                        align="center"
                        minHeight="25px"
                        w="100%"
                      >
                        <FormLabel
                          fontSize="lg"
                          color="#fff"
                          fontWeight="normal"
                        >
                          Tipo
                        </FormLabel>
                      </Flex>
                    </Box>
                    <CardBody>
                      <Flex
                        direction={{ sm: "column", md: "row" }}
                        align="center"
                        w="100%"
                        justify="center"
                        py="1rem"
                      >
                        <GradientBorder
                          mb={{ sm: "24px", md: "0px" }}
                          me={{ sm: "0px", md: "24px" }}
                          w="100%"
                          borderRadius="20px"
                        >
                          <Flex
                            p="5px"
                            bg="rgb(61, 61, 61)"
                            border="transparent"
                            borderRadius="20px"
                            align="center"
                            w="100%"
                          >
                            <Select
                              id="tipo"
                              name="tipo"
                              placeholder="Elige una opción"
                              color="white" // Placeholder color
                              border="0px"
                              _placeholder={{ color: "white" }}
                              _focus={{ boxShadow: "none" }}
                              value={formData.tipo}
                              onChange={handleChange}
                            >
                              <option
                                style={{ color: "black" }}
                                value="Por Definir"
                              >
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
                              <option
                                style={{ color: "black" }}
                                value="Equipos de Seguridad"
                              >
                                Equipos de Seguridad
                              </option>
                              <option
                                style={{ color: "black" }}
                                value="Materiales de Construcción"
                              >
                                Materiales de Construcción
                              </option>
                            </Select>
                            <Spacer />
                          </Flex>
                        </GradientBorder>
                      </Flex>
                    </CardBody>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isInvalid={errors.marca}>
                    <Box>
                      <Flex
                        justify="space-between"
                        align="center"
                        minHeight="25px"
                        w="100%"
                      >
                        <FormLabel
                          fontSize="lg"
                          color="#fff"
                          fontWeight="normal"
                        >
                          Marca
                        </FormLabel>
                      </Flex>
                    </Box>
                    <CardBody>
                      <Flex
                        direction={{ sm: "column", md: "row" }}
                        align="center"
                        w="100%"
                        justify="center"
                        py="1rem"
                      >
                        <GradientBorder
                          mb={{ sm: "24px", md: "0px" }}
                          me={{ sm: "0px", md: "24px" }}
                          w="100%"
                          borderRadius="20px"
                        >
                          <Flex
                            p="5px"
                            bg="rgb(61, 61, 61)"
                            border="transparent"
                            borderRadius="20px"
                            align="center"
                            w="100%"
                          >
                            <Input
                              id="marca"
                              name="marca"
                              _focus={{ border: "none", boxShadow: "none" }}
                              border="0px"
                              color="white"
                              placeholder="Indicar la Marca del Activo"
                              value={formData.marca}
                              onChange={handleChange}
                            ></Input>
                            <Spacer />
                            <Button
                              p="0px"
                              bg="transparent"
                              w="16px"
                              h="16px"
                              variant="no-hover"
                            >
                              <Icon
                                as={FaPencilAlt}
                                color="#fff"
                                w="12px"
                                h="12px"
                              />
                            </Button>
                          </Flex>
                        </GradientBorder>
                      </Flex>
                    </CardBody>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isInvalid={errors.modelo}>
                    <Box>
                      <Flex
                        justify="space-between"
                        align="center"
                        minHeight="25px"
                        w="100%"
                      >
                        <FormLabel
                          fontSize="lg"
                          color="#fff"
                          fontWeight="normal"
                        >
                          Modelo
                        </FormLabel>
                      </Flex>
                    </Box>
                    <CardBody>
                      <Flex
                        direction={{ sm: "column", md: "row" }}
                        align="center"
                        w="100%"
                        justify="center"
                        py="1rem"
                      >
                        <GradientBorder
                          mb={{ sm: "24px", md: "0px" }}
                          me={{ sm: "0px", md: "24px" }}
                          w="100%"
                          borderRadius="20px"
                        >
                          <Flex
                            p="5px"
                            bg="rgb(61, 61, 61)"
                            border="transparent"
                            borderRadius="20px"
                            align="center"
                            w="100%"
                          >
                            <Input
                              id="modelo"
                              name="modelo"
                              _focus={{ border: "none", boxShadow: "none" }}
                              border="0px"
                              color="white"
                              placeholder="Indicar el Modelo del Activo"
                              value={formData.modelo}
                              onChange={handleChange}
                            ></Input>
                            <Spacer />
                            <Button
                              p="0px"
                              bg="transparent"
                              w="16px"
                              h="16px"
                              variant="no-hover"
                            >
                              <Icon
                                as={FaPencilAlt}
                                color="#fff"
                                w="12px"
                                h="12px"
                              />
                            </Button>
                          </Flex>
                        </GradientBorder>
                      </Flex>
                    </CardBody>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isInvalid={errors.descripcion}>
                    <Box>
                      <Flex
                        justify="space-between"
                        align="center"
                        minHeight="25px"
                        w="100%"
                      >
                        <FormLabel
                          fontSize="lg"
                          color="#fff"
                          fontWeight="normal"
                        >
                          Descripción
                        </FormLabel>
                      </Flex>
                    </Box>
                    <CardBody>
                      <Flex
                        direction={{ sm: "column", md: "row" }}
                        align="center"
                        w="100%"
                        justify="center"
                        py="1rem"
                      >
                        <GradientBorder
                          mb={{ sm: "24px", md: "0px" }}
                          me={{ sm: "0px", md: "24px" }}
                          w="100%"
                          borderRadius="20px"
                        >
                          <Flex
                            p="5px"
                            bg="rgb(61, 61, 61)"
                            border="transparent"
                            borderRadius="20px"
                            align="center"
                            w="100%"
                          >
                            <Textarea
                              id="descripcion"
                              name="descripcion"
                              _focus={{ border: "none", boxShadow: "none" }}
                              border="0px"
                              color="white"
                              placeholder="Indicar la Descripción del Activo"
                              maxH="200px"
                              value={formData.descripcion}
                              onChange={handleChange}
                            ></Textarea>
                            <Spacer />
                          </Flex>
                        </GradientBorder>
                      </Flex>
                    </CardBody>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl>
                    <Box>
                      <Flex
                        justify="space-between"
                        align="center"
                        minHeight="25px"
                        w="100%"
                      >
                        <FormLabel
                          fontSize="lg"
                          color="#fff"
                          fontWeight="normal"
                        >
                          Estado
                        </FormLabel>
                      </Flex>
                    </Box>
                    <CardBody>
                      <Flex
                        direction={{ sm: "column", md: "row" }}
                        align="center"
                        w="100%"
                        justify="center"
                        py="1rem"
                      >
                        <GradientBorder
                          mb={{ sm: "24px", md: "0px" }}
                          me={{ sm: "0px", md: "24px" }}
                          w="100%"
                          borderRadius="20px"
                        >
                          <Flex
                            p="12px"
                            bg="rgb(61, 61, 61)"
                            border="transparent"
                            borderRadius="20px"
                            align="center"
                            w="100%"
                          >
                            <Stack
                              spacing={[1, 5]}
                              direction={["column", "row"]}
                              color="white"
                            >
                              <Checkbox
                                id="enUso"
                                name="enUso"
                                size="sm"
                                colorScheme="orange"
                                isChecked={formData.enUso === "1"}
                                onChange={(e) => {
                                  setFormData((prevData) => ({
                                    ...prevData,
                                    enUso: e.target.checked ? "1" : "0",
                                  }));
                                }}
                              >
                                En Uso
                              </Checkbox>
                              <Checkbox
                                id="depreciado"
                                name="depreciado"
                                size="sm"
                                colorScheme="orange"
                                isChecked={formData.depreciado === "1"}
                                onChange={(e) => {
                                  setFormData((prevData) => ({
                                    ...prevData,
                                    depreciado: e.target.checked ? "1" : "0",
                                  }));
                                }}
                              >
                                Depreciado
                              </Checkbox>
                            </Stack>
                            <Spacer />
                          </Flex>
                        </GradientBorder>
                      </Flex>
                    </CardBody>
                  </FormControl>
                </Box>
              </Grid>

              <Box mt={5} borderTop="2px solid #595254">
                <FormControl>
                  <Box>
                    <Flex
                      justify="center"
                      align="center"
                      minHeight="25px"
                      w="100%"
                      mt={5}
                    >
                      <FormLabel fontSize="lg" color="#fff" fontWeight="normal">
                        Observaciones
                      </FormLabel>
                    </Flex>
                  </Box>
                  <CardBody>
                    <Flex
                      mx={{ sm: "0px", md: "24px", lg: "10px" }}
                      direction={{ sm: "column", md: "row" }}
                      align="center"
                      w="100%"
                      justify="center"
                      py="1rem"
                    >
                      <GradientBorder
                        mb={{ sm: "24px", md: "0px" }}
                        me={{ sm: "0px", md: "24px" }}
                        w="100%"
                        borderRadius="20px"
                      >
                        <Flex
                          p="5px"
                          bg="rgb(61, 61, 61)"
                          border="transparent"
                          borderRadius="20px"
                          align="center"
                          w="100%"
                        >
                          <Textarea
                            id="observaciones"
                            name="observaciones"
                            _focus={{ border: "none", boxShadow: "none" }}
                            border="0px"
                            color="white"
                            placeholder="Indicar Observaciones del Activo"
                            maxH="200px"
                            value={formData.observaciones}
                            onChange={handleChange}
                          ></Textarea>
                          <Spacer />
                        </Flex>
                      </GradientBorder>
                    </Flex>
                  </CardBody>
                </FormControl>
              </Box>
              <Box>
                <Flex
                  justify="center"
                  align="center"
                  minHeight="25px"
                  w="100%"
                  mt={5}
                >
                  <Button
                    type="submit"
                    variant="brand"
                    fontSize="12px"
                    fontWeight="bold"
                    p="6px 32px"
                    onClick={handleSubmit}
                    isDisabled={isLoading}
                    aria-label="Guardar datos"
                  >
                    {isLoading ? "Guardando..." : "GUARDAR"}
                  </Button>
                </Flex>
              </Box>
            </form>
          </Card>
        </Box>
        {/* FIN Form para Ingresar Activos */}
        {/* Ejemplo Activo */}
        <Card
          p="22px"
          my={{ sm: "24px", lg: "0px" }}
          ms={{ sm: "0px", lg: "24px" }}
        >
          <Flex direction="column">
            <CardHeader py="12px">
              <Text color="#fff" fontSize="lg" fontWeight="bold">
                Guía de Ingreso de Activos
              </Text>
            </CardHeader>
            <CardBody>
              <Flex direction="column" w="100%">
                {billingData.map((row) => {
                  return (
                    <BillingRow
                      ubicacion={row.ubicacion}
                      responsable={row.responsable}
                      activoNum={row.activoNum}
                      tipo={row.tipo}
                      marca={row.marca}
                      modelo={row.modelo}
                      descripcion={row.descripcion}
                      estado={row.estado}
                      observaciones={row.observaciones}
                    />
                  );
                })}
              </Flex>
            </CardBody>
          </Flex>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Billing;
