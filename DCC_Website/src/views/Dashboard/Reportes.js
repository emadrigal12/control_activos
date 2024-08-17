import React, { useState } from "react";

// Chakra imports
import {
  Flex,
  Text,
  Input,
  Select,
  Button,
  Icon,
  InputGroup,
  InputLeftElement,
  IconButton,
  Grid,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";

// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// Hooks
import useReportData from "hooks/useReportData";

function Reports() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [project, setProject] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, error, generateReport } = useReportData();

  const handleDownload = async (type) => {
    // if (!startDate || !endDate || !project) {
    //   console.error('Por favor, complete todos los campos');
    //   return;
    // }

    const reportTypeUrl = `http://localhost:4000/reportes/estado-proyectos-activos/${type}`;
    const success = await generateReport(
      reportTypeUrl,
      startDate,
      endDate,
      project
    );
    if (success) {
      console.log("Reporte generado con éxito");
    } else {
      console.error("Error al generar el reporte:", error);
    }
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px" mb="20px">
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="lg" color="#fff" fontWeight="bold">
            Generación de Reportes
          </Text>
        </CardHeader>
        <CardBody>
          <Flex direction="column" mb={5}>
            <Flex mb={3} justify="space-between">
              <InputGroup
                cursor="pointer"
                bg="#28020F"
                borderRadius="15px"
                borderColor="rgba(226, 232, 240, 0.3)"
                w={{
                  sm: "128px",
                  md: "200px",
                }}
                me={{ sm: "auto", md: "20px" }}
              >
                <InputLeftElement
                  children={
                    <IconButton
                      bg="inherit"
                      borderRadius="inherit"
                      _hover="none"
                      _active={{
                        bg: "inherit",
                        transform: "none",
                        borderColor: "transparent",
                      }}
                      _focus={{
                        boxShadow: "none",
                      }}
                      icon={<SearchIcon color="white" w="15px" h="15px" />}
                    ></IconButton>
                  }
                />
                <Input
                  fontSize="xs"
                  py="11px"
                  color="gray.400"
                  placeholder="Buscar proyecto..."
                  borderRadius="inherit"
                />
              </InputGroup>
            </Flex>
            <Flex justify="space-between" mb={3}>
              <Input
                placeholder="Fecha de inicio"
                type="date"
                color={"gray.300"}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                me={2}
              />
              <Input
                placeholder="Fecha de fin"
                type="date"
                color="gray.300"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                me={2}
              />
              <Select
                placeholder="Seleccionar proyecto"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                color="gray.300"
              >
                <option value="proyecto1" style={{ color: "black" }}>
                  Proyecto 1
                </option>
                <option value="proyecto2" style={{ color: "black" }}>
                  Proyecto 2
                </option>
                <option value="proyecto3" style={{ color: "black" }}>
                  Proyecto 3
                </option>
              </Select>
            </Flex>
          </Flex>
        </CardBody>
      </Card>

      <Grid templateColumns={{ sm: "1fr", md: "1fr 1fr" }} gap="20px">
        <Card p="16px">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color="#fff" fontWeight="bold">
              Reporte PDF
            </Text>
          </CardHeader>
          <CardBody
            px="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              leftIcon={<Icon as={FaFilePdf} />}
              colorScheme="red"
              variant="solid"
              onClick={() => handleDownload("pdf")}
              isLoading={loading && project === "pdf"}
            >
              Descargar PDF
            </Button>
          </CardBody>
        </Card>

        <Card p="16px">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color="#fff" fontWeight="bold">
              Reporte Excel
            </Text>
          </CardHeader>
          <CardBody
            px="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              leftIcon={<Icon as={FaFileExcel} />}
              colorScheme="green"
              variant="solid"
              onClick={() => handleDownload("excel")}
              isLoading={loading && project === "excel"}
            >
              Descargar Excel
            </Button>
          </CardBody>
        </Card>
      </Grid>

      {error && (
        <Text color="red.500" mt={4}>
          Error: {error}
        </Text>
      )}
    </Flex>
  );
}

export default Reports;
