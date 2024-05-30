import { RouterProvider } from "react-router-dom";
import { router } from './router';

function App() {
    // const { pathname } = useLocation();

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [pathname]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App;