import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import { setupIrmaMocks, setupMocks, wrappedRender } from '@test/utils';
import Demo2 from '@components/Demo2/Demo2';
import createIrmaSession from '@services/createIrmaSession';
import reduceIRMAResult from '@services/reduceIRMAResult';
import getGGW from '@services/getGGW';

// Setup all the generic mocks
setupMocks();

// MockcreateIrmaSession
jest.mock('@services/createIrmaSession');
jest.mock('@services/reduceIRMAResult');
jest.mock('@services/getGGW');

describe('Demo2', () => {
    it('should render the initial header image', async () => {
        // Render demo 3
        await act(async (): Promise<any> => await wrappedRender(<Demo2 />));
        const headerImage: HTMLElement = await screen.findByTestId('headerImage');
        expect(headerImage).toMatchSnapshot();
    });

    it('should update the page after completing the IRMA flow for proving 18+ and living in Amsterdam', async () => {
        // Adjust mocked CreateIrmaSession to return a correct credential
        setupIrmaMocks(reduceIRMAResult, createIrmaSession, {
            over18: 'Yes',
            zipcode: '1011PT'
        });

        jest.useFakeTimers();

        // Adjust mocked getGGW to return a proper response in Amsterdam
        const mockedGetGGW = getGGW as jest.Mock<unknown>;
        mockedGetGGW.mockReturnValue({
            buurtcombinatieNamen: 'Nieuwmarkt/Lastage',
            ggwCode: 'DX02',
            ggwNaam: 'Centrum-Oost'
        });

        // Render demo 3
        await act(async (): Promise<any> => await wrappedRender(<Demo2 />));

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
        const hasResultAlert = screen.getByTestId('hasResultAlert');
        expect(hasResultAlert).toMatchSnapshot();
    });

    it('should update the page after completing the IRMA flow for proving 18+ and not living in Amsterdam', async () => {
        // Adjust mocked CreateIrmaSession to return a correct credential
        setupIrmaMocks(reduceIRMAResult, createIrmaSession, {
            over18: 'Yes',
            zipcode: '3011AA'
        });

        jest.useFakeTimers();

        // Adjust mocked getGGW to return a proper response outside Amsterdam
        const mockedGetGGW = getGGW as jest.Mock<unknown>;
        mockedGetGGW.mockReturnValue(null);

        // Render demo 3
        await act(async (): Promise<any> => await wrappedRender(<Demo2 />));

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
        const hasResultAlert = screen.getByTestId('hasResultAlert');
        expect(hasResultAlert).toMatchSnapshot();
    });

    it('should update the page after completing the IRMA flow for not proving 18+ and living in Amsterdam', async () => {
        // Adjust mocked CreateIrmaSession to return a correct credential
        setupIrmaMocks(reduceIRMAResult, createIrmaSession, {
            over18: 'No',
            zipcode: '1011PT'
        });

        jest.useFakeTimers();

        // Adjust mocked getGGW to return a proper response in Amsterdam
        const mockedGetGGW = getGGW as jest.Mock<unknown>;
        mockedGetGGW.mockReturnValue({
            buurtcombinatieNamen: 'Nieuwmarkt/Lastage',
            ggwCode: 'DX02',
            ggwNaam: 'Centrum-Oost'
        });

        // Render demo 3
        await act(async (): Promise<any> => await wrappedRender(<Demo2 />));

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
        const hasResultAlert = screen.getByTestId('hasResultAlert');
        expect(hasResultAlert).toMatchSnapshot();
    });

    it('should update the page after completing the IRMA flow for not proving 18+ and not living in Amsterdam', async () => {
        // Adjust mocked CreateIrmaSession to return a correct credential
        setupIrmaMocks(reduceIRMAResult, createIrmaSession, {
            over18: 'No',
            zipcode: '3011AA'
        });

        jest.useFakeTimers();

        // Adjust mocked getGGW to return a proper response in Amsterdam
        const mockedGetGGW = getGGW as jest.Mock<unknown>;
        mockedGetGGW.mockReturnValue(null);

        // Render demo 3
        await act(async (): Promise<any> => await wrappedRender(<Demo2 />));

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
        const hasResultAlert = screen.getByTestId('hasResultAlert');
        expect(hasResultAlert).toMatchSnapshot();
    });

    it('should update the page after failing the IRMA flow', async () => {
        // Adjust mocked CreateIrmaSession to return a negative response
        setupIrmaMocks(reduceIRMAResult, createIrmaSession, null);

        // Render demo 2
        await act(async (): Promise<any> => await wrappedRender(<Demo2 />));

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
