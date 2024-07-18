import React from "react";
import { useCreateEntity } from "../../hooks/useCreateEntity";
import useUserData from "../../hooks/useUserData";
import { useState, useEffect } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
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

// Data
import { billingData } from "variables/general";

function Billing() {
  // Obtener el nombre del responsable
  const { user, id } = useUserData();
  // Asignar el nombre del responsable al campo correspondiente
  const nombreResponsable = user;

  const [formData, setFormData] = React.useState({
    Ubicacion: "",
    Id_Usuario: id || "",
    Activo_Num: "",
    Tipo: "",
    Marca: "",
    Modelo: "",
    Descripcion: "",
    En_Uso: "0",
    Depreciado: "0",
  });

  const [errors, setErrors] = useState({});
  const resetForm = () => {
    setFormData((prevData) => ({
      ...prevData,
      Ubicacion: "",
      Activo_Num: "",
      Tipo: "",
      Marca: "",
      Modelo: "",
      Descripcion: "",
      En_Uso: "0",
      Depreciado: "0",
    }));
  };
  const { mutate, isLoading } = useCreateEntity(resetForm);

  useEffect(() => {
    if (id) {
      setFormData((prevData) => ({
        ...prevData,
        Id_Usuario: id,
      }));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "En_Uso" && key !== "Depreciado") {
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
                  <FormControl isInvalid={errors.Ubicacion}>
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
                              id="Ubicacion"
                              name="Ubicacion"
                              value={formData.Ubicacion}
                              onChange={handleChange}
                              placeholder="Indicar la Ubicación"
                              _focus={{ border: "none", boxShadow: "none" }}
                              border="0px"
                              color="white"
                            ></Input>
                          </Flex>
                        </GradientBorder>
                      </Flex>
                    </CardBody>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isInvalid={errors.Id_Usuario}>
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
                              readOnly
                              cursor={"not-allowed"}
                              id="Id_Usuario"
                              name="Id_Usuario"
                              _focus={{ border: "none", boxShadow: "none" }}
                              border="0px"
                              color="white"
                              placeholder="Este campo se llena automáticamente"
                              value={nombreResponsable}
                            ></Input>
                          </Flex>
                        </GradientBorder>
                      </Flex>
                    </CardBody>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isInvalid={errors.Activo_Num}>
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
                              id="Activo_Num"
                              name="Activo_Num"
                              color="white"
                              _focus={{ border: "none", boxShadow: "none" }}
                              border="0px"
                              placeholder="Indicar Placa del Activo"
                              value={formData.Activo_Num}
                              onChange={handleChange}
                            ></Input>
                          </Flex>
                        </GradientBorder>
                      </Flex>
                    </CardBody>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isInvalid={errors.Tipo}>
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
                              id="Tipo"
                              name="Tipo"
                              placeholder="Elige una opción"
                              color="white"
                              border="0px"
                              _focus={{ boxShadow: "none" }}
                              value={formData.Tipo}
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
                          </Flex>
                        </GradientBorder>
                      </Flex>
                    </CardBody>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isInvalid={errors.Marca}>
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
                              id="Marca"
                              name="Marca"
                              _focus={{ border: "none", boxShadow: "none" }}
                              border="0px"
                              color="white"
                              placeholder="Indicar la Marca del Activo"
                              value={formData.Marca}
                              onChange={handleChange}
                            ></Input>
                          </Flex>
                        </GradientBorder>
                      </Flex>
                    </CardBody>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isInvalid={errors.Modelo}>
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
                              id="Modelo"
                              name="Modelo"
                              _focus={{ border: "none", boxShadow: "none" }}
                              border="0px"
                              color="white"
                              placeholder="Indicar el Modelo del Activo"
                              value={formData.Modelo}
                              onChange={handleChange}
                            ></Input>
                          </Flex>
                        </GradientBorder>
                      </Flex>
                    </CardBody>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isInvalid={errors.Descripcion}>
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
                              id="Descripcion"
                              name="Descripcion"
                              _focus={{ border: "none", boxShadow: "none" }}
                              border="0px"
                              color="white"
                              placeholder="Indicar la Descripción del Activo"
                              maxH="200px"
                              value={formData.Descripcion}
                              onChange={handleChange}
                            ></Textarea>
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
                                id="En_Uso"
                                name="En_Uso"
                                size="sm"
                                colorScheme="orange"
                                isChecked={formData.En_Uso === "1"}
                                onChange={(e) => {
                                  setFormData((prevData) => ({
                                    ...prevData,
                                    En_Uso: e.target.checked ? "1" : "0",
                                  }));
                                }}
                              >
                                En Uso
                              </Checkbox>
                              <Checkbox
                                id="Depreciado"
                                name="Depreciado"
                                size="sm"
                                colorScheme="orange"
                                isChecked={formData.Depreciado === "1"}
                                onChange={(e) => {
                                  setFormData((prevData) => ({
                                    ...prevData,
                                    Depreciado: e.target.checked ? "1" : "0",
                                  }));
                                }}
                              >
                                Depreciado
                              </Checkbox>
                            </Stack>
                          </Flex>
                        </GradientBorder>
                      </Flex>
                    </CardBody>
                  </FormControl>
                </Box>
              </Grid>

              <Box mt={5} borderTop="2px solid #595254"></Box>
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
                      key={row.id}
                      ubicacion={row.ubicacion}
                      responsable={row.responsable}
                      activoNum={row.activoNum}
                      tipo={row.tipo}
                      marca={row.marca}
                      modelo={row.modelo}
                      descripcion={row.descripcion}
                      estado={row.estado}
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
