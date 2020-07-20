import React, { useEffect, useState } from 'react';

import { Button, Heading, Modal } from '@datapunt/asc-ui';

export interface IProps {
  getSession: Function
}

const QRCode: React.FC<IProps> = ({ getSession }) => {
  const [hasOverlay, setHasOverlay] = useState(false)

  const getQRSession = () => {
    setHasOverlay(true);
    typeof getSession === 'function' && getSession();
  }

  return (
    <div>
      <Button onClick={getQRSession} variant="secondary">
        Inloggen met IRMA
      </Button>

      {
        hasOverlay ?
          <Modal open backdropOpacity={0.5}>
            <Heading as="h3">Maak uzelf bekend</Heading>

            Doorloop de volgende stappen:

            <ol>
              <li>Scan de QR-code hieronder met uw IRMA-app.</li>
              <li>Kies in uw IRMA-app of u de gevraagde gegevens wilt doorgeven om in te loggen op Mijn Amsterdam.</li>
            </ol>

            <canvas id="irma-qr" />
          </Modal>
          : null
      }
    </div >
  );
};

export default QRCode;
