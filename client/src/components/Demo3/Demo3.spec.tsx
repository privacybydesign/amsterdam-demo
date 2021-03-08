import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import { setupMocks, wrappedRender } from '@test/utils';
import Demo3 from '@components/Demo3/Demo3';
import createIrmaSession from '@services/createIrmaSession';

// Setup all the generic mocks
setupMocks();

// MockcreateIrmaSession
jest.mock('@services/createIrmaSession');

describe('Demo3', () => {
    it('should render the initial header image', async () => {
        // Render demo 3
        await act(async (): Promise<any> => await wrappedRender(<Demo3 />));
        const headerImage: HTMLElement = await screen.findByTestId('headerImage');
        expect(headerImage).toMatchSnapshot();
    });

    it('should update the page after completing the IRMA flow', async () => {
        // Adjust mocked CreateIrmaSession to return a correct credential
        const mockedCreateIrmaSession = createIrmaSession as jest.Mock<unknown>;
        mockedCreateIrmaSession.mockReturnValue({
            fullname: 'Test test'
        });

        // Render demo 3
        await act(async (): Promise<any> => await wrappedRender(<Demo3 />));

        // Trigger IRMA flow
        const QRCodeButton = screen.getByTestId('qrCodeButton');
        await act(async (): Promise<any> => await fireEvent.click(QRCodeButton));

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
        const mockedCreateIrmaSession = createIrmaSession as jest.Mock<unknown>;
        mockedCreateIrmaSession.mockReturnValue(null);

        // Render demo 3
        await act(async (): Promise<any> => await wrappedRender(<Demo3 />));

        // Trigger IRMA flow
        const QRCodeButton = screen.getByTestId('qrCodeButton');
        await act(async (): Promise<any> => await fireEvent.click(QRCodeButton));

        // Check if demo notification is not visible
        const demoNotification = screen.queryByTestId('demoNotification');
        expect(demoNotification).toBeNull();

        // Check if correct alert is shown
        const hasErrorAlert = screen.getByTestId('hasErrorAlert');
        expect(hasErrorAlert).toMatchSnapshot();
    });
});
