// import { Pagination, Autoplay, Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import style from './pricingStyles.module.css';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button } from "@mui/material";



const musicDSPlogos = [
    {
        src: "/src/assets/images/spotify.png",
        alt: "spotify logo" 
    },
    {
        src: "/src/assets/images/apple.png",
        alt: "apple music logo" 
    },
    {
        src: "/src/assets/images/amazon.png",
        alt: "amazon music logo" 
    },
    {
        src: "/src/assets/images/tiktok.png",
        alt: "tiktok logo" 
    },
    {
        src: "/src/assets/images/youtube.png",
        alt: "youtube muisc logo" 
    },
    {
        src: "/src/assets/images/beatport.png",
        alt: "beatport logo" 
    },
];

function Pricing() {
    const isMediumScreen = useMediaQuery('(min-width: 960px)');


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
                    <Box>
                        <Typography sx={{
                            fontWeight: "900",
                            fontSize: {xs: 30, md: 50},
                            textAlign: "center", lineHeight: 1.2,
                            mt: 7,
                            mb: {xs: 2, md: 7}
                        }}>
                            SoundMuve Pricing & Plans
                        </Typography>

                        <Typography sx={{
                            fontWeight: "400",
                            fontSize: 13,
                            display: {xs: "block", md: "none"}
                        }}>
                            Distribute music to over 150 digital stores across 200 countries and territories worldwide. 
                            Get daily sales trends for Amazon, iTunes, Apple Music, and Spotify, 
                            and keep every cent of what you're owed from sales and streams.
                        </Typography>

                        <Box className={isMediumScreen ? style.dsplogoContainer : ''} sx={{ px: {xs: 0, md: 2}, my: 10 }}>
                            <Swiper
                                autoplay={true}
                                loop
                                // speed={100}
                                spaceBetween={50}
                                slidesPerView={2.4}
                                // navigation
                                // modules={[Navigation, Pagination, Scrollbar, A11y]}
                                breakpoints={{
                                    // when window width is >= 320px
                                    320: {
                                        slidesPerView: 2.5,
                                        // spaceBetween: 20
                                    },
                                    450: {
                                    slidesPerView: 3.5,
                                    // spaceBetween: 20
                                    },
                                    // sm, small
                                    600: {
                                        slidesPerView: 4.5,
                                        // spaceBetween: 40
                                    },
                                    // md, medium
                                    900: {
                                        slidesPerView: 5.5,
                                        // spaceBetween: 40
                                    },
                                    // lg, large
                                    1200:{
                                        slidesPerView: 6
                                    }

                                }}
                                // modules={[Navigation, Autoplay]}
                                // className="mySwiper"
                            >
                                {musicDSPlogos.map((dspLogo, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <Box sx={{p: {xs: 0, md: 5} }}>
                                                <img src={dspLogo.src} alt={dspLogo.alt} />
                                            </Box>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </Box>
                    
                        <Typography sx={{
                            fontWeight: "900",
                            fontSize: {xs: 20, md: 35},
                            textAlign: "center"
                        }}>
                            Digital Music Distribution Stores
                        </Typography>

                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 5
                        }}>
                            <Box sx={{
                                maxWidth: 460,
                                width: "100%",
                                borderRadius: 2,
                                border: "1px solid #fff",
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 2,
                                alignItems: "center",
                                textAlign: "center",
                                p: 1,
                                flexWrap: "nowrap"
                            }}>
                                <Typography sx={{
                                    bgcolor: "#fff",
                                    color: "#000",
                                    p: 1.5,
                                    borderRadius: 2,
                                    flexGrow: 1,
                                    fontSize: {xs: 13, md: 25},
                                    fontWeight: "900"
                                }}>
                                    Unlimited plan
                                </Typography>

                                <Typography sx={{
                                    // bgcolor: "#fff",
                                    color: "#fff",
                                    p: 1.5,
                                    borderRadius: 2,
                                    flexGrow: 1,
                                    fontSize: {xs: 13, md: 25},
                                    fontWeight: "900"
                                }}>
                                    Pay per release
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{my: 10}}>
                            <Grid container spacing={2} position="unset">
                                <Grid item
                                    xs={12} md={4}
                                    // sx={{ alignSelf: "center" }}
                                >
                                    <Box sx={{
                                        bgcolor: "#fff", color: "#000", p: 2, 
                                        borderRadius: 3
                                    }}>
                                        <Typography sx={{
                                            fontSize: 20,
                                            fontWeight: "bolder"
                                        }}>
                                            Basic plan
                                        </Typography>

                                        <Typography sx={{
                                            fontSize: {xs: 35, md: 45},
                                            fontWeight: "bold",
                                            my: 2
                                        }}>
                                            $10
                                            <span style={{
                                                fontWeight: "400",
                                                fontSize: 16
                                            }}> Per year </span>
                                        </Typography>

                                                    
                                        <Button variant="contained" 
                                            type="button" fullWidth
                                            sx={{ 
                                                bgcolor: "#000000",
                                                "&:hover": {
                                                    bgcolor: "#000000"
                                                },
                                                "&:active": {
                                                    bgcolor: "#000000"
                                                },
                                                "&:focus": {
                                                    bgcolor: "#000000"
                                                },
                                                color: "#fff",
                                                // borderRadius: "12px",
                                                my: 2
                                            }}
                                        >
                                            Get started
                                        </Button>

                                        <Typography sx={{
                                            fontSize: 20,
                                            fontWeight: "bolder",
                                        }}>
                                            Features
                                        </Typography>

                                        <ul className={style.pricingFeatures}>
                                            <li >
                                                Unlimited Releases to all Social Platforms
                                            </li>
                                            <li>
                                                TuneCore Rewards Master Classes
                                            </li>
                                            <li>
                                                Official Sales Reports
                                            </li>
                                            <li>
                                                Schedule Your Own Release Date
                                            </li>
                                            <li>
                                                Unlimited Releases to all Digital Stores
                                            </li>
                                            <li>
                                                100% Revenue from Digital Stores
                                            </li>
                                            <li>
                                                Spotify Verified Artist Checkmark
                                            </li>
                                            <li>
                                                Apple Music for Artists Verification
                                            </li>
                                        </ul>
                                    </Box>
                                </Grid>
                                
                                <Grid item
                                    xs={12} md={4}
                                    // sx={{ alignSelf: "center" }}
                                >
                                    <Box sx={{
                                        bgcolor: "#fff", color: "#000", p: 2, 
                                        borderRadius: 3
                                    }}>
                                        <Typography sx={{
                                            fontSize: 20,
                                            fontWeight: "bolder"
                                        }}>
                                            Business plan
                                        </Typography>

                                        <Typography sx={{
                                            fontSize: {xs: 35, md: 45},
                                            fontWeight: "bold",
                                            my: 2
                                        }}>
                                            $30
                                            <span style={{
                                                fontWeight: "400",
                                                fontSize: 16
                                            }}> Per year </span>
                                        </Typography>

                                                    
                                        <Button variant="contained" 
                                            type="button" fullWidth
                                            sx={{ 
                                                bgcolor: "#000000",
                                                "&:hover": {
                                                    bgcolor: "#000000"
                                                },
                                                "&:active": {
                                                    bgcolor: "#000000"
                                                },
                                                "&:focus": {
                                                    bgcolor: "#000000"
                                                },
                                                color: "#fff",
                                                // borderRadius: "12px",
                                                my: 2
                                            }}
                                        >
                                            Get started
                                        </Button>

                                        <Typography sx={{
                                            fontSize: 20,
                                            fontWeight: "bolder",
                                        }}>
                                            Features
                                        </Typography>

                                        <ul className={style.pricingFeatures}>
                                            <li >
                                                Unlimited Releases to all Social Platforms
                                            </li>
                                            <li>
                                                TuneCore Rewards Master Classes
                                            </li>
                                            <li>
                                                Official Sales Reports
                                            </li>
                                            <li>
                                                Schedule Your Own Release Date
                                            </li>
                                            <li>
                                                Unlimited Releases to all Digital Stores
                                            </li>
                                            <li>
                                                100% Revenue from Digital Stores
                                            </li>
                                            <li>
                                                Spotify Verified Artist Checkmark
                                            </li>
                                            <li>
                                                Apple Music for Artists Verification
                                            </li>
                                            <li>
                                                Artist Revenue Splits
                                            </li>
                                            <li>
                                                Customer Service Response Tim
                                            </li>
                                            <li>
                                                Store Automator
                                            </li>
                                            <li>
                                                Daily Trend Reports
                                            </li>
                                            <li>
                                                Access to Exclusive Partnerships
                                            </li>
                                        </ul>
                                    </Box>
                                </Grid>

                                <Grid item
                                    xs={12} md={4}
                                    // sx={{ alignSelf: "center" }}
                                >
                                    <Box sx={{
                                        bgcolor: "#fff", color: "#000", p: 2, 
                                        borderRadius: 3
                                    }}>
                                        <Typography sx={{
                                            fontSize: 20,
                                            fontWeight: "bolder"
                                        }}>
                                            Enterprise plan
                                        </Typography>

                                        <Typography sx={{
                                            fontSize: {xs: 35, md: 45},
                                            fontWeight: "bold",
                                            my: 2
                                        }}>
                                            $60
                                            <span style={{
                                                fontWeight: "400",
                                                fontSize: 16
                                            }}> Per year </span>
                                        </Typography>

                                                    
                                        <Button variant="contained" 
                                            type="button" fullWidth
                                            sx={{ 
                                                bgcolor: "#000000",
                                                "&:hover": {
                                                    bgcolor: "#000000"
                                                },
                                                "&:active": {
                                                    bgcolor: "#000000"
                                                },
                                                "&:focus": {
                                                    bgcolor: "#000000"
                                                },
                                                color: "#fff",
                                                // borderRadius: "12px",
                                                my: 2
                                            }}
                                        >
                                            Get started
                                        </Button>

                                        <Typography sx={{
                                            fontSize: 20,
                                            fontWeight: "bolder",
                                        }}>
                                            Features
                                        </Typography>
                                        
                                        <ul className={style.pricingFeatures}>
                                            <li >
                                                Unlimited Releases to all Social Platforms
                                            </li>
                                            <li>
                                                TuneCore Rewards Master Classes
                                            </li>
                                            <li>
                                                Official Sales Reports
                                            </li>
                                            <li>
                                                Schedule Your Own Release Date
                                            </li>
                                            <li>
                                                Unlimited Releases to all Digital Stores
                                            </li>
                                            <li>
                                                100% Revenue from Digital Stores
                                            </li>
                                            <li>
                                                Spotify Verified Artist Checkmark
                                            </li>
                                            <li>
                                                Apple Music for Artists Verification
                                            </li>
                                            <li>
                                                Artist Revenue Splits
                                            </li>
                                            <li>
                                                Customer Service Response Tim
                                            </li>
                                            <li>
                                                Store Automator
                                            </li>
                                            <li>
                                                Daily Trend Reports
                                            </li>
                                            <li>
                                                Access to Exclusive Partnerships
                                            </li>
                                            <li>
                                                Promotional Opportunities
                                            </li>
                                            <li>
                                                Pro Panels & Expert Advice Sessions
                                            </li>
                                            <li>
                                                Custom Label Name
                                            </li>
                                            <li>
                                                Use Your Own UPC
                                            </li>
                                            <li>
                                                Release Level Country Restrictions
                                            </li>
                                            <li>
                                                Recording Location
                                            </li>
                                            <li>
                                                Cost Per Additional Artist Profile
                                            </li>
                                        </ul>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                    </Box>
                </Container>
        
                <Box className={style.bottomContainer} sx={{textAlign: "center", py: 10}}>
                    <Container>
                        <Typography sx={{
                            fontWeight: "900",
                            fontSize: {xs: 18, md: 25},
                            textAlign: "center"
                        }}>
                            Sign up for free while you think of a plan that suits you
                        </Typography>
        
                        <Button variant="contained" 
                            type="button" 
                            sx={{ 
                                bgcolor: "#644986",
                                "&:hover": {
                                    bgcolor: "#644986"
                                },
                                "&:active": {
                                    bgcolor: "#644986"
                                },
                                "&:focus": {
                                    bgcolor: "#644986"
                                },
                                color: "#fff",
                                borderRadius: "12px",
                                my: 2
                            }}
                        >
                            Sign up
                        </Button>
                    </Container>
                </Box>
            </Box>

            <FooterComponent />
        </>
    )
}

export default Pricing;
