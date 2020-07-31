
import axios from 'axios';

export interface IProps {
  postcode: string;
}

const instance = axios.create({});

const getBuurtcombinatie = async (postcode: string): Promise<IProps> => {
  const response = await instance.get(`https://api.data.amsterdam.nl/dataselectie/bag/?postcode=${postcode}`);
  if (response.data.aggs_list.buurtcombinatie_naam) {
    const buurtcombinatieResponse = response.data.aggs_list.buurtcombinatie_naam;
    console.log('BUURTCOMBINATIE rsponse', buurtcombinatieResponse);
    console.log('aantal buurten in postcode', buurtcombinatieResponse.doc_count);
    console.log('array met alle buurten in de postcode', buurtcombinatieResponse.buckets);

    return buurtcombinatieResponse;
  }

  return null;
};

export default getBuurtcombinatie;