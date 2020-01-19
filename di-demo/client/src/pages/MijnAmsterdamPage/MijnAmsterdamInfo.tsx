import React from "react";
import {
  Heading,
  Paragraph,
} from "@datapunt/asc-ui";
import { Acordeon } from "../../shared/components/Acordeon/Acordeon";

const MijnAmsterdamInfo = () => {
  return (
    <>
      <Heading as="h2">Login bij Mijn Amsterdam met IRMA</Heading>
      <Paragraph>
        Om gebruik te kunnen maken van Mijn Amsterdam, moet u zich bekend maken
        met
      </Paragraph>
      <ul>
        <li>Uw Voornaam</li>
        <li>Uw Achternaam</li>
        <li>Uw Burgerservicenummer (BSN)</li>
      </ul>
      <Acordeon title="Waarom worden deze gegevens gevraagd?">
        <Heading as="h5">Voornaam</Heading>
        <Paragraph>
          De gemeente wilt u bij uw voornaam aanspreken in Mijn Amsterdam.
        </Paragraph>
        <Heading as="h5">Achternaam</Heading>
        <Paragraph>
          De gemeente wilt u bij uw achternaam aanspreken in Mijn Amsterdam.
        </Paragraph>
        <Heading as="h5">Burgerservicenummer (BSN)</Heading>
        <Paragraph>De gemeente wilt zeker weten dat u het bent.</Paragraph>
      </Acordeon>
    </>
  );
};

export default MijnAmsterdamInfo;