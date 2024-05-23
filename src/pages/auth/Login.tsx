import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

import AuthHeaderComponent from '../../components/AuthHeader';
import style from '../pricingStyles.module.css';
import { Container } from '@mui/material';


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
  
function Login() {
    const outerTheme = useTheme();

    const { 
        handleSubmit, register, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onBlur' });

        
    const onSubmit = (formData: typeof formSchema.__outputType) => {
        console.log(formData);
        

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

                <Container>
                    <Box sx={{
                        py: {xs: 5, sm: 10, md: 10},
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center"
                    }}>
                        <ThemeProvider theme={customTheme(outerTheme)}>
                            <form noValidate onSubmit={ handleSubmit(onSubmit) } 
                                style={{
                                    maxWidth: 643,
                                    width: "100%",
                                    // height: 400,
                                    alignSelf: "center"
                                }}
                            >

                                <Typography sx={{
                                    fontWeight: "bolder",
                                    fontSize: {xs: 35, md: 60},
                                }}>
                                    Login
                                </Typography>

                                <Box sx={{ py: 2 }}>
                                    <Typography sx={{textAlign: "left", fontSize: {xs: 13, md: 17}, pb: 1}}>
                                        Email Address
                                    </Typography>

                                    <TextField 
                                        variant="outlined" 
                                        fullWidth 
                                        id='email'
                                        type='email'
                                        label=''
                                        autoFocus
                                        inputMode='email'
                                        defaultValue=""
                                        InputLabelProps={{
                                            style: { color: '#c1c1c1', fontWeight: "400" },
                                        }}
                                        InputProps={{
                                            sx: {
                                                borderRadius: "16px",
                                            },
                                        }}
                                        
                                        error={ errors.email ? true : false }
                                        { ...register('email') }
                                    />
                                    { errors.email && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.email?.message }</Box> }

                                </Box>

                                <Box sx={{ py: 2 }}>
                                    <Typography sx={{textAlign: "left", fontSize: {xs: 13, md: 17}, pb: 1}}>
                                        Password
                                    </Typography>

                                    <TextField 
                                        id='password'
                                        type='password'
                                        label=''
                                        inputMode='text'
                                        variant="outlined" 
                                        fullWidth 
                                        defaultValue=""
                                        InputLabelProps={{
                                            style: { color: '#c1c1c1', fontWeight: "400" },
                                        }}
                                        InputProps={{
                                            sx: {
                                                borderRadius: "16px",
                                            },
                                        }}
                                        
                                        error={ errors.password ? true : false }
                                        { ...register('password') }
                                    />
                                    { errors.password && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.password?.message }</Box> }

                                </Box>

                                {/* <Link to="#" style={{
                                    textAlign: "right",
                                    color: "#8638E5",
                                    float: 'right'
                                }}>
                                    Forgot Password?
                                </Link> */}

                                
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
                                        py: 1.5
                                    }}
                                >
                                    <span style={{ display: isSubmitting ? "none" : "initial" }}>Login</span>
                                    <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#fff", fontWeight: "bold" }} />
                                </Button>

                                <Box sx={{my: 2}}>
                                    <Typography sx={{
                                        fontSize: 17,
                                    }}>
                                        Don't have an account?
                                        <Link to='#' style={{
                                            fontWeight: "bold",
                                            color: "#8638E5",
                                            // position: "inherit"
                                        }}> sign up </Link>
                                    </Typography>
                                </Box>

                            </form>
                        </ThemeProvider>
                    </Box>
                </Container>
            </Box>

            {/* <FooterComponent /> */}
        </>
    )
}

export default Login;
