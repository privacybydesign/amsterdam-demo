
import axios from 'axios';

export interface Iprops {
  buckets: array;
  doc_count: number;
}

const instance = axios.create({});

const getGGW = async (postcode: string): Promise<Iprops> => {
  const response = await instance.get(`https://api.data.amsterdam.nl/dataselectie/bag/?size=1&postcode=${postcode}`);
  if (response.data.aggs_list.ggw_code) {
    const ggwResponse = response.data.aggs_list.ggw_code;
    console.log('GGW rsponse', ggwResponse);
    console.log('aantal ggws in postcode', ggwResponse.doc_count);
    console.log('array met alle ggw-codes in de postcode', ggwResponse.buckets);

    return ggwResponse;
  }

  return null;
};

export default getGGW;
