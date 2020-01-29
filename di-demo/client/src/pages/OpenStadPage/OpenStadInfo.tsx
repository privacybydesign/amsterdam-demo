import React from 'react';
import styled from '@datapunt/asc-core';
import { useParams } from 'react-router-dom';
import { Acordeon } from '../../shared/components/Acordeon/Acordeon';
import AttributeList from '../../shared/components/AttributeList';
import AttributeInfo from '../../shared/components/AttributeInfo';

const OpenStadInfoStyle = styled.div``;

interface Props {
  confirmed: boolean;
}

const OpenStadInfo: React.FC<Props> = ({ confirmed, children }) => {
  const { theme } = useParams();
  return (
    <OpenStadInfoStyle>
      {!confirmed ? (
        <>
          <AttributeInfo title="Stuur uw keuze op met IRMA" headingType="h2">
            Om uw stem uit te brengen, moet u zich bekend maken met:
          </AttributeInfo>
          <AttributeList values={['Uw postcode']} />
          <Acordeon title="Waarom worden deze gegevens gevraagd?">
            <AttributeInfo title="Postcode">
              De gemeente wil zeker weten dat u in Amsterdam woont.
            </AttributeInfo>
          </Acordeon>
          {children}
        </>
      ) : (
        <>
          <img
            alt="Open Stad"
            src={`/assets/theme/${theme}/openstad-voted-confirm.png`}
            height="400"
            width="500"
            decoding="async"
          />
        </>
      )}
    </OpenStadInfoStyle>
  );
};

export default OpenStadInfo;
