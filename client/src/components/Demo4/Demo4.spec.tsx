import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import { setupMocks, wrappedRender } from '@test/utils';
import Demo4 from '@components/Demo4/Demo4';
import createIrmaSession from '@services/createIrmaSession';
import content from '@services/content-nl';

// Setup all the generic mocks
setupMocks();

// MockcreateIrmaSession
jest.mock('@services/createIrmaSession');

describe('Demo4', () => {
    it('should render the initial header image', async () => {
        // Render demo 4
        await act(async (): Promise<any> => await wrappedRender(<Demo4 />));
        const headerImage: HTMLElement = await screen.findByTestId('headerImage');
        expect(headerImage).toMatchSnapshot();
    });

    it('should fail to start the IRMA flow when form is not filled', async () => {
        // Render demo 4
        await act(async (): Promise<any> => await wrappedRender(<Demo4 />));

        // Trigger IRMA flow
        const QRCodeButton = screen.getByTestId('qrCodeButton');
        await act(async (): Promise<any> => await fireEvent.click(QRCodeButton));

        // Expect modal not to be shown
        const QRCodeModal = screen.queryByTestId('qrCodeModal');
        expect(QRCodeModal).not.toBeInTheDocument();
    });

    it('should update the page after completing the IRMA flow', async () => {
        // Adjust mocked CreateIrmaSession to return a correct credentials
        const mockedCreateIrmaSession = createIrmaSession as jest.Mock<unknown>;
        mockedCreateIrmaSession.mockReturnValue({
            fullname: 'Test test',
            street: 'Teststraat',
            houseNumber: 100,
            zipcode: '1011PT',
            city: 'Amsterdam',
            mobilenumber: '0612345678',
            email: 'test@test.com'
        });

        // Render demo 4
        await act(async (): Promise<any> => await wrappedRender(<Demo4 />));

        // Fill in form
        const radioOption = screen.getByLabelText(content.demo4.form.optionYes);
        act(() => {
            fireEvent.click(radioOption);
        });

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
        // Adjust mocked CreateIrmaSession to return a correct credentials
        const mockedCreateIrmaSession = createIrmaSession as jest.Mock<unknown>;
        mockedCreateIrmaSession.mockReturnValue(null);

        // Render demo 4
        await act(async (): Promise<any> => await wrappedRender(<Demo4 />));

        // Fill in form
        const radioOption = screen.getByLabelText(content.demo4.form.optionYes);
        act(() => {
            fireEvent.click(radioOption);
        });

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
        const hasErrorAlert = screen.getByTestId('hasErrorAlert');
        expect(hasErrorAlert).toMatchSnapshot();
    });
});
