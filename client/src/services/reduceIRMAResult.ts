interface IDisclosedCredentialSet {
    [index: number]: IDisclosedCredential;
}

interface IDisclosedCredential {
    id: string;
    rawvalue: string;
    value: { [key: string]: unknown };
    status: string;
    issuancetime: number;
}

const reduceIRMAResult = (disclosedCredentialSets: IDisclosedCredentialSet[]) => {
    let joinedResults = {};
    disclosedCredentialSets.forEach((conjunction: IDisclosedCredential[]) => {
        joinedResults = {
            ...joinedResults,
            ...conjunction.reduce(
                (acc, { id, rawvalue }) => ({ ...acc, [(id as any).match(/[^.]*$/g)[0]]: rawvalue }),
                {}
            )
        };
    });
    return joinedResults;
};

export default reduceIRMAResult;
