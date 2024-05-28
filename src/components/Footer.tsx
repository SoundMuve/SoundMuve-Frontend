// import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import style from "./footer.module.css";
import { Link } from 'react-router-dom';

import SoundMuve from "./../assets/images/SoundMuve.png";


export default function FooterComponent() {
    const navigate = useNavigate();
    // const location = useLocation();


    return (
        <Box bgcolor="#21262C" p={2}>
            <Grid container spacing={2}>
                <Grid item
                    xs={6} sm={6} md={4} // lg={3}
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <div>
                        <img src={SoundMuve} alt="SoundMuve logo" style={{width: 130, cursor: 'pointer'}} onClick={() => navigate("/") } />

                        <Box my={2}>
                            <Typography className={style.text}>
                                © 2024 SoundMuve.
                            </Typography>
                            <Typography className={style.text}>
                                All rights reserved.
                            </Typography>
                        </Box>

                        <Box sx={{display: "flex", gap: 1}}>
                            <FacebookIcon className={style.icons} />
                            <TwitterIcon className={style.icons} />
                            <LinkedInIcon className={style.icons} />
                            <InstagramIcon className={style.icons} />
                        </Box>
                    </div>
                </Grid>
                
                {/* <Grid item
                    xs={6} sm={6} md={4} lg={3}
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <div>
                        <Typography className={style.title}>
                            Get in Touch
                        </Typography>

                        <Box my={2}>
                            <Typography className={style.text}>
                                Location 77 Eagles Hill Estate, Beside NNPC Mega Station, George-lyn Road Off Enugu – Onitsha Expressway Awka, Nigerian
                            </Typography>
                        </Box>

                        <Box>
                            <Typography className={style.text}>
                                admin@gsssecurity.ng
                            </Typography>

                            <Typography className={style.text}>
                                +234 906 003 5557
                            </Typography>
                        </Box>
                    </div>

                </Grid> */}
                
                <Grid item
                    xs={6} sm={6} md={4} // lg={3}
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <div>
                        <Typography className={style.title}>
                            Quick Links
                        </Typography>

                        <Box my={2}>
                            <ul className={style.footerList}>
                                <li className={style.text}>
                                    <Link to="/about" className={style.link} title='About Us'>
                                        About Us
                                    </Link>
                                </li>
                                <li className={style.text}>
                                    <Link to="/pricing" className={style.link} title='Pricing'>
                                        Pricing
                                    </Link>
                                </li>
                                <li className={style.text}>
                                    <Link to="/faq" className={style.link} title='FAQs'>
                                        FAQs
                                    </Link>
                                </li>
                                <li className={style.text}>
                                    <Link to="/terms-of-use" className={style.link} title='Terms of Use'>
                                        Terms of Use
                                    </Link>
                                </li>
                                <li className={style.text}>
                                    <Link to="/privacy-policy" className={style.link} title='Privacy Policy'>
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </Box>
                    </div>
                </Grid>
                
                <Grid item
                    xs={12} sm={6} md={4} // lg={3}
                    sx={{ display: "flex", justifyContent: "center", overflow: "hidden" }}
                >
                    <div>
                        <Typography className={style.title}>
                            Our Newsletter
                        </Typography>

                        <Box my={2}>
                            <Typography className={style.text}>
                                Subscribe to our newsletter to get
                                our news delivered to you.
                            </Typography>
                        </Box>

                        <Box>
                            <div style={{display: "inline-block", whiteSpace: "nowrap"}}>
                                <input 
                                    type="email" 
                                    placeholder='Email Address' 
                                    className={style.input}
                                />
                                <button className={style.btn}>Join</button>
                            </div>
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}
