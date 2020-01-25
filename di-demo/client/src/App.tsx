import React, { useEffect, useContext } from 'react';
import styled from '@datapunt/asc-core';
import { useHistory } from 'react-router-dom';
import './App.css';
import { PageWrapper } from './AppStyle';
import Button, {
  ButtonStyleProps,
} from './shared/components/Button/ButtonStyle';

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

const mijnAmsterdamButtonPosition: ButtonStyleProps = {
  width: 314,
  height: 53,
  top: 326,
  left: 543,
};
const openStadButtonPosition: ButtonStyleProps = {
  width: 314,
  height: 53,
  top: 401,
  left: 543,
};
const afvalMeldenButtonPosition: ButtonStyleProps = {
  width: 314,
  height: 53,
  top: 476,
  left: 543,
};
const alchoolButtonPosition: ButtonStyleProps = {
  width: 314,
  height: 53,
  top: 551,
  left: 543,
};

const themeName = 'amsterdam';
const App: React.FC = () => {
  const history = useHistory();

  return (
    <MainContainerStyle data-testid="main-container">
      <PageWrapper>
        <img
          alt="Home"
          src={`assets/theme/${themeName}/home.png`}
          height="1068"
          width="1400"
          decoding="async"
        />
        <Button
          onClick={() => history.push(`mijnamsterdam/${themeName}`)}
          {...mijnAmsterdamButtonPosition}
        ></Button>
        <Button
          onClick={() => history.push(`openstad/${themeName}`)}
          {...openStadButtonPosition}
        ></Button>
        <Button
          onClick={() => history.push(`afvalmelden/${themeName}`)}
          {...afvalMeldenButtonPosition}
        ></Button>
        <Button
          onClick={() => history.push(`alchoolkopen/${themeName}`)}
          {...alchoolButtonPosition}
        ></Button>
      </PageWrapper>
    </MainContainerStyle>
  );
};

export default App;
