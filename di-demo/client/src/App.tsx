import React from 'react';
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
        />
        <Button
          onClick={() => history.push(`openstad/${themeName}`)}
          {...openStadButtonPosition}
        />
        <Button
          onClick={() => history.push(`afvalmelden/${themeName}`)}
          {...afvalMeldenButtonPosition}
        />
        <Button
          onClick={() => history.push(`alchoolkopen/${themeName}`)}
          {...alchoolButtonPosition}
        />
      </PageWrapper>
    </MainContainerStyle>
  );
};

export default App;
