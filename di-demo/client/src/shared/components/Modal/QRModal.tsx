import React, { useState, Component } from "react";
import {
  styles,
  Button,
  TopBar,
  Heading,
  CompactThemeProvider
} from "@datapunt/asc-ui";
import { Close, ChevronDown, ChevronUp } from "@datapunt/asc-assets";
import styled from "@datapunt/asc-core";
import { Acordeon } from "../Acordeon/Acordeon";

const ModalBlock = styled.div`
  display: block;
  padding: 0 40px;
  margin: 15px 0;
  text-align: left;
`;
const QRStyle = styled.div`
  padding: 10px 0;
  position: absolute;
  background-color: white;
  top: 10%;
  width: 500px;
  left: 50%;
  transform: translateX(-50%);

  ${styles.TopBarStyle} h4 {
    flex-direction: row-reverse;
  }
`;

const QRWrapperStyle = styled.div`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const QRCodeStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0;

  & > ${styles.HeadingStyle} {
    font-size: 18px;
  }
`;

const QRCanvasStyle = styled.div`
  position: relative;
  width: 270px;
  height: 270px;
  margin: 28px 0;
  background: url(/assets/icons/qr.svg);
  background-size: contain;

  & > canvas {
    position: absolute;
    top: 20px;
    left: 20px;
  }
`;

interface Props {
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  Info: React.FC;
}

export const QRModal: React.FC<Props> = ({ onClose, Info }) => {
  return (
    <CompactThemeProvider>
      <QRWrapperStyle>
        <QRStyle>
          <TopBar>
            <Heading as="h4">
              <Button
                variant="blank"
                type="button"
                size={30}
                onClick={onClose}
                icon={<Close />}
              />
            </Heading>
          </TopBar>
          <ModalBlock>
            <Info />
            <QRCodeStyle>
              <QRCanvasStyle>
                <canvas id="irma-qr"></canvas>
              </QRCanvasStyle>
              <Heading as="h4">Scan de QR-code</Heading>
            </QRCodeStyle>
          </ModalBlock>
        </QRStyle>
      </QRWrapperStyle>
    </CompactThemeProvider>
  );
};
