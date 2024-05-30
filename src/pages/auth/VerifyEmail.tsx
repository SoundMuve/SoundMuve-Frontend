// import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';

import AuthHeaderComponent from '../../components/AuthHeader';
import style from '../pricingStyles.module.css';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import VerifyEmailImg from "./../../assets/images/VerifyEmail.png";
import { useNavigate } from 'react-router-dom';


const formSchema = yup.object({
    code1: yup.string().required().min(1).max(1).label("Code"),
    code2: yup.string().required().min(1).max(1).label("Code"),
    code3: yup.string().required().min(1).max(1).label("Code"),
    code4: yup.string().required().min(1).max(1).label("Code"),
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
  
function VerifyEmail() {
    const outerTheme = useTheme();
    const navigate = useNavigate();

    const { 
        handleSubmit, register, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onBlur' });

        
    const onSubmit = (formData: typeof formSchema.__outputType) => {
        console.log(formData);

        navigate("/auth/create-new-password");
        
    }


    return (
        <>
            <Box sx={{bgcolor: "#000", color: "#fff", minHeight: "100vh", position: "relative", overflow: "hidden"}}>
                <AuthHeaderComponent />

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

                <Container sx={{position: "relative", zIndex: 1}}>
                    <Box sx={{
                        py: {xs: 5, sm: 10, md: 10},
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center"
                    }}>
                        <ThemeProvider theme={customTheme(outerTheme)}>
                            <form noValidate 
                                onSubmit={ handleSubmit(onSubmit) } 
                                style={{
                                    maxWidth: "653px",
                                    width: "100%",
                                    // height: 400,
                                    alignSelf: "center"
                                }}
                            >
                                <Box sx={{
                                    maxWidth: "214px",
                                    width: {xs: `${214 * 0.3}px`, md: `${214 * 0.6}px`},
                                    textAlign: "center",
                                    mx: "auto",
                                }}>
                                    <img 
                                        src={VerifyEmailImg} 
                                        alt="verify email lock image" 
                                        style={{ width: "100%", objectFit: "contain" }} 
                                    />
                                </Box>

                                <Typography sx={{
                                    fontWeight: "900",
                                    fontSize: {xs: "35px", md: "50px"},
                                    lineHeight: {xs: "49.28px", md: "82.28px"},
                                    letterSpacing: {xs: "-0.9px", md: "-1.5px"}
                                }}>
                                    Verify your email
                                </Typography>

                                <Typography sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: "10.69px", md: "24px"},
                                    lineHeight: {xs: "26.72px", md: "44.6px"},
                                    letterSpacing: {xs: "-0.9px", md: "-0.14px"}
                                }}>
                                    Please enter the 4 digit code sent to <br />
                                    <span style={{fontWeight: "700"}}>
                                        Design@techguard.ng 
                                    </span>
                                </Typography>


                                <Box sx={{ py: 2, }}>
                                    <Box sx={{ 
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "15px"
                                    }}>

                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='code1'
                                            type='text'
                                            label=''
                                            autoFocus
                                            inputMode='text'
                                            defaultValue=""
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                            }}
                                            sx={{maxWidth: "121px", maxHeight: "100px"}}
                                            
                                            error={ errors.code1 ? true : false }
                                            { ...register('code1') }
                                        />

                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='code2'
                                            type='text'
                                            label=''
                                            autoFocus
                                            inputMode='text'
                                            defaultValue=""
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                            }}
                                            sx={{maxWidth: "121px", maxHeight: "100px"}}
                                            
                                            error={ errors.code2 ? true : false }
                                            { ...register('code2') }
                                        />

                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='code3'
                                            type='text'
                                            label=''
                                            autoFocus
                                            inputMode='text'
                                            defaultValue=""
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                            }}
                                            sx={{maxWidth: "121px", maxHeight: "100px"}}
                                            
                                            error={ errors.code3 ? true : false }
                                            { ...register('code3') }
                                        />

                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='code4'
                                            type='text'
                                            label=''
                                            autoFocus
                                            inputMode='text'
                                            defaultValue=""
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                            }}
                                            sx={{maxWidth: "121px", maxHeight: "100px"}}
                                            
                                            error={ errors.code4 ? true : false }
                                            { ...register('code4') }
                                        />
                                    </Box>

                                    { errors.code1 && <Box sx={{fontSize: 13, color: "red", textAlign: "center", mt: 2}}>{ errors.code1?.message }</Box> }
                                </Box>



                                <Typography sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: "10.69px", md: "24px"},
                                    lineHeight: {xs: "26.72px", md: "44.6px"},
                                    letterSpacing: {xs: "-0.9px", md: "-0.14px"},
                                    mb: 2
                                }}>
                                    Resend Code
                                </Typography>


                                <Button variant="contained" 
                                    fullWidth type="submit" 
                                    disabled={ !isValid || isSubmitting } 
                                    sx={{ 
                                        bgcolor: "#fff",
                                        "&.Mui-disabled": {
                                            background: "#c4c4c4",
                                            color: "#797979"
                                        },
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
                                        borderRadius: "12px",
                                        my: 2, 
                                        py: 1.5,
                                        textTransform: "unset"
                                    }}
                                >
                                    <span style={{ display: isSubmitting ? "none" : "initial" }}>Send</span>
                                    <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#fff", fontWeight: "bold" }} />
                                </Button>

                            </form>
                        </ThemeProvider>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default VerifyEmail;
