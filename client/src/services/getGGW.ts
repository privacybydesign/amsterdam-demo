
import axios from 'axios';

interface Iprops {
}

const instance = axios.create({});

const getGGW = async (postcode: string): Promise<Iprops> => {
  const response = await instance.get(`https://api.data.amsterdam.nl/dataselectie/bag/?size=1&postcode=${postcode}`);

  let buurtcombinatie;
  let ggw;

  if (response.data.aggs_list.buurtcombinatie_naam.doc_count > 0) {
    buurtcombinatie = response.data.aggs_list.buurtcombinatie_naam.buckets.map(wijk => wijk.key).join(', ');
  }

  if (response.data.aggs_list.ggw_code.doc_count > 0) {
    ggw = response.data.aggs_list.ggw_code.buckets[0].key;
  }

  if (buurtcombinatie && ggw) {
    return { buurtcombinatie, ggw };
  }

  return null;
};

export default getGGW;
