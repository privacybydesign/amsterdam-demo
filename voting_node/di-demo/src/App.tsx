import React from "react";
import styled from "styled-components";
import "./App.css";
import { PageWrapper } from "./AppStyle";

const MainContainerStyle = styled.div`
  background-color: #F2F5F8;
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

const App: React.FC = () => {
  return (<MainContainerStyle>

    <PageWrapper>
        <img alt="Home" src="https://s3.invisionapp-cdn.com/storage.invisionapp.com/screens/files/398337770.png?x-amz-meta-iv=3&amp;response-cache-control=max-age%3D2419200&amp;x-amz-meta-ck=6c5383e9abd1130f655ddd13ea0bf466&amp;AWSAccessKeyId=AKIAJFUMDU3L6GTLUDYA&amp;Expires=1580515200&amp;Signature=TZOGJH%2FKxtyL4QWifGzDYYfnTy0%3D" height="1068" width="1400" decoding="async"/>
        <LinkListStyle>
          <LinkStyle href="mijnamsterdam">{/* Mijn Amsterdam */}</LinkStyle>
          <LinkStyle href="openstad">{/* Open stad */}</LinkStyle>
          <LinkStyle href="halloijburg">{/* Hallo IJburg */}</LinkStyle>
          <LinkStyle href="alchoolkopen">{/* Alchook kopen */}</LinkStyle>
          <LinkStyle href="rommelmelden">{/* Rommel melden */}</LinkStyle>
          <Spacer height={41} />
          <LinkStyle href="kortingkrijgen">{/* Korting krijgen */}</LinkStyle>
        </LinkListStyle>
    </PageWrapper>
  </MainContainerStyle>
  );
};

export default App;
