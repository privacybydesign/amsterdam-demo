import React from "react";
import {
  Heading,
  Paragraph,
} from "@datapunt/asc-ui";
import { Acordeon } from "../../shared/components/Acordeon/Acordeon";

const OpeStadInfo = () => {
  return (
    <>
      <Heading as="h2">Stuur uw keuze met IRMA</Heading>
      <Paragraph>
        Om uw stem uit te brengen, moet u zich bekend maken met:
      </Paragraph>
      <ul>
        <li>Postcode</li>
      </ul>
      <Acordeon title="Waarom worden deze gegevens gevraagd?">
        <Heading as="h5">Postcode</Heading>
        <Paragraph>
          De gemeente wilt zeker weten dat u in Amsterdam woont.
        </Paragraph>
      </Acordeon>
    </>
  );
};

export default OpeStadInfo;