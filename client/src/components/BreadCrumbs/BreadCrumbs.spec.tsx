import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import { wrappedRender } from '@test/utils';
import BreadCrumbs from '@components/BreadCrumbs/BreadCrumbs';

describe('BreadCrumbs', () => {
    it('should render 3 items correctly', async () => {
        wrappedRender(
            <BreadCrumbs>
                <BreadCrumbs.Item href="/">home</BreadCrumbs.Item>
                <BreadCrumbs.Item href="/innovatie">Innovatie</BreadCrumbs.Item>
                <BreadCrumbs.Item href="/innovatie/demo">Demo</BreadCrumbs.Item>
            </BreadCrumbs>
        );
        const el: HTMLElement = await screen.findByTestId('breadCrumbs');
        expect(el).toMatchSnapshot();
    });
});
