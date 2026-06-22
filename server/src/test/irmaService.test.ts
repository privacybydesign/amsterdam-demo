/**
 * The IRMA backend is constructed with a `debugging` flag that, when on, writes
 * verbose request/response payloads to stdout. That logging must be off in
 * production (see issue #27) and gated on NODE_ENV. These tests assert the flag
 * passed to the IrmaBackend constructor follows NODE_ENV.
 */

// Capture the options the service passes to the IrmaBackend constructor.
const irmaBackendCalls: Array<{ config: unknown; options: { debugging: boolean } }> = [];

jest.mock('@privacybydesign/irma-backend', () =>
    jest.fn().mockImplementation((config: unknown, options: { debugging: boolean }) => {
        irmaBackendCalls.push({ config, options });
        return {};
    })
);

// irma-jwt is required at module load; a no-op mock keeps the test self-contained.
jest.mock('@privacybydesign/irma-jwt', () => jest.fn());

const instantiateWithNodeEnv = (nodeEnv: string | undefined): { debugging: boolean } => {
    irmaBackendCalls.length = 0;
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = nodeEnv;

    let options: { debugging: boolean };
    jest.isolateModules(() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const IrmaService = require('@services/IrmaService').default;
        new IrmaService();
        options = irmaBackendCalls[irmaBackendCalls.length - 1].options;
    });

    process.env.NODE_ENV = originalNodeEnv;
    return options!;
};

describe('IrmaService backend debugging flag', () => {
    it('disables debugging when NODE_ENV is production', () => {
        expect(instantiateWithNodeEnv('production').debugging).toBe(false);
    });

    it('enables debugging in development', () => {
        expect(instantiateWithNodeEnv('development').debugging).toBe(true);
    });

    it('enables debugging when NODE_ENV is unset', () => {
        expect(instantiateWithNodeEnv(undefined).debugging).toBe(true);
    });
});
