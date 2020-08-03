
import axios from 'axios';

export interface IProps {
  postcode: string;
}

const instance = axios.create({});

const getGGW = async (postcode: string): Promise<IProps> => {
  const response = await instance.get(`https://api.data.amsterdam.nl/dataselectie/bag/?size=1&postcode=${postcode}`);
  if (response.data.aggs_list.ggw_naam) {
    const ggwResponse = response.data.aggs_list.ggw_naam;
    console.log('WIJK rsponse', ggwResponse);
    console.log('aantal wijken in postcode', ggwResponse.doc_count);
    console.log('array met alle wijken in de postcode', ggwResponse.buckets);

    return ggwResponse;
  }

  return null;
};

export default getGGW;
