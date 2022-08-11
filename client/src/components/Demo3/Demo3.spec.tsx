import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import { setupIrmaMocks, setupMocks, wrappedRender } from '@test/utils';
import Demo3 from '@components/Demo3/Demo3';
import createIrmaSession from '@services/createIrmaSession';
import reduceIRMAResult from '@services/reduceIRMAResult';

// Setup all the generic mocks
setupMocks();

// MockcreateIrmaSession
jest.mock('@services/createIrmaSession');
jest.mock('@services/reduceIRMAResult');

describe('Demo3', () => {
    it('should render the initial header image', async () => {
        // Render demo 3
        await act(async (): Promise<any> => await wrappedRender(<Demo3 />));
        const headerImage: HTMLElement = await screen.findByTestId('headerImage');
        expect(headerImage).toMatchSnapshot();
    });

    it('should update the page after completing the IRMA flow', async () => {
        // Adjust mocked CreateIrmaSession to return a correct credential
        setupIrmaMocks(reduceIRMAResult, createIrmaSession, {
            fullname: 'Test test'
        });

        jest.useFakeTimers();

        // Render demo 3
        await act(async (): Promise<any> => await wrappedRender(<Demo3 />));

        // Trigger IRMA flow
        const QRCodeButton = screen.getByTestId('qrCodeButton');
        await act(async (): Promise<any> => await fireEvent.click(QRCodeButton));

        jest.advanceTimersByTime(110);

        await screen.findByRole('alert');

        // Check if header image is updated
        const headerImage = screen.getByTestId('headerImage');
        expect(headerImage).toMatchSnapshot();

        // Check if demo notification is not visible
        const demoNotification = screen.queryByTestId('demoNotification');
        expect(demoNotification).toBeNull();

        // Check if correct alert is shown
        const hasResultAlert = screen.getByTestId('hasResultAlert');
        expect(hasResultAlert).toMatchSnapshot();
    });

    it('should update the page after failing the IRMA flow', async () => {
        // Adjust mocked CreateIrmaSession to return a negative response
        setupIrmaMocks(reduceIRMAResult, createIrmaSession, null);

        // Render demo 3
        await act(async (): Promise<any> => await wrappedRender(<Demo3 />));

        // Trigger IRMA flow
        const QRCodeButton = screen.getByTestId('qrCodeButton');
        await act(async (): Promise<any> => await fireEvent.click(QRCodeButton));

        await screen.findByTestId('hasErrorAlert');

        // Check if demo notification is not visible
        const demoNotification = screen.queryByTestId('demoNotification');
        expect(demoNotification).toBeNull();

        // Check if correct alert is shown
        const hasErrorAlert = screen.getByTestId('hasErrorAlert');
        expect(hasErrorAlert).toMatchSnapshot();
    });
});
