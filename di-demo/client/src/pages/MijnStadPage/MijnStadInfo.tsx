import React from 'react';
import styled from '@datapunt/asc-core';
import { Acordeon } from '../../shared/components/Acordeon/Acordeon';
import AttributeList from '../../shared/components/AttributeList';
import AttributeInfo from '../../shared/components/AttributeInfo';

const MijnStadInfoStyle = styled.div``;

const MijnStadInfo = () => {
  return (
    <MijnStadInfoStyle>
      <AttributeInfo title="Login bij Mijn Haarlem met IRMA" headingType="h2">
        Om gebruik te kunnen maken van Mijn Haarlem, moet u zich bekend maken
        met:
      </AttributeInfo>
      <AttributeList
        values={[
          'Uw voornaam',
          'Uw achternaam',
          'Uw burgerservicenummer (BSN)',
        ]}
      />

      <Acordeon title="Waarom worden deze gegevens gevraagd?">
        <AttributeInfo title="Voornaam">
          De gemeente wil u bij uw voornaam aanspreken in Mijn Haarlem.
        </AttributeInfo>
        <AttributeInfo title="Achternaam">
          De gemeente wil u bij uw achternaam aanspreken in Mijn Haarlem.
        </AttributeInfo>
        <AttributeInfo title="Burgerservicenummer (BSN)">
          De gemeente wil zeker weten dat u het bent.
        </AttributeInfo>
      </Acordeon>
    </MijnStadInfoStyle>
  );
};

export default MijnStadInfo;
