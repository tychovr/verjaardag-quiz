"use client";

import React from "react";
import { Heading, Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useResults } from "../context/resultsContext";
import { quizData } from "../quizData";

const Message = () => {
  const router = useRouter();
  const { results } = useResults();
  const { totalQuestions } = quizData;

  const toast = useToast({
    duration: 5000,
    containerStyle: {
      width: "800px",
    },
  });

  React.useEffect(() => {
    console.log(results + " " + totalQuestions);
    if (results !== totalQuestions) {
      toast({
        title: "NICE TRY FOOL!",
        description: "Ik denk aan alle cheat trucjes, helaas voor jou! :)",
        status: "error",
        duration: 5000,
        isClosable: false,
      });

      router.push("/quiz");
    }
  });

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
      <Heading color={"#f5f5f5f5"}>De Boodschap</Heading>
      <Box
        style={{
          border: "1px solid #f5f5f5f5",
        }}
      >
        <iframe
          height="394"
          width="700"
          src="https://www.youtube.com/embed/JCvFZUSiENQ?si=yPy4WDILvzWQZDbK?fs=1&enablejsapi=1&enablecastapi=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; "
          allowfullscreen
        ></iframe>
      </Box>
    </Box>
  );
};

export default Message;
