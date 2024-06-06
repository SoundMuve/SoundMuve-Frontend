import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AccountWrapper from '../../components/AccountWrapper';


function DashboardHome() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/account/artist", {replace: true});
        // redirect("/account/home");
        // return <Navigate replace  to={"/account/"} />;
    }, []);
    

    return (
        <AccountWrapper>
            <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 5, md: 10}  }}>
                <Typography sx={{
                    fontWeight: "bold",
                    fontSize: {xs: 25, md: 55},
                    textAlign: "center"
                }}>
                    Welcome to dashboard
                </Typography>

            </Box>
        </AccountWrapper>
    )
}

export default DashboardHome;
