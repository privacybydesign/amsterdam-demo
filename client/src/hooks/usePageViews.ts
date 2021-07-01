import { useHistory } from 'react-router-dom';

let prevURL: string | null = null;

function updateLocation() {
    const siteImprov = (window as any)._sz;
    if (siteImprov) {
        siteImprov.push([
            'trackdynamic',
            {
                url: document.URL,
                ref: prevURL,
                title: document.URL
            }
        ]);
    }
    prevURL = document.URL;
}

export default (): void => {
    const history = useHistory();
    history.listen(updateLocation);
    updateLocation();
};
