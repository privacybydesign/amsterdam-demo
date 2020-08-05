
import axios from 'axios';

interface GgwResult {
  buurtcombinatieNamen: string;
  ggwCode: string;
}

const instance = axios.create({});

const getGGW = async (postcode: string): Promise<GgwResult> => {
  const response = await instance.get(`https://api.data.amsterdam.nl/dataselectie/bag/?size=1&postcode=${postcode}`);

  let buurtcombinatieNamen;
  let ggwCode;

  if (response.data.aggs_list.buurtcombinatie_naam.doc_count > 0) {
    buurtcombinatieNamen = response.data.aggs_list.buurtcombinatie_naam.buckets.map(wijk => wijk.key).join(', ');
  }

  if (response.data.aggs_list.ggw_code.doc_count > 0) {
    ggwCode = response.data.aggs_list.ggw_code.buckets[0].key;
  }

  if (buurtcombinatieNamen && ggwCode) {
    return { buurtcombinatieNamen, ggwCode };
  }

  return null;
};

export default getGGW;
