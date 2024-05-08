"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Heading, Highlight, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function Home() {
  const router = useRouter();
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "2rem",

        backgroundColor: "#151515",
      }}
    >
      <Heading color={"#f5f5f5f5"}>
        <Highlight query={"almachtige Tycho"} styles={{ px: "3", py: "1", rounded: "full", bg: "teal.100" }}>
          {'Welkom bij de "Denk je dat je alles over de Almachtige Tycho kent?" quiz!'}
        </Highlight>
      </Heading>
      <div>
        <Text fontSize="xl" color={"#f5f5f5f5"}>
          Deze quiz bestaat uit 10 vragen.
        </Text>
        <Text fontSize="xl" color={"#f5f5f5f5"}>
          Je krijgt een punt voor elke vraag die je goed beantwoordt.
        </Text>
        <Text fontSize="xl" color={"#f5f5f5f5"}>
          Bij 10 goede antwoorden krijg je je boodschap!
        </Text>
      </div>
      <Button colorScheme="teal" size="lg" rightIcon={<ArrowForwardIcon />} onClick={() => router.push("/quiz")}>
        Start de quiz
      </Button>
    </Box>
  );
}
