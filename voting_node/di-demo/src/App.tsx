import React from "react";
import styled from "styled-components";
import "./App.css";
import { relative } from "path";

const MainContainerStyle = styled.div`
  background-color: #F2F5F8;
`;



const AppWrapper = styled.div`
  postion: relative;
  text-align: center;
  background-image: url(assets/Home.png);
  background-repeat: no-repeat;
  background-size: 1440px;
  height: 100vh;
  margin: 0 auto;
  width: 1440px;
`;

const LinkListStyle = styled.div`
  position: absolute;
  top: 335px;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LinkStyle = styled.a`
  /*border: solid 1px grey;*/
  width: 314px;
  margin-bottom: 21px;
  height: 54px;
`;

const Spacer = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
`;

const App: React.FC = () => {
  return (<MainContainerStyle>

    <AppWrapper>
        <LinkListStyle>
          <LinkStyle href="mijnamsterdam">{/* Mijn Amsterdam */}</LinkStyle>
          <LinkStyle href="openstad">{/* Open stad */}</LinkStyle>
          <LinkStyle href="halloijburg">{/* Hallo IJburg */}</LinkStyle>
          <LinkStyle href="alchoolkopen">{/* Alchook kopen */}</LinkStyle>
          <LinkStyle href="rommelmelden">{/* Rommel melden */}</LinkStyle>
          <Spacer height={42} />
          <LinkStyle href="kortingkrijgen">{/* Korting krijgen */}</LinkStyle>
        </LinkListStyle>
    </AppWrapper>
  </MainContainerStyle>
  );
};

export default App;
