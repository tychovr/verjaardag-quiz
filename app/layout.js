import { Inter } from "next/font/google";
import "./globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import { ResultsProvider } from "./context/resultsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bryan's Verjaardag Quiz",
  description: "De 'Denk je dat je alles over de Almachtige Tycho kent?' quiz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider resetCSS toastOptions={{ defaultOptions: { position: "bottom" } }}>
          <ResultsProvider>{children}</ResultsProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
