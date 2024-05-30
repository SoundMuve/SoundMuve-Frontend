import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <main>
            <Outlet />
        </main>
    );
    // return children;
};

export default ScrollToTop;