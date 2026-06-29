import React from 'react';
import 'jest-styled-components';
import { setupMocks, wrappedRender } from '@test/utils';
import IrmaSessionModal from '@components/IrmaSessionModal/IrmaSessionModal';

// Setup all the generic mocks
setupMocks();

describe('IrmaSessionModal', () => {
    // Regression test for #51: "Black text not conform WCAG guidelines".
    // The yivi-web "Open Yivi-app" call-to-action is an <a class="yivi-web-button">
    // with a red background. A broad `a { color: <dark> !important }` rule used to
    // force dark text on it, producing black-on-red which fails WCAG 2.2 AA contrast.
    it('renders the yivi-web "Open Yivi-app" button label in white for contrast on red', () => {
        wrappedRender(<IrmaSessionModal showModal QRIsShowing closeModal={jest.fn()} irmaQrId="test-irma-qr" />);

        const irmaWebElement = document.getElementById('test-irma-qr');
        expect(irmaWebElement).not.toBeNull();

        // The red "Open Yivi-app" anchor must keep white text.
        expect(irmaWebElement).toHaveStyleRule('color', '#ffffff !important', {
            modifier: 'a.yivi-web-button'
        });
    });
});
