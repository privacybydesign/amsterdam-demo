import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface IProps { }

const ScrollToTop: React.FC<IProps> = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
