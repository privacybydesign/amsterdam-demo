export interface ISignatureCredentialSet {
    type: string;
    value?: string | null;
}

export type CredentialSet = string[] | string[][] | string[][][] | ISignatureCredentialSet[][][];
export type CredentialSetFunction = (...args: any[]) => CredentialSet;

export interface IDemoCredentials {
    DEMO: CredentialSetFunction | CredentialSet;
    PRODUCTION: CredentialSetFunction | CredentialSet;
}
