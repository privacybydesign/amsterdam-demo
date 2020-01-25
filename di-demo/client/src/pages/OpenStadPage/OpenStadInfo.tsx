import React from 'react';
import styled from '@datapunt/asc-core';
import { Acordeon } from '../../shared/components/Acordeon/Acordeon';
import AttributeList from '../../shared/components/AttributeList';
import AttributeInfo from '../../shared/components/AttributeInfo';

const OpenStadInfoStyle = styled.div``;

const OpenStadInfo = () => {
  return (
    <OpenStadInfoStyle>
      <AttributeInfo title="Stuur uw keuze op met IRMA" headingType="h2">
        Om uw stem uit te brengen, moet u zich bekend maken met
      </AttributeInfo>
      <AttributeList values={['Uw postcode']} />
      <Acordeon title="Waarom worden deze gegevens gevraagd?">
        <AttributeInfo title="Postcode">
          De gemeente wil zeker weten dat u in Amsterdam woont.
        </AttributeInfo>
      </Acordeon>
    </OpenStadInfoStyle>
  );
};

export default OpenStadInfo;
