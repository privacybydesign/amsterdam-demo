import React from "react";
import { Acordeon } from "../../shared/components/Acordeon/Acordeon";
import styled from "@datapunt/asc-core";
import AttributeList from "../../shared/components/AttributeList";
import AttributeInfo from "../../shared/components/AttributeInfo";

const MijnAmsterdamInfoStyle = styled.div``;

const MijnAmsterdamInfo = () => {
  return (
    <MijnAmsterdamInfoStyle>
      <AttributeInfo title="Login bij Mijn Amsterdam met IRMA" headingType="h2">
        Om gebruik te kunnen maken van Mijn Amsterdam, moet u zich bekend maken
        met
      </AttributeInfo>
      <AttributeList
        values={[
          "Uw Voornaam",
          "Uw Achternaam",
          "Uw Burgerservicenummer (BSN)"
        ]}
      ></AttributeList>

      <Acordeon title="Waarom worden deze gegevens gevraagd?">
        <AttributeInfo title="Voornaam">
          De gemeente wilt u bij uw voornaam aanspreken in Mijn Amsterdam.
        </AttributeInfo>
        <AttributeInfo title="Achternaam">
          De gemeente wilt u bij uw achternaam aanspreken in Mijn Amsterdam.
        </AttributeInfo>
        <AttributeInfo title="Burgerservicenummer (BSN)">
          De gemeente wilt zeker weten dat u het bent.
        </AttributeInfo>
      </Acordeon>
    </MijnAmsterdamInfoStyle>
  );
};

export default MijnAmsterdamInfo;
