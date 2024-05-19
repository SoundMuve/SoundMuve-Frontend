import { Link, useNavigate } from 'react-router-dom';

// import { Pagination, Autoplay, Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery  from '@mui/material/useMediaQuery';

import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import style from './homeStyles.module.css';
import ArtistTestimony from '../components/ArtistTestimony';
 
import rema from "./../assets/images/rema.jpg";
import limoblaze from "./../assets/images/limoblaze.jpg";
import burnaBoy from "./../assets/images/burnaBoy.jpg";
import AEO from "./../assets/images/AEO.jpg";
import ayraStar from "./../assets/images/ayraStar.jpg";
import davido from "./../assets/images/davido.jpg";

import spotify from "./../assets/images/spotify.png";
import apple from "./../assets/images/apple.png";
import amazon from "./../assets/images/amazon.png";
import tiktok from "./../assets/images/tiktok.png";
import youtube from "./../assets/images/youtube.png";
import beatport from "./../assets/images/beatport.png";

import section1home from "./../assets/images/section1home.png";
import section4home from "./../assets/images/section4home.png";
import section5home from "./../assets/images/section5home.png";
import section6home from "./../assets/images/section6home.png";


const ArtistTestimonies = [
    {
        img: rema,
        title: 'Rema',
        author: '@rema',
    },
    {
        img: limoblaze,
        title: 'Limoblaze',
        author: '@limoblaze',
    },
    {
        img: burnaBoy,
        title: 'Burnaboy',
        author: '@burnaBoy',
    },
    {
        img: AEO,
        title: 'AEO',
        author: '@AEO',
    },
    {
        img: ayraStar,
        title: 'Ayra star',
        author: '@ayraStar',
    },
    {
        img: davido,
        title: 'Davido',
        author: '@davido',
    },
];

const musicDSPlogos = [
    {
        src: spotify,
        alt: "spotify logo" 
    },
    {
        src: apple,
        alt: "apple music logo" 
    },
    {
        src: amazon,
        alt: "amazon music logo" 
    },
    {
        src: tiktok,
        alt: "tiktok logo" 
    },
    {
        src: youtube,
        alt: "youtube muisc logo" 
    },
    {
        src: beatport,
        alt: "beatport logo" 
    },
]

export default function Home() {
    const navigate = useNavigate();
    const isMediumScreen = useMediaQuery('(min-width: 960px)');

    return (
        <>
            <HeaderComponent />

            <Box sx={{bgcolor: "#000", color: "#fff", pt: 3, position: "relative", overflow: "hidden"}}>
                <Box sx={{display: { xs: 'none', md: 'block' }}}>
                    <div className={style.topGradient}></div>
                    <div className={style.leftGradient}></div>
                    <div className={style.rightTopGradient}></div>
                    <div className={style.rightBottomGradient}></div>
                </Box>

                <Box sx={{display: { xs: 'block', md: 'none' }}}>
                    <div className={style.mobileLeftGradient}></div>
                    <div className={style.mobileRightGradient}></div>
                    <div className={style.mobileCenteredGradient}></div>
                </Box>

                <Box sx={{pt: 5}}>
                    <Grid container spacing={2} position="unset" >
                        <Grid item
                            xs={12} md={6}
                            sx={{ alignSelf: "center", textAlign: {xs: "center", md: "left"}, color: "#fff" }}
                        >
                            <Box sx={{px: {xs: 2, md: 5, lg: 12}}}>
                                <Typography sx={{
                                    fontWeight: "900",
                                    fontSize: {xs: 25, md: 35},
                                    lineHeight: 1
                                }}>
                                    Make the most of your music on Soundmuve
                                </Typography>

                                <Typography sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: 13, md: 16},
                                    pt: 2
                                }}>
                                    Increase the reach of your music across the most popular stores & platforms like Spotify, 
                                    Apple Music, TikTok, YouTube and many more.
                                </Typography>

                                <Box sx={{
                                    display: "flex", 
                                    justifyContent: {xs: "center", md: "flex-start"}, 
                                    alignItems: "center", 
                                    flexDirection: "row",
                                    gap: {xs: 1, md: 3}, 
                                    flexWrap: "wrap", 
                                    mt: {xs: 3, md: 5}
                                }}>

                                    <Button 
                                        onClick={() => navigate("/auth/signup")} 
                                        variant="contained" 
                                        sx={{
                                            background: "#644986",
                                            color: "#fff",
                                            outline: "none",
                                            boxShadow: "none",
                                            padding: {xs: "10px", md: "15px"},
                                            borderRadius: {xs: "8px", md: "14px"},
                                            fontSize: {xs: "13px", md: "15px"},
                                            fontWeight: "900",
                                            '&:active': {
                                                backgroundColor: '#644986',
                                            },
                                            '&:focus': {
                                                backgroundColor: '#644986',
                                            },
                                            '&:hover': {
                                                backgroundColor: '#644986',
                                            },
                                        }}
                                    >
                                        Sign up now
                                    </Button>

                                    <Button variant="contained" 
                                        sx={{
                                            background: "#797979",
                                            color: "#5F5D5D",
                                            outline: "none",
                                            boxShadow: "none",
                                            padding: {xs: "10px", md: "15px"},
                                            borderRadius: {xs: "8px", md: "14px"},
                                            fontSize: {xs: "13px", md: "15px"},
                                            fontWeight: "900",
                                            '&:active': {
                                                backgroundColor: '#797979',
                                            },
                                            '&:focus': {
                                                backgroundColor: '#797979',
                                            },
                                            '&:hover': {
                                                backgroundColor: '#797979',
                                            },
                                        }}
                                    >
                                        Download Soundmuve
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item
                            xs={12} md={6}
                            sx={{ alignSelf: "center" }}
                        >
                            <Box sx={{
                                mt: {xs: 5, md: 1}
                            }}>
                                <img src={section1home} alt="section6home"  style={{width: "100%"}} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{position: "relative", mb: {xs: 5, md: 1}, bottom: {xs: 5, md: 45} }}>
                    <Container>
                        <Box className={isMediumScreen ? style.dsplogoContainer : ''} sx={{ px: {xs: 0, md: 2} }}>
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
                    </Container>
                </Box>

                <Box>
                    <Container>
                        <Grid container spacing={2} position="unset" >
                            <Grid item
                                xs={12} md={6}
                                sx={{ 
                                    alignSelf: "center", p: 5,
                                    textAlign: {xs: "center", md: "left"}, 
                                    order: {xs: 1, md: "unset"}
                                }}
                            >
                                <Typography 
                                    variant="h4" component="h4"
                                    sx={{
                                        fontSize: {xs: 20, md: 35},
                                        fontWeight: "900",
                                        my: {xs: 1, md: 2.5}
                                    }}
                                >
                                    Tools built for your music
                                </Typography>

                                <Typography sx={{
                                    fontSize: {xs: "14px", md: "16px"},
                                    fontWeight: "400"
                                }}>
                                    Grow your career while keeping your music at the center. 
                                    With Soundmuv, you can amplify your reach, increase your revenue potential, 
                                    and grow rapidly in the music industry.
                                </Typography>
                            </Grid>

                            <Grid item
                                xs={12} md={6}
                                sx={{ alignSelf: "center", overflow: "hidden", order: {xs: "unset", md: 2} }}
                            >
                                <Typography sx={{
                                    fontSize: "12px",
                                    fontWeight: "900",
                                    color: "#fff",
                                    mb: 2,
                                    display: { xs: 'block', sm: 'none' }
                                }}>
                                    See how it works
                                </Typography>
                                
                                <Box sx={{p: "15px"}}>

                                    <Box sx={{
                                        width: "100%", 
                                        maxWidth: {xs: "381px", md: "533px"}, 
                                        height: {xs: "204px", md: "285px"}, 
                                        borderRadius: "16px", bgcolor: "#C8F452",
                                        // position: "relative"
                                    }}>
                                        <Box sx={{
                                            width: "100%",
                                            maxWidth: {xs: "381px", md: "533px"},
                                            height: {xs: "204px", md: "285px"},
                                            borderRadius: {xs: "12px", md: "16px"},
                                            bgcolor: "#644986", 
                                            position: "relative", bottom: "10px", right: "10px" 
                                        }}>
                                            <Box sx={{
                                                width: "100%",
                                                maxWidth: {xs: "381px", md: "533px"},
                                                height: {xs: "204px", md: "285px"},
                                                borderRadius: {xs: "12px", md: "16px"},
                                                // bgcolor: "green", 
                                                overflow: "hidden",
                                                position: "relative", bottom: "10px", right: "10px" 
                                            }}>
                                                <iframe width="100%" height="100%" 
                                                    src="https://www.youtube.com/embed/7lno59aLJ7I?si=2sBO0XzYedg-GUZD&amp;controls=0" 
                                                    title="YouTube video player" frameBorder="0" 
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={false}
                                                ></iframe>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                <Box>
                    <Container>
                        <Typography 
                            variant="h4" my={2.5} component="h4"
                            sx={{
                                fontSize: {xs: 20, md: 35},
                                fontWeight: "900"
                            }}
                        >
                            Don’t just take our words for it
                        </Typography>
                        <Swiper
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={10}
                            slidesPerView={1.4}
                            // navigation
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            breakpoints={{
                                // when window width is >= 320px
                                320: {
                                    slidesPerView: 1.5,
                                    // spaceBetween: 20
                                },
                                450: {
                                    slidesPerView: 2.3,
                                    // spaceBetween: 20
                                },
                                // sm, small
                                600: {
                                    slidesPerView: 3.3,
                                    // spaceBetween: 40
                                },
                                // md, medium
                                900: {
                                    slidesPerView: 3.8,
                                    // spaceBetween: 40
                                },
                                // lg, large
                                1200:{
                                    slidesPerView: 4.3
                                }

                            }}
                            // modules={[Navigation, Autoplay]}
                            // className="mySwiper"
                        >
                            {ArtistTestimonies.map((testimony, index) => {
                                return (
                                    <SwiperSlide
                                        key={index}
                                        style={{ height: "100%", width: "100%" }}
                                    >
                                        <ArtistTestimony artistTestimonies={testimony} />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </Container>
                </Box>

                <Box sx={{ px: {xs: 0.5, md: 0}, mt: {xs: 5, md: 5}, bottom: -30, position: "relative" }}>
                    <div className={style.leftBottomGradient}></div>

                    <Box sx={{
                        border: "1px solid #fff", 
                        // borderBottom: "none", 
                        borderBottom: {md: "none"},
                        borderLeft: {md: "none"},
                        borderRight: {md: "none"},
                        borderRadius: {xs: "33px", md: "36px" },
                        pb: 5,
                        overflow: "hidden",
                        bgcolor: "#141414"
                    }}>
                        <Container>
                            <Grid container spacing={2} position="unset" >
                                <Grid item
                                    xs={12} md={6}
                                    sx={{ alignSelf: "center" }}
                                >
                                    <Box sx={{py: "15px"}}>
                                        <img src={section4home} alt="section4home"  style={{width: "100%"}} />
                                    </Box>
                                </Grid>

                                <Grid item
                                    xs={12} md={6}
                                    sx={{ 
                                        alignSelf: "center", 
                                        textAlign: {xs: "center", md: "left"}, 
                                        color: "#fff", 
                                    }}
                                >
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: 30, md: 45},
                                            pt: {xs: 5, md: 1}
                                        }}>
                                            Maximize your revenue
                                        </Typography>

                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: 13, md: 16}
                                        }}>
                                            Independent musicians can make money from their original songs through royalties. 
                                            We help you collect royalties globally from various sources like Spotify, YouTube, 
                                            TikTok, radio, and others. With advanced analytics, you can track your publishing 
                                            royalties and know where your performance and mechanical royalties come from. 
                                            You keep 100% of your copyrights.
                                        </Typography>

                                        
                                        <Box sx={{mt: {xs: 5, md: 7}}}>
                                            <Link to="/auth/signup" style={{
                                                background: "#644986",
                                                color: "#fff",
                                                borderRadius: '14px',
                                                padding: "15px",
                                                textDecoration: "none",
                                            }}>
                                                Sign up to learn more
                                            </Link>
                                        </Box>
                                    </Box>

                                </Grid>

                            </Grid>
                        </Container>
                    </Box>
                </Box>

                <Box sx={{ px: {xs: 0.5, md: 0}, bottom: -20, position: "relative" }}>
                    <div className={style.rightBottom2Gradient}></div>

                    <Box sx={{
                        border: "1px solid #fff", 
                        // borderBottom: "none", 
                        borderBottom: {md: "none"},
                        borderLeft: {md: "none"},
                        borderRight: {md: "none"},
                        borderRadius: {xs: "43px", md: "36px" },
                        pb: 5,
                        overflow: "hidden",
                        bgcolor: "#141414"
                    }}>
                        <Container>
                            <Grid container spacing={2} position="unset" >
                                <Grid item
                                    xs={12} md={6}
                                    sx={{ 
                                        alignSelf: "center", 
                                        textAlign: {xs: "center", md: "left"}, 
                                        color: "#fff", 
                                        order: {xs: 2, md: "unset"} 
                                    }}
                                >
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: 30, md: 45},
                                            pt: {xs: 5, md: 1}
                                        }}>
                                            See how your music is doing
                                        </Typography>

                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: 13, md: 16}
                                        }}>
                                            Grow your career while keeping your music at the center. 
                                            With Soundmuv, you can amplify your reach, increase your revenue potential, 
                                            and grow rapidly in the music industry.
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item
                                    xs={12} md={6}
                                    sx={{ alignSelf: "center", order: {xs: 1, md: "unset"} }}
                                >
                                    <Box sx={{py: "15px"}}>
                                        <img src={section5home} alt="section6home"  style={{width: "100%"}} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>

                <Box sx={{ px: {xs: 0.5, md: 0}, position: "relative" }}>
                    <div className={style.centeredLastGradient}></div>

                    <Box sx={{
                        border: "1px solid #fff", 
                        borderBottom: "none", 
                        borderLeft: {md: "none"},
                        borderRight: {md: "none"},
                        // borderRadius: 5,
                        borderTopRightRadius: {xs: "67px", md: "36px" },
                        borderTopLeftRadius:  {xs: "67px", md: "36px" },
                        pb: 5,
                        bgcolor: "#141414"
                    }}>
                        <Container>
                            <Grid container spacing={2} position="unset" >
                                <Grid item
                                    xs={12} md={6}
                                    sx={{ alignSelf: "center" }}
                                >
                                    <div>
                                        <img src={section6home} alt="section6home"  style={{width: "100%"}} />
                                    </div>
                                </Grid>

                                <Grid item
                                    xs={12} md={6}
                                    sx={{ alignSelf: "center", textAlign: {xs: "center", md: "left"}, color: "#fff" }}
                                >
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: 35, md: 45},
                                        }}>
                                            Expand your reach
                                        </Typography>

                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: 13, md: 16}
                                        }}>
                                            Grow your career while keeping your music at the center. 
                                            With Soundmuv, you can amplify your reach, increase your revenue potential, 
                                            and grow rapidly in the music industry.
                                        </Typography>


                                        <Box sx={{mt: {xs: 5, md: 7}}}>
                                            <Link to="/auth/signup" style={{
                                                background: "#644986",
                                                color: "#fff",
                                                borderRadius: '14px',
                                                padding: "15px",
                                                textDecoration: "none",
                                            }}>
                                                Sign up to learn more
                                            </Link>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </Box>
            <FooterComponent />
        </>
    )
}
