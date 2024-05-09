"use client";

import React from "react";
import { quizData } from "../quizData";
import { Box, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { useResults } from "../context/resultsContext";
import { useRouter } from "next/navigation";

const QuizPage = () => {
  const [score, setScore] = React.useState(0);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState("");
  const [shuffledAnswers, setShuffledAnswers] = React.useState([]);

  const router = useRouter();
  const { setResults } = useResults();
  const { questions, totalQuestions } = quizData;
  const { question, answers, correctAnswer, correctAnswerMessage } = questions[currentQuestion];

  const toast = useToast({
    duration: 5000,
    title: { correctAnswerMessage },
    containerStyle: {
      width: "800px",
    },
  });

  async function playSound(url) {
    const audio = new Audio(url);
    audio.play();
  }

  const showToast = async (answer) => {
    if (answer === correctAnswer) {
      toast({
        title: "CORRECT!",
        description: correctAnswerMessage,
        status: "success",
        duration: 5000,
        isClosable: false,
      });
    }

    if (answer === "Arnhem") {
      playSound("/vitesse-volkslied.mp3");
      anrhemAnswer();
      return;
    } else if (answer === "Wielrennen") {
      playSound("/oprotten-buitenlander.mp3");
      wielrennerAnswer();
      return;
    } else if (answer === "Mercedes") {
      playSound("/hamilton.mp3");
      mercedesAnswer();
      return;
    }
    if (answer !== correctAnswer) {
      toast({
        title: "INCORRECT!",
        description: "Helaas, dat is niet het juiste antwoord.",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  const handleAnswer = async (answer) => {
    if (answer === correctAnswer) {
      setScore(score + 1);

      if (currentQuestion === totalQuestions - 1) {
        setResults(score + 1);
      } else {
        setResults(score);
      }
    }

    if (currentQuestion + 1 < quizData.totalQuestions && answer !== "Wielrennen") {
      setCurrentQuestion(currentQuestion + 1);
    }

    setSelectedAnswer(answer);
    showToast(answer);

    if (currentQuestion + 1 === quizData.totalQuestions) {
      if (answer === "Mercedes") {
        await new Promise((r) => setTimeout(r, 5000));
      }

      handleFinish();
    }
  };

  const handleFinish = () => {
    router.push("/quiz/results");
  };

  const anrhemAnswer = async () => {
    for (let i = 0; i < 13; i++) {
      const positions = ["top-right", "top-left", "bottom-right", "bottom-left"];
      const randomPosition = positions[Math.floor(Math.random() * positions.length)];

      toast({
        title: "THINK DEEP!",
        description: "Arnhem kun je niet voor wegrennen, je kan wel wegblijven!",
        status: "error",
        duration: 1000,
        isClosable: false,
        position: randomPosition,
      });

      await new Promise((r) => setTimeout(r, 333));
    }

    await new Promise((r) => setTimeout(r, 500));

    router.push("/quiz/results");
  };

  const wielrennerAnswer = async () => {
    for (let i = 0; i < 13; i++) {
      const positions = ["top-right", "top-left", "bottom-right", "bottom-left"];
      const randomPosition = positions[Math.floor(Math.random() * positions.length)];

      toast({
        title: "OPGETYFT TERING LIJER!",
        description: "Dat jij van wielrennen houd betekent niet dat ik dat doe. Oprotten buitenlander!",
        status: "error",
        duration: 1000,
        isClosable: false,
        position: randomPosition,
      });

      await new Promise((r) => setTimeout(r, 333));
    }

    await new Promise((r) => setTimeout(r, 500));

    router.push("/quiz/results");
  };

  const mercedesAnswer = async () => {
    for (let i = 0; i < 13; i++) {
      const positions = ["top-right", "top-left", "bottom-right", "bottom-left"];
      const randomPosition = positions[Math.floor(Math.random() * positions.length)];

      toast({
        title: "OPGETYFT TERING LIJER!",
        description: "Dat jij een LEWIS HAMILTON fan bent, betekent niet dat ik het ben!",
        status: "error",
        duration: 1000,
        isClosable: false,
        position: randomPosition,
      });

      await new Promise((r) => setTimeout(r, 333));
    }
  };

  React.useEffect(() => {
    const shuffled = [...answers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledAnswers(shuffled);
  }, [currentQuestion, answers]);

  React.useEffect(() => {
    setScore(0);
    setResults(0);
    setCurrentQuestion(0);
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
      <Heading color={"#f5f5f5f5"}>{`Vraag ${currentQuestion + 1} van ${totalQuestions}`}</Heading>
      <Text fontSize="xl" color={"#f5f5f5f5"}>
        {question}
      </Text>
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "1rem",
        }}
      >
        {shuffledAnswers.map((answer) => (
          <Button
            key={answer}
            colorScheme="teal"
            size="lg"
            isLoading={selectedAnswer === "Wielrennen" || selectedAnswer === "Mercedes" || selectedAnswer === "Arnhem"}
            loadingText={answer}
            onClick={() => handleAnswer(answer)}
          >
            {answer}
          </Button>
        ))}
      </Box>
      <Text fontSize="xl" color={"#f5f5f5f5"}>
        {score} / {totalQuestions}
      </Text>
    </Box>
  );
};

export default QuizPage;
