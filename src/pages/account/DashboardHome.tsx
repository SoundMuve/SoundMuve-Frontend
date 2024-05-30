import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import style from './../pricingStyles.module.css';
import HeaderComponent from '../../components/Header';
import FooterComponent from '../../components/Footer';



function DashboardHome() {

    return (
        <>
            <HeaderComponent />

            <Box sx={{bgcolor: "#000", color: "#fff", minHeight: "100vh", pt: 5, position: "relative", overflow: "hidden"}}>
                <>
                    <Box sx={{display: { xs: 'none', md: 'block' }}}>
                        <div className={style.topGradient}></div>
                        <div className={style.leftGradient}></div>
                        <div className={style.leftBottomGradient}></div>
                        <div className={style.rightTopGradient}></div>
                        <div className={style.rightBottom2Gradient}></div>
                        <div className={style.btnCenteredGradient}></div>
                        <div className={style.leftBottom2Gradient}></div>
                    </Box>

                    <Box sx={{display: { xs: 'block', md: 'none' }}}>
                        <div className={style.mobileLeftGradient}></div>
                        <div className={style.mobileRightGradient}></div>
                        <div className={style.mobileCenteredGradient}></div>
                    </Box>
                </>


                <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 5, md: 10}  }}>
                    <Typography sx={{
                        fontWeight: "bold",
                        fontSize: {xs: 25, md: 55},
                        textAlign: "center"
                    }}>
                        Welcome to dashboard HomePage
                    </Typography>

                </Box>
            </Box>

            <FooterComponent />
        </>
    )
}

export default DashboardHome;
