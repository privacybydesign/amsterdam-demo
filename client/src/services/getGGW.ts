import axios from 'axios';

interface GgwResult {
    buurtcombinatieNamen: string;
    ggwCode: string;
    ggwNaam: string;
}

const BASE = 'https://api.data.amsterdam.nl/v1';

const getGGW = async (postcode: string): Promise<GgwResult | null> => {
    // Step 1: find a verblijfsobject for the postcode.
    const nraResponse = await axios.get(
        `${BASE}/bag/nummeraanduidingen/?postcode=${postcode}&_pageSize=1`
    );

    const items = nraResponse.data._embedded?.nummeraanduidingen;
    if (!items?.length) return null;

    const vboHref: string | undefined = items[0]._links?.adresseertVerblijfsobject?.href;
    if (!vboHref) return null;

    const vboId = vboHref.match(/verblijfsobjecten\/(\d+)/)?.[1];
    if (!vboId) return null;

    // Step 2: resolve buurt → wijk (buurtcombinatie) + ggwgebied in one call.
    const vboResponse = await axios.get(
        `${BASE}/bag/verblijfsobjecten/${vboId}?_expandScope=ligtInBuurt,ligtInBuurt.ligtInWijk,ligtInBuurt.ligtInGgwgebied`
    );

    const buurt = vboResponse.data._embedded?.ligtInBuurt;
    if (!buurt) return null;

    const wijk = buurt._embedded?.ligtInWijk;
    const ggwgebied = buurt._embedded?.ligtInGgwgebied;

    const buurtcombinatieNamen: string = wijk?.naam;
    if (!buurtcombinatieNamen) return null;

    return {
        buurtcombinatieNamen,
        ggwCode: ggwgebied?.code ?? '',
        ggwNaam: ggwgebied?.naam ?? ''
    };
};

export default getGGW;
