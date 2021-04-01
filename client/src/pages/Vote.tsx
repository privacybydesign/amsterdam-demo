import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import IrmaCore from '@privacybydesign/irma-core';
import Web from '@privacybydesign/irma-web';
import Client from '@privacybydesign/irma-client';
import { IrmaAbortOnCancel } from '@services/createIrmaSession';

const HOLDER_ELEMENT_ID = 'irma-web-form';

export interface IQueryObj {
    [key: string]: string;
}

const createIrmaSession = async (objectToSign: IQueryObj): Promise<unknown> => {
    const irma = new IrmaCore({
        debugging: true,
        element: `#${HOLDER_ELEMENT_ID}`,

        session: {
            url: `demos/vote`,

            start: {
                url: (o: any) => `${o.url}/start`,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ msg: objectToSign })
            },

            mapping: {
                sessionPtr: (sessionPtr: any) => ({ ...sessionPtr, u: sessionPtr.u.replace(/\/irma/g, '/irma/irma') })
            },

            result: {
                url: () => `/demos/result`
            }
        }
    });

    irma.use(Client);
    irma.use(Web);
    irma.use(IrmaAbortOnCancel);

    try {
        const result = await irma.start();
        return result.disclosed;
    } catch (e) {
        return null;
    }
};

const VotePage: React.FC = () => {
    const queryObj: IQueryObj = useMemo(() => ({}), []);
    const query = new URLSearchParams(useLocation().search);
    query.forEach((value: string, key: string) => {
        queryObj[key] = value;
    });
    const [sessionResult, setSessionResult] = useState<unknown>(null);
    useEffect(() => {
        const fn = async () => {
            const response = await createIrmaSession(queryObj);
            setSessionResult(response);
        };
        fn();
    }, [queryObj]);

    return (
        <div className="vote-page">
            <h1>VOTE PAGE</h1>
            <section id={HOLDER_ELEMENT_ID}></section>
        </div>
    );
};

export default VotePage;
