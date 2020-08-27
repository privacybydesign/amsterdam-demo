// import React from 'react';
// import Demo3 from './Demo3';
// import { withAppContext } from '../../test/utils';
// import createIrmaSession from '@services/createIrmaSession';
// import { render, fireEvent, act } from '@testing-library/react';

// jest.mock('@services/createIrmaSession');

// interface Itest {
// fullname?: string;
// bsn?: string;
// }

describe('Demo3', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should render correctly in demo result page', async () => {
        // const test = createIrmaSession as jest.Mock<unknown>;
        // await createIrmaSession.mockImplementation(() =>
        //     Promise.resolve({
        //         fullname: 'yooo',
        //         bsn: '1234567'
        //     })
        // );
        // getConfig.mockImplementation(() => Promise.resolve({
        //   foo: 42
        // }));
        // test.mockResolvedValue({
        //   fullname: 'yooo',
        //   bsn: '1234567'
        // });
        // (getConfig as jest.Mock<Itest>).mockImplementation(() => Promise.resolve(({
        //   yo: 42
        // })));
        /*const { container, asFragment, debug, queryAllByText, getByTestId } = render(withAppContext(<Demo3 />));

        act(() => {
            fireEvent.click(getByTestId('qrCodeButton'));
        });

        act(() => {
            expect(queryAllByText('Demo 3: Inloggen met IRMA').length).toEqual(2);
        });*/
    });
});
