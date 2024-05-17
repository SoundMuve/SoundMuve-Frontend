import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import style from './aboutStyles.module.css';



function About() {
    const patners = [
        {
            name: "amazin",
            logo: "/src/assets/images/partners/amazin_.png"
        },
        {
            name: "amuze",
            logo: "/src/assets/images/partners/amuze_.png"
        },
        {
            name: "Apple Music",
            logo: "/src/assets/images/partners/appleMusic_.png"
        },
        {
            name: "ayoba",
            logo: "/src/assets/images/partners/ayoba_.png"
        },
        {
            name: "bMusic",
            logo: "/src/assets/images/partners/bMusic_.png"
        },
        {
            name: "boomplay",
            logo: "/src/assets/images/partners/boomplay_.png"
        },
        {
            name: "deezer",
            logo: "/src/assets/images/partners/deezer_.png"
        },
        {
            name: "digital",
            logo: "/src/assets/images/partners/digital_.png"
        },
        {
            name: "gaana",
            logo: "/src/assets/images/partners/gaana_.png"
        },
        {
            name: "gobuz",
            logo: "/src/assets/images/partners/gobuz_.png"
        },
        {
            name: "gracenote",
            logo: "/src/assets/images/partners/gracenote_.png"
        },
        {
            name: "jio",
            logo: "/src/assets/images/partners/jio_.png"
        },
        {
            name: "joox",
            logo: "/src/assets/images/partners/joox_.png"
        },
        {
            name: "kkbox",
            logo: "/src/assets/images/partners/kkbox_.png"
        },
        {
            name: "localMusic",
            logo: "/src/assets/images/partners/localMusic_.png"
        },
        {
            name: "masd",
            logo: "/src/assets/images/partners/masd_.png"
        },
        {
            name: "medianet",
            logo: "/src/assets/images/partners/medianet_.png"
        },
        {
            name: "mm",
            logo: "/src/assets/images/partners/mm_.png"
        },
        {
            name: "musicIsland",
            logo: "/src/assets/images/partners/musicIsland_.png"
        },
        {
            name: "musicTime",
            logo: "/src/assets/images/partners/musicTime_.png"
        },
        {
            name: "napster",
            logo: "/src/assets/images/partners/napster_.png"
        },
        {
            name: "pandora",
            logo: "/src/assets/images/partners/pandora_.png"
        },
        {
            name: "shazam",
            logo: "/src/assets/images/partners/shazam_.png"
        },
        {
            name: "snap",
            logo: "/src/assets/images/partners/snap_.png"
        },
        {
            name: "soundTrack",
            logo: "/src/assets/images/partners/soundTrack_.png"
        },
        {
            name: "spinlet",
            logo: "/src/assets/images/partners/spinlet_.png"
        },
        {
            name: "spotify",
            logo: "/src/assets/images/partners/spotify_.png"
        },
        {
            name: "tidal",
            logo: "/src/assets/images/partners/tidal_.png"
        },
        {
            name: "tiktok",
            logo: "/src/assets/images/partners/tiktok_.png"
        },
        {
            name: "tiktox China",
            logo: "/src/assets/images/partners/tiktoxChina_.png"
        },
        {
            name: "timMusic",
            logo: "/src/assets/images/partners/timMusic_.png"
        },
        {
            name: "tMusic",
            logo: "/src/assets/images/partners/tMusic_.png"
        },
        {
            name: "vervelife",
            logo: "/src/assets/images/partners/vervelife_.png"
        },
        {
            name: "yandexMusic",
            logo: "/src/assets/images/partners/yandexMusic_.png"
        },
        {
            name: "youtube",
            logo: "/src/assets/images/partners/youtube_.png"
        },
    ]
 

    return (
        <>
            <HeaderComponent />

            <Box sx={{bgcolor: "#000", color: "#fff", pt: 5, position: "relative", overflow: "hidden"}}>
                <Box sx={{display: { xs: 'none', md: 'block' }}}>
                    <div className={style.topGradient}></div>
                    <div className={style.leftGradient}></div>
                    <div className={style.rightTopGradient}></div>
                    <div className={style.btnCenteredGradient}></div>
                </Box>

                <Box sx={{display: { xs: 'block', md: 'none' }}}>
                    <div className={style.mobileLeftGradient}></div>
                    <div className={style.mobileRightGradient}></div>
                    <div className={style.mobileCenteredGradient}></div>
                </Box>


                <Container>
                    <Box>
                        <Typography sx={{
                            fontSize: {xs: 35, md: 45},
                            fontWeight: "900",
                            textAlign: "center"
                        }}>
                            About SoundMuve
                        </Typography>

                        <Typography sx={{
                            fontSize: "15px",
                            fontWeight: "400",
                            textAlign: "justify"
                        }}>
                            laborum aute in excepteur culpa consequat duis ut esse magna consectetur 
                            et est commodo cupidatat est aute nisi ea in non pariatur officia incididunt 
                            do enim fugiat duis ut ex dolore qui proident ex ex tempor ex cillum amet 
                            aliqua est qui nostrud elit laborum qui deserunt ea adipisicing sunt cillum 
                            do tempor dolore labore ullamco ullamco proident aute laborum ullamco amet ad 
                            qui sint excepteur id non nulla est velit sit sint aliquip quis magna sunt et 
                            nostrud proident magna non incididunt esse ad aute consectetur exercitation sit 
                            ea cillum amet nulla pariatur dolor aliqua cupidatat enim ad officia proident 
                            sunt magna do incididunt sunt nostrud consectetur aliqua ea exercitation aliquip 
                            in eiusmod ipsum magna nostrud adipisicing minim 
                            fugiat non tempor aute in anim ad qui officia anim aliquip aliquip
                        </Typography>

                        
                        <Typography sx={{
                            fontSize: "27px",
                            fontWeight: "900",
                            textAlign: "center",
                            mt: 3
                        }}>
                            Our Mission
                        </Typography>
                        
                        <Typography sx={{
                            fontSize: "15px",
                            fontWeight: "400",
                            textAlign: "justify"
                        }}>
                            laborum aute in excepteur culpa consequat duis ut esse magna consectetur 
                            et est commodo cupidatat est aute nisi ea in non pariatur officia incididunt 
                            do enim fugiat duis ut ex dolore qui proident ex ex tempor ex cillum amet 
                            aliqua est qui nostrud elit laborum qui deserunt ea adipisicing sunt cillum 
                            do tempor dolore labore ullamco ullamco proident aute laborum ullamco amet ad 
                            qui sint excepteur id non nulla est velit sit sint aliquip quis magna sunt et 
                            nostrud proident magna non incididunt esse ad aute consectetur exercitation sit 
                            ea cillum amet nulla pariatur dolor aliqua cupidatat enim ad officia proident 
                            sunt magna do incididunt sunt nostrud consectetur aliqua ea exercitation aliquip 
                            in eiusmod ipsum magna nostrud adipisicing minim 
                            fugiat non tempor aute in anim ad qui officia anim aliquip aliquip
                        </Typography>

                        <Box sx={{my: 5}}>
                            <Grid container spacing={2} >
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
                                            fontSize: {xs: 25, md: 30},
                                            lineHeight: 1,
                                            mb: 3
                                        }}>
                                            Understanding the business of music
                                        </Typography>

                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: 13, md: 16},
                                            textAlign: "justify"
                                        }}>
                                            ui consequat culpa mollit consectetur officia nulla non nulla 
                                            nisi nulla ea ullamco labore magna veniam adipisicing laborum 
                                            ut culpa incididunt esse sit fugiat excepteur qui nostrud laborum 
                                            ea in irure in pariatur ipsum qui cillum esse sit pariatur sunt
                                        </Typography>
                                    </Box>

                                </Grid>

                                <Grid item
                                    xs={12} md={6}
                                    sx={{ alignSelf: "center", order: {xs: 1, md: "unset"} }}
                                >
                                    <Box sx={{py: "15px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Box sx={{
                                            width: {xs: "95%", md: "80%"}, 
                                            maxWidth: {xs: "381px", md: "533px"},
                                            height: {xs: "200px", md: "250px"},
                                            borderRadius: "25px",
                                            overflow: "hidden",
                                        }}>
                                            <iframe width="100%" height="100%" 
                                                src="https://www.youtube.com/embed/7lno59aLJ7I?si=2sBO0XzYedg-GUZD&amp;controls=0" 
                                                title="YouTube video player" frameBorder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={false}
                                            ></iframe>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                    </Box>
                </Container>


                <Box className={style.dsplogoContainer} sx={{py: 5}}>
                    <Container>
                        <Typography sx={{
                            fontWeight: "900",
                            fontSize: {xs: 30, md: 45},
                            textAlign: "center"
                        }}>
                            Digital Music Distribution Stores
                        </Typography>


                        <Typography sx={{
                            fontWeight: "400",
                            fontSize: {xs: 13, md: 16},
                            textAlign: "justify"
                        }}>
                            SoundMuve Music Distribution puts your music in the most popular digital 
                            stores around the world like Spotify, Apple Music, iTunes, Amazon Music, and more. 
                            In fact, we partner with over 150 digital stores. 
                            Below are just some of our top store partners.
                        </Typography>

                        <Box sx={{
                            py: 5,
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: {xs: 5, md: 10},
                            alignItems: "center",
                            justifyContent: "space-around"
                        }}>
                            { patners.map((patner, index) => (
                                <Box key={index}>
                                    <img 
                                        src={patner.logo} 
                                        alt={patner.name} 
                                        title={patner.name} 
                                        style={{maxWidth: "45px"}} 
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Container>
                </Box>
            </Box>

            <FooterComponent />
        </>
    )
}

export default About;
