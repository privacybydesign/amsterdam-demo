import React from 'react';
import { screen, act } from '@testing-library/react';
import { setupMocks, wrappedRender } from '@test/utils';
import useIrmaSession from './useIrmaSession';

// Regression test for #49: "Disclose buttons no longer respond on mobile".
//
// On mobile the red disclose button is rendered as an anchor whose href is the
// `url` returned by useIrmaSession (the deep link into the Yivi app). That url
// is only populated by the yivi state-change callback. The @privacybydesign/yivi-*
// packages renamed the relevant state from `ShowingIrmaButton` to
// `ShowingYiviButton`; while the callback mapping still listened on the old name
// the url stayed empty, so tapping the button did nothing on mobile (desktop was
// unaffected because it shows a QR modal driven by the unchanged `ShowingQRCode`
// state).

const MOBILE_URL = 'https://irma.app/-/session#test-mobile-deep-link';

// Force the mobile (deep-link) flow. userAgent.ts exports the evaluated result
// of detecting the user agent; 'Android' makes isMobile() return true.
jest.mock('@services/userAgent', () => ({ __esModule: true, default: 'Android' }));

// Capture the callBackMapping handed to YiviCore and stub the session so it
// stays pending (we only care about the pre-disclosure button state). The yivi
// plugins are replaced with no-op classes.
const mockYivi: { callBackMapping?: Record<string, (payload?: any) => void> } = {};

jest.mock('@privacybydesign/yivi-client', () => ({ YiviClient: class {} }));
jest.mock('@privacybydesign/yivi-web', () => ({ YiviWeb: class {} }));
jest.mock('@privacybydesign/yivi-core', () => ({
    YiviCore: class {
        constructor(opts: any) {
            mockYivi.callBackMapping = opts.callBackMapping;
        }
        use(): void {
            /* no-op */
        }
        start(): Promise<unknown> {
            // Never resolves: keep the flow on the button/QR step.
            return new Promise(() => undefined);
        }
        abort(): void {
            /* no-op */
        }
    }
}));

setupMocks();

// Mirror how the IrmaStateChangeCallback plugin dispatches a yivi state change
// to the callback mapping.
const emit = (newState: string, payload?: any): void => {
    const mapping = mockYivi.callBackMapping ?? {};
    if (typeof mapping[newState] === 'function') {
        mapping[newState](payload);
    } else if (typeof mapping.rest === 'function') {
        mapping.rest();
    }
};

const Harness: React.FC = () => {
    const { url } = useIrmaSession({
        irmaQrId: 'irma-qr-test',
        demoPath: 'demos/demo1/18',
        useDemoCredentials: true,
        // Matches alwaysShowQRCode: isMobile() on every demo page.
        alwaysShowQRCode: true,
        resultCallback: () => undefined
    });
    return <a data-testid="discloseLink" href={url} />;
};

describe('useIrmaSession mobile disclose button (#49)', () => {
    afterEach(() => {
        mockYivi.callBackMapping = undefined;
    });

    it('exposes a callback for the yivi ShowingYiviButton state', async () => {
        await act(async (): Promise<any> => await wrappedRender(<Harness />));

        expect(typeof mockYivi.callBackMapping?.ShowingYiviButton).toBe('function');
        // The old (pre-migration) state name must not linger.
        expect(mockYivi.callBackMapping?.ShowingIrmaButton).toBeUndefined();
    });

    it('sets the deep-link url so the mobile button works', async () => {
        await act(async (): Promise<any> => await wrappedRender(<Harness />));

        const link = screen.getByTestId('discloseLink');
        // Before the disclose flow reaches the button state there is no href.
        expect(link).not.toHaveAttribute('href');

        act(() => {
            emit('ShowingYiviButton', { mobile: MOBILE_URL });
        });

        // With the fix the url is populated; before the fix it stayed empty and
        // tapping the button did nothing.
        expect(link).toHaveAttribute('href', MOBILE_URL);
    });
});
