import { useState } from 'react';
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

import newPasswordImg from "./../../assets/images/newPassword.png";
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const formSchema = yup.object({
    email: yup.string().required()
    .email("Please enter a valid email address.")
    .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    , "Please enter a valid email address.")
    .trim().label("Email Address"),

    password: yup.string().required()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
      'Password must include uppercase, lowercase, digit, and special character'
    ).trim().label("Password"),

    confirmPassword: yup.string().required()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
      'Password must include uppercase, lowercase, digit, and special character'
    ).trim().label("Confirm Password"),
    
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
  
function CreateNewPassword() {
    const outerTheme = useTheme();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  

    const { 
        handleSubmit, register, setError, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onBlur' });

        
    const onSubmit = (formData: typeof formSchema.__outputType) => {
        console.log(formData);
        if (formData.password !== formData.confirmPassword) {
            setError("password", {message: "Passwords do not match"});
            setError("confirmPassword", {message: "Passwords do not match"});
            return;
        }
        
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
                                    mx: "auto"
                                }}>
                                    <img 
                                        src={newPasswordImg} 
                                        alt="create new password lock image" 
                                        style={{ width: "100%" }} 
                                    />
                                </Box>

                                <Typography sx={{
                                    fontWeight: "900",
                                    fontSize: {xs: "35px", md: "50px"},
                                    lineHeight: {xs: "49.28px", md: "82.28px"},
                                    letterSpacing: {xs: "-0.9px", md: "-1.5px"}
                                }}>
                                    Create new password
                                </Typography>

                                <Typography sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: "10.69px", md: "24px"},
                                    lineHeight: {xs: "26.72px", md: "44.6px"},
                                    letterSpacing: {xs: "-0.9px", md: "-0.14px"},
                                    textAlign: "center"
                                }}>
                                    Your new password must be <br />
                                    different form the previous one
                                </Typography>


                                <Box sx={{ py: 2 }}>
                                    <Typography sx={{
                                        fontWeight: "400",
                                        fontSize: "15.38px",
                                        lineHeight: "38.44px",
                                        letterSpacing: "-0.12px",
                                        textAlign: "left"
                                    }}>
                                        Password
                                    </Typography>

                                    <TextField 
                                        id='password'
                                        type={showPassword ? "text" : 'password' }
                                        label=''
                                        inputMode='text'
                                        variant="outlined" 
                                        fullWidth 
                                        defaultValue=""
                                        InputLabelProps={{
                                            style: { color: '#c1c1c1', fontWeight: "400" },
                                        }}
                                        InputProps={{
                                            endAdornment: 
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                sx={{color: "#fff"}}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>,
                                            sx: {
                                                borderRadius: "16px",
                                            },
                                        }}
                                        
                                        error={ errors.password ? true : false }
                                        { ...register('password') }
                                    />
                                    { errors.password && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.password?.message }</Box> }

                                </Box>

                                <Box sx={{ pb: 2 }}>
                                    <Typography sx={{
                                        fontWeight: "400",
                                        fontSize: "15.38px",
                                        lineHeight: "38.44px",
                                        letterSpacing: "-0.12px",
                                        textAlign: "left"
                                    }}>
                                        Confirm Password
                                    </Typography>

                                    <TextField 
                                        id='confirmPassword'
                                        type={showPassword ? "text" : 'password' }
                                        label=''
                                        inputMode='text'
                                        variant="outlined" 
                                        fullWidth 
                                        defaultValue=""
                                        InputLabelProps={{
                                            style: { color: '#c1c1c1', fontWeight: "400" },
                                        }}
                                        InputProps={{
                                            endAdornment: 
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                sx={{color: "#fff"}}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>,
                                            sx: {
                                                borderRadius: "16px",
                                            },
                                        }}
                                        
                                        error={ errors.confirmPassword ? true : false }
                                        { ...register('confirmPassword') }
                                    />
                                    { errors.confirmPassword && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.confirmPassword?.message }</Box> }

                                </Box>


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
                                    <span style={{ display: isSubmitting ? "none" : "initial" }}>Save</span>
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

export default CreateNewPassword;