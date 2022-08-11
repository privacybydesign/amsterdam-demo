import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import { setupIrmaMocks, setupMocks, wrappedRender } from '@test/utils';
import Demo1 from '@components/Demo1/Demo1';
import createIrmaSession from '@services/createIrmaSession';
import reduceIRMAResult from '@services/reduceIRMAResult';

// Setup all the generic mocks
setupMocks();

// MockcreateIrmaSession
jest.mock('@services/createIrmaSession');
jest.mock('@services/reduceIRMAResult');

describe('Demo1', () => {
    it('should render the initial header image', async () => {
        // Render demo 3
        await act(async (): Promise<any> => await wrappedRender(<Demo1 />));
        const headerImage: HTMLElement = await screen.findByTestId('headerImage');
        expect(headerImage).toMatchSnapshot();
    });

    it('should update the page after completing the IRMA flow for proving 18+', async () => {
        // Adjust mocked CreateIrmaSession to return a correct credential
        setupIrmaMocks(reduceIRMAResult, createIrmaSession, { over18: 'Yes' });

        jest.useFakeTimers();

        // Render demo 3
        await act(async (): Promise<any> => await wrappedRender(<Demo1 />));

        // Trigger IRMA flow
        const QRCodeButton = screen.getByTestId('qrCodeButton18');
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
        const hasResultAlert = screen.getByTestId('hasResultAlert');
        expect(hasResultAlert).toMatchSnapshot();
    });

    it('should update the page after completing the IRMA flow for not proving 18+', async () => {
        // Adjust mocked CreateIrmaSession to return a correct credential
        setupIrmaMocks(reduceIRMAResult, createIrmaSession, { over18: 'No' });

        jest.useFakeTimers();

        // Render demo 3
        await act(async (): Promise<any> => await wrappedRender(<Demo1 />));

        // Trigger IRMA flow
        const QRCodeButton = screen.getByTestId('qrCodeButton18');
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
        const hasResultAlert = screen.getByTestId('hasResultAlert');
        expect(hasResultAlert).toMatchSnapshot();
    });

    it('should update the page after completing the IRMA flow for proving 65+', async () => {
        // Adjust mocked CreateIrmaSession to return a correct credential
        setupIrmaMocks(reduceIRMAResult, createIrmaSession, { over65: 'Yes' });

        jest.useFakeTimers();

        await act(async (): Promise<any> => await wrappedRender(<Demo1 />));

        // Trigger IRMA flow
        const QRCodeButton = screen.getByTestId('qrCodeButton65');
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
        const hasResultAlert = screen.getByTestId('hasResultAlert');
        expect(hasResultAlert).toMatchSnapshot();
    });

    it('should update the page after completing the IRMA flow for not proving 65+', async () => {
        // Adjust mocked CreateIrmaSession to return a correct credential
        setupIrmaMocks(reduceIRMAResult, createIrmaSession, { over65: 'No' });

        jest.useFakeTimers();

        await act(async (): Promise<any> => await wrappedRender(<Demo1 />));

        // Trigger IRMA flow
        const QRCodeButton = screen.getByTestId('qrCodeButton65');
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
        const hasResultAlert = screen.getByTestId('hasResultAlert');
        expect(hasResultAlert).toMatchSnapshot();
    });

    it('should update the page after failing the IRMA flow', async () => {
        // Adjust mocked CreateIrmaSession to return a negative response
        setupIrmaMocks(reduceIRMAResult, createIrmaSession, null);
        jest.useFakeTimers();

        // Render demo 1
        await act(async (): Promise<any> => await wrappedRender(<Demo1 />));

        // Trigger IRMA flow
        const QRCodeButton = screen.getByTestId('qrCodeButton18');
        await act(async (): Promise<any> => await fireEvent.click(QRCodeButton));

        jest.advanceTimersByTime(110);

        await screen.findAllByRole('alert');

        // Check if demo notification is not visible
        const demoNotification = screen.queryByTestId('demoNotification');
        expect(demoNotification).toBeNull();

        // Check if correct alert is shown
        const hasErrorAlert = screen.getByTestId('hasErrorAlert');
        expect(hasErrorAlert).toMatchSnapshot();
    });
});
