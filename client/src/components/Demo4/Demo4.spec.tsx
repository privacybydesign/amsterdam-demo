import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import { setupIrmaMocks, setupMocks, wrappedRender } from '@test/utils';
import Demo4 from '@components/Demo4/Demo4';
import createIrmaSession from '@services/createIrmaSession';
import reduceIRMAResult from '@services/reduceIRMAResult';
import content from '@services/content-nl';

// Setup all the generic mocks
setupMocks();

// MockcreateIrmaSession
jest.mock('@services/createIrmaSession');
jest.mock('@services/reduceIRMAResult');

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

        // Expect error message to be shown.
        expect(
            screen.getByText('Vergeet niet om aan te geven of u eigenaar bent van de woning waar de geveltuin komt.')
        ).toBeInTheDocument();
    });

    it('should update the page after completing the IRMA flow', async () => {
        // Adjust mocked CreateIrmaSession to return a correct credentials
        setupIrmaMocks(reduceIRMAResult, createIrmaSession, {
            fullname: 'Test test',
            street: 'Teststraat',
            houseNumber: 100,
            zipcode: '1011PT',
            city: 'Amsterdam',
            mobilenumber: '0612345678',
            email: 'test@test.com'
        });

        // Need to use fakeTimers to control when results come in
        jest.useFakeTimers();

        // Render demo 4
        await act(async (): Promise<any> => await wrappedRender(<Demo4 />));

        await screen.findByText('Demo-aanvraag Geveltuin');

        screen.getByRole('group', {
            name: /bent u eigenaar van de woning waar de geveltuin komt\?/i
        });

        // Fill in form
        const radioOption = screen.getByText(content.demo4.form.optionYes);
        act(() => {
            fireEvent.click(radioOption);
        });

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
        // Adjust mocked CreateIrmaSession to return a correct credentials
        setupIrmaMocks(reduceIRMAResult, createIrmaSession, null);

        jest.useFakeTimers();

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

        jest.advanceTimersByTime(110);

        await screen.findAllByRole('alert');

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
