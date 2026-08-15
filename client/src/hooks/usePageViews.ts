import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
    const location = useLocation();

    // react-router v6+ removed useHistory/history.listen; re-run the tracking side-effect
    // on the initial render and on every subsequent location change instead.
    useEffect(() => {
        updateLocation();
    }, [location]);
};
