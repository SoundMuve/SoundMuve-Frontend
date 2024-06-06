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
import { useState } from 'react';
import SnackbarToast, { SnackbarToastInterface } from './ToastNotification';
import axios from 'axios';
import { apiEndpoint } from '../util/resources';


export default function FooterComponent() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const [toastNotification, setToastNotification] = useState<SnackbarToastInterface>({
        display: false,
        status: "success",
        message: ""
    });

            
    const onSubmit = async () => {
        if (!email.match(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/)) {
            
            setToastNotification({
                display: true,
                status: "error",
                message: "Please enter a valid email address."
            });
            return;
        }

        try {
            const response = (await axios.post(`${apiEndpoint}/newsLetter/subscribe-newsletter`, { email })).data;
            
            if (response && response.savedUser) {
                setToastNotification({
                    display: true,
                    status: "success",
                    message: response.message
                });

                return;
            }

            setToastNotification({
                display: true,
                status: "error",
                message: response.message || "Oooops, registration failed. please try again."
            });

            setEmail("");
        } catch (error: any) {
            // console.log(error);
            const err = error.response.data;

            setToastNotification({
                display: true,
                status: "error",
                message: err.message || "Oooops, news letter subscription failed. please try again."
            });
        }

    }


    return (
        <Box bgcolor="#21262C" 
            // sx={{px: 2, py: {xs: 5, md: 7}}}
            sx={{ px: {xs: 2, md: 5, lg: 12}, py: {xs: 5, md: 7} }}
        >
            <Box sx={{display: {xs: "none", md: "block"}}}>
                <Grid container spacing={2}>
                    <Grid item
                        xs={6} sm={3} md={2} // lg={3}
                        sx={{ display: "flex", justifyContent: "left" }}
                    >
                        <div>
                            <img 
                                src={SoundMuve} 
                                alt="SoundMuve logo" 
                                style={{width: 130, cursor: 'pointer', display: "block"}} 
                                onClick={() => navigate("/") } 
                            />

                            {/* <Box my={2}>
                                <Typography className={style.text}>
                                    © 2024 SoundMuve.
                                </Typography>
                                <Typography className={style.text}>
                                    All rights reserved.
                                </Typography>
                            </Box> */}

                            <Box sx={{display: "flex", gap: 1, mt: 2}}>
                                <FacebookIcon className={style.icons} />
                                <TwitterIcon className={style.icons} />
                                <LinkedInIcon className={style.icons} />
                                <InstagramIcon className={style.icons} />
                            </Box>
                        </div>
                    </Grid>

                    <Grid item
                        xs={6} sm={3} md={2} // lg={3}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Box my={0}>
                            <Typography className={style.text}>
                                © 2024 SoundMuve.
                            </Typography>
                            <Typography className={style.text}>
                                All rights reserved.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item
                        xs={6} sm={3} md={2} // lg={3}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Box my={0}>
                            <Link to="/pricing" className={style.link} title='Pricing'>
                                Pricing
                            </Link>
                        </Box>
                    </Grid>

                    <Grid item
                        xs={6} sm={3} md={2}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Box my={0}>
                            <Link to="/terms-of-use" className={style.link} title='Terms of Use'>
                                Terms of Use
                            </Link>
                        </Box>
                    </Grid>

                    <Grid item
                        xs={6} sm={3} md={2}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Box my={0}>
                            <Link to="/privacy-policy" className={style.link} title='Privacy Policy'>
                                Privacy Policy
                            </Link>
                        </Box>
                    </Grid>

                    <Grid item
                        xs={12} sm={3} md={2}
                        sx={{ display: "flex", justifyContent: "center", overflow: "hidden" }}
                    >
                        <Box>
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
                                <div style={{
                                    display: "flex", whiteSpace: "nowrap",
                                    flexDirection: "row", alignItems: "center"
                                }}>
                                    <input 
                                        type="email" 
                                        placeholder='Email Address' 
                                        className={style.input}
                                        autoComplete="email" 
                                        value={email}
                                        required
                                        onChange={e => setEmail(e.currentTarget.value)}
                                    />

                                    <Box onClick={() => onSubmit()}
                                        sx={{
                                            border: "1.33px solid #644986",
                                            borderRadius: "0px 5.33px 5.33px 0px",
                                            bgcolor: "#644986",
                                            px: 1.5,
                                            height: "34.66px",
                                            alignSelf: "center",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer"
                                        }} 
                                    >
                                        <Typography sx={{
                                            fontWeight: "700",
                                            fontSize: "9.67px",
                                            lineHeight: "17.67px",
                                            textAlign: "center",
                                            color: "#fff",
                                        }}>
                                            Join
                                        </Typography>
                                    </Box>

                                </div>
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{display: {xs: "block", md: "none"}}}>
                <Grid container spacing={2}>
                    <Grid item
                        xs={4} sm={4} md={4} // lg={3}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Box>
                            <img 
                                src={SoundMuve} 
                                alt="SoundMuve logo" 
                                style={{maxWidth: "53px", cursor: 'pointer', display: "block"}} 
                                onClick={() => navigate("/") } 
                            />

                            <Box my={1} >
                                <Typography className={style.text} sx={{
                                    fontWeight: "500",
                                    fontSize: "4.65px",
                                    lineHeight: "8.22px"
                                }}>
                                    © 2024 SoundMuve.
                                </Typography>
                                <Typography className={style.text} sx={{
                                    fontWeight: "500",
                                    fontSize: "4.65px",
                                    lineHeight: "8.22px"
                                }}>
                                    All rights reserved.
                                </Typography>
                            </Box>

                            <Box sx={{display: "flex", gap: 1}}>
                                <FacebookIcon className={style.icons} sx={{maxWidth: "5.69px", fontSize: 10}} />
                                <TwitterIcon className={style.icons} sx={{maxWidth: "5.69px", fontSize: 10}} />
                                <LinkedInIcon className={style.icons} sx={{maxWidth: "5.69px", fontSize: 10}} />
                                <InstagramIcon className={style.icons} sx={{maxWidth: "5.69px", fontSize: 10}} />
                            </Box>
                        </Box>
                    </Grid>
                    
                    
                    <Grid item
                        xs={4} sm={4} md={4} // lg={3}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Box>
                            {/* <Typography className={style.title}>
                                Quick Links
                            </Typography> */}

                            <Box my={0}>
                                <ul className={style.footerList}>
                                    {/* <li className={style.text}>
                                        <Link to="/about" className={style.link} title='About Us'>
                                            About Us
                                        </Link>
                                    </li> */}
                                    <li className={style.xsText}>
                                        <Link to="/pricing" className={`${style.link} ${style.xsLink}`} title='Pricing'>
                                            Pricing
                                        </Link>
                                    </li>
                                    {/* <li className={style.text}>
                                        <Link to="/faq" className={style.link} title='FAQs'>
                                            FAQs
                                        </Link>
                                    </li> */}
                                    <li className={style.xsText}>
                                        <Link to="/terms-of-use" className={`${style.link} ${style.xsLink}`} title='Terms of Use'>
                                            Terms of Use
                                        </Link>
                                    </li>
                                    <li className={style.xsText}>
                                        <Link to="/privacy-policy" className={`${style.link} ${style.xsLink}`} title='Privacy Policy'>
                                            Privacy Policy
                                        </Link>
                                    </li>
                                </ul>
                            </Box>
                        </Box>
                    </Grid>
                    
                    <Grid item
                        xs={4} sm={4} md={4} // lg={3}
                        sx={{ display: "flex", justifyContent: "center", overflow: "hidden" }}
                    >
                        <div>
                            <Typography className={style.title} sx={{
                                fontWeight: "700",
                                fontSize: "5.38px",
                                lineHeight: "8.25px",
                                letterSpacing: "-0.06px"
                            }}>
                                Our Newsletter
                            </Typography>

                            <Box my={1}>
                                <Typography className={style.text} sx={{
                                    fontWeight: "500",
                                    fontSize: "4.72px",
                                    lineHeight: "8.22px"
                                }}>
                                    Subscribe to our newsletter to get
                                    our news delivered to you.
                                </Typography>
                            </Box>

                            <Box>
                                <div style={{
                                    display: "flex", whiteSpace: "nowrap",
                                    flexDirection: "row", alignItems: "center"
                                }}>
                                    <input 
                                        type="email" 
                                        placeholder='Email Address' 
                                        className={style.xsInput}
                                        autoComplete="email" 
                                        value={email}
                                        required
                                        onChange={e => setEmail(e.currentTarget.value)}
                                    />

                                    <Box onClick={() => onSubmit()} 
                                        sx={{
                                            border: "0.57px solid #644986",
                                            borderRadius: "0px 2.28px 2.28px 0px",
                                            bgcolor: "#644986",
                                            px: 1,
                                            height: "14.79px",
                                            alignSelf: "center",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <Typography sx={{
                                            fontWeight: "700",
                                            fontSize: "4.13px",
                                            lineHeight: "7.54px",
                                            textAlign: "center",
                                            color: "#fff",
                                        }}>
                                            Join
                                        </Typography>
                                    </Box>

                                </div>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Box>

            <SnackbarToast 
                status={toastNotification.status} 
                display={toastNotification.display} 
                message={toastNotification.message} 
                closeSnackbar={() => setToastNotification({ ...toastNotification, display: false})}
            />
        </Box>
    )
}
