import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import style from './contactStyles.module.css';


const formSchema = yup.object({
    name: yup.string().required().min(2).trim().label("Name"),

    email: yup.string().required()
    .email("Please enter a valid email address.")
    .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    , "Please enter a valid email address.")
    // .matches(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, "Please enter a valid email address.")
    .trim().label("Email Address"),

    message: yup.string().required().min(5, "Please enter a meaningful message.").trim().label("Message"),


    // phoneNumber: yup.string().required()
    // .min(7, "Please enter a valid phone number")
    // .max(11, "Please enter a valid phone number").matches(
    //   /^(?:(?:\+|0{0,2})\d{1,4}[-\s]?)?(?:\(\d{1,3}\)[-.\\s]?)?\d{1,4}[-.\\s]?\d{1,4}[-.\\s]?\d{1,9}$/,
    //   'Please enter a valid phone number'
    // ).trim().label("Phone Number"),

});


const customTheme = (outerTheme: Theme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '--TextField-brandBorderColor': '#FFFFFF',
                        '--TextField-brandBorderHoverColor': '#B2BAC2',
                        '--TextField-brandBorderFocusedColor': '#6F7E8C',
                        '& label.Mui-focused': {
                            color: 'var(--TextField-brandBorderFocusedColor)',
                        },
                        '& .MuiInputBase-input': { // Target input text
                            color: '#fff', // Change to your desired text color
                        },
                        '& .MuiInputBase-placeholder': { // Target placeholder text
                            color: 'gray', // Change to your desired placeholder color
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: 'var(--TextField-brandBorderColor)',
                    },
                    root: {
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderHoverColor)',
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiFilledInput: {
                styleOverrides: {
                    root: {
                        '&::before, &::after': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiInput: {
                styleOverrides: {
                    root: {
                        '&::before': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
        },
    });
  

function Contact() {
    const outerTheme = useTheme();

    const { 
        handleSubmit, register, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onChange', reValidateMode: 'onChange' });

        
    const onSubmit = (formData: typeof formSchema.__outputType) => {
        console.log(formData);
        

    }

    
    return (
        <>
            <HeaderComponent />

            <Box sx={{bgcolor: "#000", color: "#fff", pt: 3, position: "relative", overflow: "hidden"}}>
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


                <Box>
                    <Container>
                        <Grid container position="unset" >
                            <Grid item
                                xs={12} md={8} py={2}
                                sx={{ 
                                    alignSelf: "center",
                                    textAlign: {xs: "center", md: "left"}, 
                                }}
                            >
                                <Typography 
                                    variant="h4" component="h4"
                                    sx={{
                                        fontSize: {xs: "35px", md: "60px"},
                                        fontWeight: "900",
                                        my: {xs: 1, md: 2.5}
                                    }}
                                >
                                    Contact us
                                </Typography>

                                <Typography sx={{
                                    fontSize: {xs: "13px", md: "16px"},
                                    fontWeight: "400"
                                }}>
                                    Feel ftee to contact us anytime, we would get back to you as soon as we can 
                                </Typography>


                                <form noValidate onSubmit={ handleSubmit(onSubmit) } style={{margin: "50px auto"}}>
                                    <ThemeProvider theme={customTheme(outerTheme)}>

                                        <Box mb="15px">
                                            <TextField variant="standard" fullWidth 
                                                id="name" label="Your Full Name(s)" 
                                                inputMode="text" type="text"
                                                defaultValue=""
                                                error={ errors.name ? true : false }
                                                { ...register('name') }
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                            />

                                            <Box sx={{fontSize: 13, color: "orange"}}>{ errors.name?.message}</Box>
                                        </Box>

                                        <Box mb="15px">
                                            <TextField variant="standard" fullWidth 
                                                id="email" label="Your Email Address" 
                                                inputMode="email" type="email"
                                                error={ errors.email ? true : false }
                                                { ...register('email')}
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1' },
                                                }}
                                            />

                                            <Box sx={{fontSize: 13, color: "orange"}}>{ errors.email?.message}</Box>
                                        </Box>

                                        <Box mb="15px">
                                            <TextField variant="standard" fullWidth 
                                                id="message" label="Write Us" 
                                                multiline rows={2}
                                                inputMode="text" type="text"
                                                placeholder="Write us your message, we're happy to hear from you..."
                                                error={ errors.message ? true : false }
                                                { ...register('message')}
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1' },
                                                }}
                                            />
                                            
                                            <Box sx={{fontSize: 13, color: "orange"}}>{ errors.message?.message}</Box>
                                        </Box>
                                    </ThemeProvider>

                                    <Box>
                                        <Button variant="contained" 
                                            fullWidth type="submit" 
                                            disabled={ !isValid || isSubmitting } 
                                            sx={{ 
                                                bgcolor: "#fff",
                                                "&:hover": {
                                                    bgcolor: "#fff"
                                                },
                                                "&:active": {
                                                    bgcolor: "#fff"
                                                },
                                                "&:focus": {
                                                    bgcolor: "#fff"
                                                },
                                                color: "#000",
                                                borderRadius: "12px"
                                            }}
                                        >
                                            <span style={{ display: isSubmitting ? "none" : "initial" }}>Send Message</span>
                                            <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#fff", fontWeight: "bold" }} />
                                        </Button>

                                        <Button variant="outlined" 
                                            fullWidth type="button" 
                                            // disabled={ !isValid || isSubmitting } 
                                            sx={{ 
                                                // bgcolor: "#fff",
                                                "&:hover": {
                                                    borderColor: "#fff",
                                                },
                                                "&:active": {
                                                    borderColor: "#fff",
                                                },
                                                "&:focus": {
                                                    borderColor: "#fff",
                                                },
                                                color: "#fff",
                                                borderRadius: "12px",
                                                borderColor: "#fff",
                                                my: 2
                                            }}

                                            onClick={(_e) => {
                                                window.location.href = `mailto:admin@gsssecurity.ng?subject=Contact form!&body=Hi SoundMuve,\n`;
                                            }}
                                        >
                                            Send a Mail
                                        </Button>
                                    </Box>
                                </form>
                            </Grid>

                            <Grid item
                                xs={12} md={4}
                                sx={{ alignSelf: "center", overflow: "hidden", bgcolor: "green"}}
                            ></Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>

            <FooterComponent />
        </>
    )
}

export default Contact;