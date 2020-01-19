import React from "react";
import { Acordeon } from "../../shared/components/Acordeon/Acordeon";
import styled from "@datapunt/asc-core";
import AttributeList from "../../shared/components/AttributeList";
import AttributeInfo from "../../shared/components/AttributeInfo";

const OpeStadInfoStyle = styled.div``;

const OpeStadInfo = () => {
  return (
    <OpeStadInfoStyle>
      <AttributeInfo title="Stuur uw keuze met IRMA" headingType="h2">
        Om uw stem uit te brengen, moet u zich bekend maken met:
      </AttributeInfo>
      <AttributeList values={["Postcode"]}></AttributeList>
      <Acordeon title="Waarom worden deze gegevens gevraagd?">
        <AttributeInfo title="Postcode">
          De gemeente wilt zeker weten dat u in Amsterdam woont.
        </AttributeInfo>
      </Acordeon>
    </OpeStadInfoStyle>
  );
};

export default OpeStadInfo;
