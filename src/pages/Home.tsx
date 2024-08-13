import { Link, useNavigate } from 'react-router-dom';

// import { Pagination, Autoplay, Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Container from '@mui/material/Container';
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

            <Box sx={{bgcolor: "#000", color: "#fff", pt: 5, position: "relative", overflow: "hidden"}}>
                <>
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
                </>

                <Box sx={{ zIndex: 10, position: "relative", }}>
                    <Box sx={{mt: {xs: 5, md: 10}}}>
                        <Grid container>
                            <Grid item
                                xs={12} md={6}
                                sx={{ alignSelf: "center", textAlign: {xs: "center", md: "left"}, color: "#fff" }}
                            >
                                <Box sx={{
                                    pl: {xs: 2, md: 5, lg: 12}, 
                                    pr: {xs: 2, md: 0},
                                    py: 7 
                                }}>
                                    <Typography sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "36.33px", md: "67.08px"},
                                        lineHeight: {xs: "39.96px", md: "73.79px"}, // "73.79px",
                                        letterSpacing: {xs: "-0.73px", md: "-1.34px"}
                                    }}>
                                        Amplify your sound: Start Here, Reach Everywhere
                                    </Typography>

                                    <Typography sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: 13, md: "17.27px"},
                                        lineHeight: {xs: "", md: "39.24px"},
                                        letterSpacing: {xs: "", md: "-0.89px"},
                                        textAlign: "justify",
                                        pt: 3
                                    }}>
                                        Easily distribute your music and audio creations to major streaming platforms and connect with a global audience.
                                    </Typography>

                                    <Box sx={{
                                        display: "flex", 
                                        justifyContent: {xs: "center", md: "flex-start"}, 
                                        alignItems: "center", 
                                        flexDirection: "row",
                                        gap: {xs: 1, md: 2}, 
                                        flexWrap: "wrap", 
                                        mt: {xs: 3, md: 4}
                                    }}>

                                        <Button 
                                            onClick={() => navigate("/auth/signup")} 
                                            variant="contained" 
                                            sx={{
                                                background: "#644986",
                                                color: "#F5F2F7",
                                                outline: "none",
                                                boxShadow: "none",
                                                p: {xs: "15px", md: "10px"},
                                                // px: "10px",
                                                // py: "10px", // {xs: "10px", md: "5px"},
                                                borderRadius: {xs: "8px", md: "10px"},
                                                fontSize: {xs: "13.36px", md: "21.82px"},
                                                lineHeight: {xs: "12.4px", md: "20.27px"},
                                                letterSpacing: {xs: "-0.27px", md: "-0.44px"},
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
                                                textTransform: {xs: "uppercase", md: "unset"}
                                            }}
                                        >
                                            Sign up now
                                        </Button>

                                        <Button variant="contained" 
                                            onClick={() => navigate("/about")}
                                            sx={{
                                                background: "#797979",
                                                // color: "#5F5D5D",
                                                color: "#fff",
                                                outline: "none",
                                                boxShadow: "none",
                                                p: {xs: "15px", md: "10px"},
                                                // px: "10px",
                                                // py: "10px", // {xs: "10px", md: "5px"},
                                                borderRadius: {xs: "8px", md: "10px"},
                                                fontSize: {xs: "13.36px", md: "21.82px"},
                                                lineHeight: {xs: "12.4px", md: "20.27px"},
                                                letterSpacing: {xs: "-0.27px", md: "-0.44px"},
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
                                                textTransform: {xs: "uppercase", md: "unset"}
                                            }}
                                        >
                                            Learn More
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item
                                xs={12} md={6}
                                sx={{ alignSelf: "end" }}
                            >
                                <Box sx={{
                                    mt: {xs: 5, md: 0},
                                    // bgcolor: "yellow"
                                    width: "100%",
                                    height: "100%",
                                    position: "relative",
                                    bottom: -7
                                }}>
                                    <img 
                                        src={section1home} 
                                        alt="Make the most of your music on Soundmuve section"  
                                        style={{width: "100%", height: "100%", objectFit: "cover" }} 
                                    />
                                </Box>

                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{
                        // position: "relative", 
                        // bottom: {xs: 5, md: 35, lg: 55}, 
                        mb: {xs: 5, md: 1}, 
                        px: {xs: 2, md: 5, lg: 12} 
                    }}>
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
                    </Box>

                    <Box sx={{px: {xs: 2, md: 5, lg: 12}, my: 12}}>
                        <Grid container spacing={2} position="unset" >
                            <Grid item xs={12} md={6}
                                sx={{ 
                                    alignSelf: "center",
                                    order: {xs: 1, md: "unset"}
                                }}
                            >
                                <Typography 
                                    variant="h4" component="h4"
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "35.18px", md: 45},
                                        lineHeight: {xs: "39.09px", md: "50px"},
                                        letterSpacing: {xs: "-0.88px", md: "-1.13px"},
                                        // my: {xs: 1, md: 2.5}
                                        textAlign: {xs: "Justified", md: "Justified"}
                                    }}
                                > 
                                    {/* Tools built for your music  */}
                                    Your Sound, Your Stage, Our Support.
                                </Typography>

                                <Typography sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: "13.5px", md: 16},
                                    lineHeight: {xs: '30.69px', md: "40px"},
                                    letterSpacing: {xs: '-0.69px', md: "-0.13px"},
                                    textAlign: "justify",
                                    pr: {md: 4}
                                }}>
                                    We believe in the power of your sound to make a global impact. 
                                    SoundMuve empowers artists at every level with a transparent and 
                                    inclusive music distribution platform that expands your reach. 
                                    From your local scene to a worldwide audience, 
                                    we take your sound from anywhere in the world to everywhere it matters.

                                    {/* Grow your career while keeping your music at the center. 
                                    With Soundmuv, you can amplify your reach, increase your revenue potential, 
                                    and grow rapidly in the music industry. */}
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
                                
                                <Box sx={{
                                    p: "15px", 
                                    pl: {xs: "30px", md: "15px"},
                                    alignSelf: "baseline",
                                    position: "relative",
                                    bottom: 0, right: 0
                                }}>

                                    <Box sx={{
                                        width: "100%", 
                                        maxWidth: {xs: "381px", md: "533px"}, 
                                        height: {xs: "204px", md: "285px"}, 
                                        borderRadius: "16px", bgcolor: "#C8F452",
                                        position: "relative"
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
                    </Box>

                    <Box sx={{px: {xs: 2, md: 5, lg: 12}}}>
                        <Typography 
                            variant="h4" my={2.5} component="h4"
                            sx={{
                                fontWeight: "900",
                                fontSize: {xs: 20, md: 35},
                                lineHeight: {xs: "50px", md: "50px"},
                                letterSpacing: {xs: "-1.13px", md: "-1.13px"}
                            }}
                        >
                            Don't just take our words for it
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
                                },

                                1500: {
                                    slidesPerView: 6.3
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
                    </Box>

                    <Box sx={{ px: {xs: 0.5, md: 0}, mt: {xs: 5, md: 5}, bottom: -30, position: "relative" }}>
                        <div className={style.leftBottomGradient}></div>

                        <Box sx={{
                            border: "1px solid #fff", 
                            // borderBottom: "none", 
                            borderBottom: {md: "none"},
                            borderLeft: {md: "none"},
                            borderRight: {md: "none"},
                            borderRadius: {xs: "33px", md: "36px 36px 0 0" },
                            py: {xs: 10, md: 7},
                            overflow: "hidden",
                            bgcolor: "#141414",

                            px: {xs: 2, md: 5, lg: 12},
                        }}>
                            <Grid container spacing={2} position="unset" >
                                <Grid item
                                    xs={12} md={6}
                                    sx={{ alignSelf: "center" }}
                                >
                                    <Box sx={{py: "15px"}}>
                                        <img 
                                            src={section4home} 
                                            alt="Maximize your revenue section"  
                                            style={{width: "100%", maxWidth: "451px"}} 
                                        />
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
                                            fontSize: {xs: "36.36px", md: 45},
                                            lineHeight: {xs: "40.41px", md: "50px"},
                                            letterSpacing: {xs: "-0.91px", md: "-1.13px"},
                                            pt: {xs: 5, md: 1}
                                        }}>
                                            {/* Maximize your revenue */}
                                            Embrace Your Creative Freedom
                                        </Typography>

                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "13.5px", md: 16},
                                            lineHeight: {xs: "30.69px", md: "40px"},
                                            letterSpacing: {xs: "-0.69px", md: "-0.13px"},
                                            textAlign: "justify"
                                        }}>
                                            You can now enjoy unmatched creative freedom, and stay true to your sound and independent spirit. 
                                            Discover limitless opportunities and explore your full potential with our support, 
                                            guiding you through every stage of your journey. 
                                            Step into a new era of success and own your sound story.

                                            {/* Independent musicians can make money from their original songs through royalties. 
                                            We help you collect royalties globally from various sources like Spotify, YouTube, 
                                            TikTok, radio, and others. With advanced analytics, you can track your publishing 
                                            royalties and know where your performance and mechanical royalties come from. 
                                            You keep 100% of your copyrights. */}
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
                            borderRadius: {xs: "43px", md: "36px 36px 0 0" },
                            py: {xs: 10, md: 7},
                            overflow: "hidden",
                            bgcolor: "#141414",
                            px: {xs: 2, md: 5, lg: 12}
                        }}>
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
                                            fontSize: {xs: "36.36px", md: 45},
                                            lineHeight: {xs: "46.44px", md: "50px"},
                                            letterSpacing: {xs: "-1.05px", md: "-1.13px"},
                                            pt: {xs: 5, md: 1}
                                        }}>
                                            {/* See how your music is doing */}
                                            Get Your Sound Discovered
                                        </Typography>

                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "13.5px", md: 16},
                                            lineHeight: {xs: "30.69px", md: "40px"},
                                            letterSpacing: {xs: "-0.69px", md: "-0.13px"},
                                            textAlign: "justify"
                                        }}>
                                            We'll expand your reach and boost your visibility across top streaming 
                                            platforms like Spotify, Apple Music, Boomplay and more. 
                                            Captivate millions and attract new listeners with your unique voice. 
                                            Make your mark and watch your sound reach audiences everywhere.

                                            {/* Grow your career while keeping your music at the center. 
                                            With Soundmuv, you can amplify your reach, increase your revenue potential, 
                                            and grow rapidly in the music industry. */}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item
                                    xs={12} md={6}
                                    sx={{ alignSelf: "center", order: {xs: 1, md: "unset"} }}
                                >
                                    <Box sx={{py: "15px"}}>
                                        <img 
                                            src={section5home} 
                                            alt="See how your music is doing section"  
                                            style={{width: "100%", maxWidth: "480px"}} 
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    <Box sx={{ px: {xs: 0.5, md: 0}, position: "relative" }}>
                        <div className={style.centeredLastGradient}></div>

                        <Box sx={{
                            border: "1px solid #fff", 
                            borderBottom: {md: "none"},
                            borderLeft: {md: "none"},
                            borderRight: {md: "none"},

                            borderRadius: {xs: "67px", md: "36px 36px 0 0" },
                            // borderTopRightRadius: {xs: "67px", md: "36px" },
                            // borderTopLeftRadius:  {xs: "67px", md: "36px" },

                            py: {xs: 10, md: 7},
                            bgcolor: "#141414",

                            px: {xs: 2, md: 5, lg: 12},

                            mb: {xs: 7, md: 0}
                        }}>
                            <Grid container spacing={2} position="unset" >
                                <Grid item
                                    xs={12} md={6}
                                    sx={{ alignSelf: "center" }}
                                >
                                    <Box>
                                        <img 
                                            src={section6home} 
                                            alt="Expand your reach section"  
                                            style={{ width: "100%", maxHeight: "400px", objectFit: 'contain' }} 
                                        />
                                    </Box>
                                </Grid>

                                <Grid item
                                    xs={12} md={6}
                                    sx={{ alignSelf: "center", textAlign: {xs: "center", md: "left"}, color: "#fff" }}
                                >
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "36.54px", md: 45},
                                            lineHeight: {xs: "40.6px", md: "50px"},
                                            letterSpacing: {xs: "-0.92px", md: "-1.13px"},
                                        }}>
                                            {/* Expand your reach */}
                                            Advanced Analytics and Insights at Your Fingertips
                                        </Typography>

                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "13.5px", md: 16},
                                            lineHeight: {xs: "30.69px", md: "40px"},
                                            letterSpacing: {xs: "-0.69px", md: "-0.13px"},
                                            textAlign: "justify"
                                        }}>
                                            Track your earnings, analyse performance, gain insights and make data-driven 
                                            decisions with cutting-edge tools designed specifically for you. 
                                            Stay informed and in control as you navigate your journey with clarity.

                                            {/* Grow your career while keeping your music at the center. 
                                            With Soundmuv, you can amplify your reach, increase your revenue potential, 
                                            and grow rapidly in the music industry. */}
                                        </Typography>


                                        <Box sx={{mt: {xs: 5, md: 7, position: "relative"}}}>
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
                        </Box>
                    </Box>
                </Box>

            </Box>
            <FooterComponent />
        </>
    )
}
