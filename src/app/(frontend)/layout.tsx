import React from "react";

import { Main } from "@/components/elements/main";

import { Footer } from "./_components/footer";
import { MotionProvider } from "./_components/motion-provider";
import { Navbar } from "./_components/navbar";

import "./styles.css";

export const metadata = {
  description:
    "ELLA turns trust into action with tools built for advisor-led transitions. Go from intake to insight in a fraction of the time.",
  title: "ELLA | Practice Systematization for Trusted Advisors",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-sandstone-50">
        <MotionProvider>
          <Navbar />
          <Main>{children}</Main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
