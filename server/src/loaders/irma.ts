import { ILoaderArgs } from '.';

// Setup IRMA libraries
// TODO: Change these to imports (and fix linting problems)
const IrmaBackend = require('@privacybydesign/irma-backend');
const IrmaJwt = require('@privacybydesign/irma-jwt');

export default ({ app, config }: ILoaderArgs) => {

    const irmaBackend = new IrmaBackend(config.irma, {
        debugging: true
    });
}