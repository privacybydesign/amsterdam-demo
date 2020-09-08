import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import { setupMocks, wrappedRender } from '@test/utils';
import Demo5 from '@components/Demo5/Demo5';
import createIrmaSession from '@services/createIrmaSession';

// Setup all the generic mocks
setupMocks();

// MockcreateIrmaSession
jest.mock('@services/createIrmaSession');

describe('Demo5', () => {
    it('should render the initial header image', async () => {
        // Render demo 4
        await act(async () => await wrappedRender(<Demo5 />));
        const headerImage: HTMLElement = await screen.findByTestId('headerImage');
        expect(headerImage).toMatchSnapshot();
    });

    it('should fail to start the IRMA flow when form is not filled', async () => {
        // Render demo 4data-testid={'noIRMAbutton'}
        await act(async () => await wrappedRender(<Demo5 />));

        // Trigger IRMA flow
        const QRCodeButton = screen.getByTestId('qrCodeButton');
        await act(async () => await fireEvent.click(QRCodeButton));

        // Expect modal not to be shown
        const QRCodeModal = screen.queryByTestId('qrCodeModal');
        expect(QRCodeModal).not.toBeInTheDocument();
    });

    it('should update the page after completing the IRMA flow', async () => {
        // Adjust mocked CreateIrmaSession to return a correct credentials
        const mockedCreateIrmaSession = createIrmaSession as jest.Mock<unknown>;
        mockedCreateIrmaSession.mockReturnValue({
            email: 'test@amsterdam.nl',
            mobilenumber: '0612345678'
        });

        // Render demo 5
        await act(async () => await wrappedRender(<Demo5 />));

        // Fill in form
        const map = screen.getByTestId('map');
        await act(async () => await fireEvent.click(map));

        const report = screen.getByTestId('report');
        act(() => {
            fireEvent.change(report, { target: { value: 'Test report' } });
        });

        const mobileOption = screen.getByTestId('optionMobileNumberYes');
        act(() => {
            fireEvent.click(mobileOption);
        });

        const emailOption = screen.getByTestId('optionEmailYes');
        act(() => {
            fireEvent.click(emailOption);
        });

        // Trigger IRMA flow
        const QRCodeButton = screen.getByTestId('qrCodeButton');
        await act(async () => await fireEvent.click(QRCodeButton));

        // Wait for update and check if correct alert is shown
        const hasResultAlert = screen.getByTestId('hasResultAlert');
        expect(hasResultAlert).toMatchSnapshot();

        // Check if header image is updated
        const headerImage = screen.getByTestId('headerImage');
        expect(headerImage).toMatchSnapshot();

        // Check if demo notification is not visible
        const demoNotification = screen.queryByTestId('demoNotification');
        expect(demoNotification).toBeNull();
    });

    it('should update the page after completing the demo without IRMA flow', async () => {
        // Render demo 5
        await act(async () => await wrappedRender(<Demo5 />));

        // Fill in form
        const map = screen.getByTestId('map');
        await act(async () => await fireEvent.click(map));

        const report = screen.getByTestId('report');
        act(() => {
            fireEvent.change(report, { target: { value: 'Test report' } });
        });

        const mobileOption = screen.getByTestId('optionMobileNumberNo');
        act(() => {
            fireEvent.click(mobileOption);
        });

        const emailOption = screen.getByTestId('optionEmailNo');
        act(() => {
            fireEvent.click(emailOption);
        });

        // Trigger IRMA flow
        const SubmitButton = screen.getByTestId('noIRMAbutton');
        await act(async () => await fireEvent.click(SubmitButton));

        // Wait for update and check if correct alert is shown
        const hasResultAlert = screen.getByTestId('hasResultAlert');
        expect(hasResultAlert).toMatchSnapshot();

        // Check if header image is updated
        const headerImage = screen.getByTestId('headerImage');
        expect(headerImage).toMatchSnapshot();

        // Check if demo notification is not visible
        const demoNotification = screen.queryByTestId('demoNotification');
        expect(demoNotification).toBeNull();
    });

    it('should update the page after failing the IRMA flow', async () => {
        // Adjust mocked CreateIrmaSession to return a correct credentials
        const mockedCreateIrmaSession = createIrmaSession as jest.Mock<unknown>;
        mockedCreateIrmaSession.mockReturnValue(null);

        // Render demo 5
        await act(async () => await wrappedRender(<Demo5 />));

        // Fill in form
        const map = screen.getByTestId('map');
        await act(async () => await fireEvent.click(map));

        const report = screen.getByTestId('report');
        act(() => {
            fireEvent.change(report, { target: { value: 'Test report' } });
        });

        const mobileOption = screen.getByTestId('optionMobileNumberYes');
        act(() => {
            fireEvent.click(mobileOption);
        });

        const emailOption = screen.getByTestId('optionEmailYes');
        act(() => {
            fireEvent.click(emailOption);
        });

        // Trigger IRMA flow
        const QRCodeButton = screen.getByTestId('qrCodeButton');
        await act(async () => await fireEvent.click(QRCodeButton));

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
