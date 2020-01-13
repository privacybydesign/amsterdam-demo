import React, { useState } from "react";
import {
  styles,
  Divider,
  Button,
  Modal,
  TopBar,
  Heading,
  Paragraph,
  Icon,
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

  & > ${styles.ParagraphStyle} {
    font-size: 16px;

    ul {
      padding-left: 30px;

      li {
        line-height: 30px;
      }
    }
  }
`;
const QRStyle = styled.div`
  padding: 10px 0;
  position: absolute;
  background-color: white;
  top: 300px;
  width: 500px;
  left: 50%;
  transform: translateX(-50%);

  ${styles.TopBarStyle} h4 {
    flex-direction: row-reverse;
  }
`;

const QRWrapperStyle = styled.div`
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const QRCodeStyle = styled(Paragraph)`
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

export const QRModal = ({ onClose }) => {
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
            <Heading as="h2">Login bij Mijn Amsterdam met IRMA</Heading>
            <Paragraph>
              Om gebruik te kunnen maken van Mijn Amsterdam, moet u zich bekend
              maken met
              <ul>
                <li>Uw Voornaam</li>
                <li>Uw Achternaam</li>
                <li>Uw Burgerservicenummer (BSN)</li>
              </ul>
              <Acordeon title="Waarom worden deze gegevens gevraagd?">
                <Paragraph>
                  <Heading as="h5">Voornaam</Heading>
                  De gemeente wilt u bij uw voornaam aanspreken in Mijn
                  Amsterdam.
                </Paragraph>
                <Paragraph>
                  <Heading as="h5">Achternaam</Heading>
                  De gemeente wilt u bij uw achternaam aanspreken in Mijn
                  Amsterdam.
                </Paragraph>
                <Paragraph>
                  <Heading as="h5">Burgerservicenummer (BSN)</Heading>
                  De gemeente wilt zeker weten dat u het bent.
                </Paragraph>
              </Acordeon>
            </Paragraph>
            <QRCodeStyle>
              <QRCanvasStyle>
                <canvas id="irma-qr" height="150" width="150"></canvas>
              </QRCanvasStyle>
              <Heading as="h4">Scan de QR-code</Heading>
            </QRCodeStyle>
          </ModalBlock>
        </QRStyle>
      </QRWrapperStyle>
    </CompactThemeProvider>
  );
};

// const QRModalASC = ({ open, handleClose, title, body }) => (
//   <Modal
//     aria-labelledby="feedback"
//     aria-describedby="feedback"
//     open={open}
//     onClose={handleClose}
//     hideOverFlow={false}
//   >
//     <TopBar>
//       <Heading style={{ flexGrow: 1 }} as="h4">
//         {title}
//         <Button
//           variant="blank"
//           type="button"
//           size={30}
//           onClick={handleClose}
//           icon={<Close />}
//         />
//       </Heading>
//     </TopBar>
//     <Divider />
//     <ModalBlock>
//       {/* <Paragraph className="infomodal__body" dangerouslySetInnerHTML={{ __html: body }} /> */}
//       <ScanQR />
//     </ModalBlock>
//   </Modal>
// );

// QRModalASC.propTypes = {
//   title: PropTypes.string.isRequired,
//   body: PropTypes.string.isRequired,
//   ...modalPropTypes
// };

// export default withModalBehaviour(QRModalASC);
