import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import HeaderComponent from '../../components/Header';
import FooterComponent from '../../components/Footer';
import style from '../pricingStyles.module.css';



function Signup() {


    return (
        <>
            <HeaderComponent />

            <Box sx={{bgcolor: "#000", color: "#fff", pt: 5, position: "relative", overflow: "hidden"}}>
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


                <Container>
                    <Box sx={{py: 30}}>
                        <Typography>
                            hello
                        </Typography>

                    </Box>
                </Container>
            </Box>

            <FooterComponent />
        </>
    )
}

export default Signup;
