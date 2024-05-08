"use client";

import { Heading, Text, Highlight, Button, Box, useToast } from "@chakra-ui/react";
import { quizData } from "../../quizData";
import React from "react";
import { useResults } from "../../context/resultsContext";
import { useRouter } from "next/navigation";

const ResultsPage = () => {
  const { totalQuestions } = quizData;
  const { results } = useResults();
  const router = useRouter();

  const handleMessage = () => {
    router.push("/message");
  };

  const handleRestart = () => {
    router.push("/quiz");
  };

  const toast = useToast({
    duration: 5000,
    containerStyle: {
      width: "800px",
    },
  });

  React.useEffect(() => {
    if (results === -1) {
      router.push("/quiz");
      toast({
        title: "NO WAY!",
        description: "Je gaat eerst die quiz doen kut!",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        gap: "2rem",

        backgroundColor: "#151515",
      }}
    >
      <Heading color={"#f5f5f5f5"}>Resultaten</Heading>

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: ".5rem",
        }}
      >
        {results === totalQuestions ? (
          <Text fontSize="xl" color={"#f5f5f5f5"}>
            <Highlight query={"WINNAAR"} styles={{ px: "3", py: "1", rounded: "full", bg: "teal.100" }}>
              {`Je bent een WINNAAR`}
            </Highlight>
          </Text>
        ) : (
          <Text fontSize="xl" color={"#f5f5f5f5"}>
            <Highlight query={["Lewis Hamilton", "LOSER"]} styles={{ px: "3", py: "1", rounded: "full", bg: "red" }}>
              {`Je lijkt op Lewis Hamilton, aka LOSER`}
            </Highlight>
          </Text>
        )}
        <Text fontSize="xl" color={"#f5f5f5f5"}>
          <Highlight query={`${results} van de ${totalQuestions}`} styles={{ px: "3", py: "1", rounded: "full", bg: "teal.100" }}>
            {` Je hebt ${results} van de ${totalQuestions} vragen goed beantwoord.`}
          </Highlight>
        </Text>
      </Box>

      {results === totalQuestions ? (
        <Button colorScheme="teal" size="lg" onClick={() => handleMessage()}>
          Bekijk de boodschap
        </Button>
      ) : (
        <Button colorScheme="teal" size="lg" onClick={() => handleRestart()}>
          Speel Opnieuw
        </Button>
      )}
    </Box>
  );
};

export default ResultsPage;
