import React from "react";

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
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GradientBorder from "components/GradientBorder/GradientBorder";
import BillingRow from "components/Tables/BillingRow";
import InvoicesRow from "components/Tables/InvoicesRow";
import TransactionRow from "components/Tables/TransactionRow";

// Icons
import { FaPencilAlt, FaRegCalendarAlt } from "react-icons/fa";

// Data
import {
  billingData,
  invoicesData,
  newestTransactions,
  olderTransactions,
} from "variables/general";

function Billing() {
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} mx="auto">
      <Grid templateColumns={{ sm: "1fr", lg: "60% 38%" }}>
        <Box>
          {/* Form para Ingresar Activos */}
          <Card>
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
                <Box>
                  <Flex
                    justify="space-between"
                    align="center"
                    minHeight="25px"
                    w="100%"
                  >
                    <Text fontSize="lg" color="#fff" fontWeight="normal">
                      Ubicación
                    </Text>
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
                          _focus={{ border: "none", boxShadow: "none" }}
                          border="0px"
                          color="white"
                          placeholder="Indicar la Ubicación"
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
              </Box>

              <Box>
                <Box>
                  <Flex
                    justify="space-between"
                    align="center"
                    minHeight="25px"
                    w="100%"
                  >
                    <Text fontSize="lg" color="#fff" fontWeight="normal">
                      Responsable
                    </Text>
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
                          _focus={{ border: "none", boxShadow: "none" }}
                          border="0px"
                          color="white"
                          placeholder="Indicar el Responsable"
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
              </Box>

              <Box>
                <Box>
                  <Flex
                    justify="space-between"
                    align="center"
                    minHeight="25px"
                    w="100%"
                  >
                    <Text fontSize="lg" color="#fff" fontWeight="normal">
                      Activo #
                    </Text>
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
                          color="white"
                          _focus={{ border: "none", boxShadow: "none" }}
                          border="0px"
                          placeholder="Indicar Placa del Activo"
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
              </Box>

              <Box>
                <Box>
                  <Flex
                    justify="space-between"
                    align="center"
                    minHeight="25px"
                    w="100%"
                  >
                    <Text fontSize="lg" color="#fff" fontWeight="normal">
                      Tipo
                    </Text>
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
                          placeholder="Elige una opción"
                          color="white" // Placeholder color
                          border="0px"
                          _placeholder={{ color: "white" }}
                          _focus={{ boxShadow: "none" }}
                        >
                          <option style={{ color: "black" }} value="option1">
                            Option 1
                          </option>
                          <option style={{ color: "black" }} value="option2">
                            Option 2
                          </option>
                          <option style={{ color: "black" }} value="option3">
                            Option 3
                          </option>
                        </Select>
                        <Spacer />
                      </Flex>
                    </GradientBorder>
                  </Flex>
                </CardBody>
              </Box>

              <Box>
                <Box>
                  <Flex
                    justify="space-between"
                    align="center"
                    minHeight="25px"
                    w="100%"
                  >
                    <Text fontSize="lg" color="#fff" fontWeight="normal">
                      Marca
                    </Text>
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
                          _focus={{ border: "none", boxShadow: "none" }}
                          border="0px"
                          color="white"
                          placeholder="Indicar la Marca del Activo"
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
              </Box>

              <Box>
                <Box>
                  <Flex
                    justify="space-between"
                    align="center"
                    minHeight="25px"
                    w="100%"
                  >
                    <Text fontSize="lg" color="#fff" fontWeight="normal">
                      Modelo
                    </Text>
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
                          _focus={{ border: "none", boxShadow: "none" }}
                          border="0px"
                          color="white"
                          placeholder="Indicar el Modelo del Activo"
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
              </Box>

              <Box>
                <Box>
                  <Flex
                    justify="space-between"
                    align="center"
                    minHeight="25px"
                    w="100%"
                  >
                    <Text fontSize="lg" color="#fff" fontWeight="normal">
                      Descripción
                    </Text>
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
                          _focus={{ border: "none", boxShadow: "none" }}
                          border="0px"
                          color="white"
                          placeholder="Indicar la Descripción del Activo"
                          maxH="200px"
                        ></Textarea>
                        <Spacer />
                      </Flex>
                    </GradientBorder>
                  </Flex>
                </CardBody>
              </Box>

              <Box>
                <Box>
                  <Flex
                    justify="space-between"
                    align="center"
                    minHeight="25px"
                    w="100%"
                  >
                    <Text fontSize="lg" color="#fff" fontWeight="normal">
                      Estado
                    </Text>
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
                          <Checkbox size="sm" colorScheme="orange">
                            En Uso
                          </Checkbox>
                          <Checkbox size="sm" colorScheme="orange">
                            Depreciado
                          </Checkbox>
                        </Stack>
                        <Spacer />
                      </Flex>
                    </GradientBorder>
                  </Flex>
                </CardBody>
              </Box>
              {/* Fin Inputs */}
            </Grid>
            <Box mt={5} borderTop="2px solid #595254">
              <Box>
                <Flex
                  justify="center"
                  align="center"
                  minHeight="25px"
                  w="100%"
                  mt={5}
                >
                  <Text fontSize="lg" color="#fff" fontWeight="normal">
                    Observaciones
                  </Text>
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
                        _focus={{ border: "none", boxShadow: "none" }}
                        border="0px"
                        color="white"
                        placeholder="Indicar Observaciones del Activo"
                        maxH="200px"
                      ></Textarea>
                      <Spacer />
                    </Flex>
                  </GradientBorder>
                </Flex>
              </CardBody>
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
                  variant="brand"
                  fontSize="12px"
                  fontWeight="bold"
                  p="6px 32px"
                >
                  GUARDAR
                </Button>
              </Flex>
            </Box>
          </Card>
        </Box>
        {/* Invoices List */}
        <Card
          p="22px"
          my={{ sm: "24px", lg: "0px" }}
          ms={{ sm: "0px", lg: "24px" }}
        >
          <CardHeader>
            <Flex justify="space-between" align="center" mb="1rem" w="100%">
              <Text fontSize="lg" color="#fff" fontWeight="bold">
                Invoices
              </Text>
              <Button
                variant="brand"
                fontSize="10px"
                fontWeight="bold"
                p="6px 32px"
              >
                VIEW ALL
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction="column" w="100%">
              {invoicesData.map((row) => {
                return (
                  <InvoicesRow
                    date={row.date}
                    code={row.code}
                    price={row.price}
                    logo={row.logo}
                    format={row.format}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      <Grid templateColumns={{ sm: "1fr", lg: "60% 38%" }}>
        {/* Billing Information */}
        <Card my={{ lg: "24px" }} me={{ lg: "24px" }}>
          <Flex direction="column">
            <CardHeader py="12px">
              <Text color="#fff" fontSize="lg" fontWeight="bold">
                Billing Information
              </Text>
            </CardHeader>
            <CardBody>
              <Flex direction="column" w="100%">
                {billingData.map((row) => {
                  return (
                    <BillingRow
                      name={row.name}
                      company={row.company}
                      email={row.email}
                      number={row.number}
                    />
                  );
                })}
              </Flex>
            </CardBody>
          </Flex>
        </Card>
        {/* Transactions List */}
        <Card my="24px" ms={{ lg: "24px" }}>
          <CardHeader mb="12px">
            <Flex direction="column" w="100%">
              <Flex
                direction={{ sm: "column", lg: "row" }}
                justify={{ sm: "center", lg: "space-between" }}
                align={{ sm: "center" }}
                w="100%"
                my={{ md: "12px" }}
              >
                <Text
                  color="#fff"
                  fontSize={{ sm: "lg", md: "xl", lg: "lg" }}
                  fontWeight="bold"
                >
                  Your Transactions
                </Text>
                <Flex align="center">
                  <Icon
                    as={FaRegCalendarAlt}
                    color="gray.400"
                    w="15px"
                    h="15px"
                    me="6px"
                  />
                  <Text color="gray.400" fontSize="sm">
                    23 - 30 March 2021
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction="column" w="100%">
              <Text color="gray.400" fontSize="xs" mb="18px">
                NEWEST
              </Text>
              {newestTransactions.map((row) => {
                return (
                  <TransactionRow
                    name={row.name}
                    logo={row.logo}
                    date={row.date}
                    price={row.price}
                  />
                );
              })}
              <Text color="gray.400" fontSize="xs" my="18px">
                OLDER
              </Text>
              {olderTransactions.map((row) => {
                return (
                  <TransactionRow
                    name={row.name}
                    logo={row.logo}
                    date={row.date}
                    price={row.price}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Billing;
