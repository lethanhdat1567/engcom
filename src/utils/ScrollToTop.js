import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const topElement = document.getElementById('top');
        if (topElement) {
            window.scrollTo({ top: 0 });
        }
    }, [pathname]);

    return <div id="top" />;
};

export default ScrollToTop;
