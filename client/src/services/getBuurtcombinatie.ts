
import axios from 'axios';

export interface IProps {
  postcode: string;
}

const instance = axios.create({});

const getBuurtcombinatie = async (postcode: string): Promise<IProps> => {
  const response = await instance.get(`https://api.data.amsterdam.nl/bag/v1.1/nummeraanduiding/?postcode=${postcode}`);

  if (response.data.results[0]._links.self.href) {
    const buurtcombinatieResponse = await instance.get(response.data.results[0]._links.self.href);
    console.log('----', buurtcombinatieResponse.data.buurtcombinatie.naam);
    if (buurtcombinatieResponse.data.buurtcombinatie.naam) {
      return buurtcombinatieResponse.data.buurtcombinatie.naam;
    }
  }

  return null;
};

export default getBuurtcombinatie;