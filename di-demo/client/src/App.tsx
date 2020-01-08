import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import "./App.css";
import { PageWrapper } from "./AppStyle";

const MainContainerStyle = styled.div`
  background-color: #f2f5f8;
`;

const LinkListStyle = styled.div`
  position: absolute;
  top: 326px;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LinkStyle = styled.a`
  // border: solid 1px grey;
  width: 314px;
  margin-bottom: 20px;
  height: 53px;
`;

const Spacer = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
`;

const themeName = "amsterdam";
const App: React.FC = () => {

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/stats");
      const data = await response.json();
      console.log("got", data);
    })();
  }, []);

  return (
    <MainContainerStyle>
      <PageWrapper>
        <img
          alt="Home"
          src={`assets/theme/${themeName}/home.png`}
          height="1068"
          width="1400"
          decoding="async"
        />
        <LinkListStyle>
          <LinkStyle href={`mijnamsterdam/${themeName}`}>
            {/* Mijn Amsterdam */}
          </LinkStyle>
          <LinkStyle href={`openstad/${themeName}`}>
            {/* Open stad */}
          </LinkStyle>
          <LinkStyle href={`halloijburg/${themeName}`}>
            {/* Hallo IJburg */}
          </LinkStyle>
          <LinkStyle href={`alchoolkopen/${themeName}`}>
            {/* Alchool kopen */}
          </LinkStyle>
          <LinkStyle href={`rommelmelden/${themeName}`}>
            {/* Rommel melden */}
          </LinkStyle>
          <Spacer height={41} />
          <LinkStyle href={`kortingkrijgen/${themeName}`}>
            {/* Korting krijgen */}
          </LinkStyle>
        </LinkListStyle>
      </PageWrapper>
    </MainContainerStyle>
  );
};

export default App;
