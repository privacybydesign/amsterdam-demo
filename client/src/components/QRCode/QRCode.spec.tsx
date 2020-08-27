import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import { setupMocks, wrappedRender } from '@test/utils';
import QRCode from './QRCode';

// Setup all the generic mocks
setupMocks();

// MockcreateIrmaSession
jest.mock('@services/createIrmaSession');

const getSession = jest.fn(async () => {
    return { data: 'Test response' };
});

describe('QR Code', () => {
    it('should render the initial QR Code button, and not the modal', async () => {
        // Render QR Code
        await act(async () => await wrappedRender(<QRCode label="Test" getSession={getSession} />));

        const QRCodeButton: HTMLElement = await screen.findByTestId('qrCodeButton');
        expect(QRCodeButton).toBeInTheDocument();

        const QRCodeModal: HTMLElement = await screen.queryByTestId('qrCodeModal');
        expect(QRCodeModal).toBeNull();
    });

    it('Clicking the QR Code button should show the modal and call getSession', async () => {
        // Render QR Code
        await act(async () => await wrappedRender(<QRCode label="Test" getSession={getSession} />));

        const QRCodeButton: HTMLElement = await screen.findByTestId('qrCodeButton');

        fireEvent.click(QRCodeButton);

        const QRCodeModal: HTMLElement = await screen.findByTestId('qrCodeModal');
        expect(QRCodeModal).toMatchSnapshot();

        expect(getSession.mock.calls.length).toBe(1);
    });
});
