import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
// import axios from 'axios';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

import AccountWrapper from '../../../components/AccountWrapper';
import Container from '@mui/material/Container';
// import { SnackbarToastInterface } from '../../../components/ToastNotification';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const formSchema = yup.object({
    recordLabelName: yup.string().required().min(2).trim().label("First Name"),
    phoneNumber: yup.string().required().min(7, "Incorrect phone number").max(15, "Incorrect phone number").trim().label("Last Name"),
    country: yup.string().required().min(2).trim().label("Country"),
    // logo: yup.string().required().min(2).trim().label("logo"),
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
  


function CreateSingle() {
    // const navigate = useNavigate();
    const outerTheme = useTheme();
    
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    // const [toastNotification, setToastNotification] = useState<SnackbarToastInterface>({
    //     display: false,
    //     status: "success",
    //     message: ""
    // });
    

    const { 
        handleSubmit, register, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });

            
    const onSubmit = async (_formData: typeof formSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });


    }



    return (
        <AccountWrapper>
            <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 5, md: 10}  }}>

                <IconButton 
                    // onClick={() => _setTheme(!darkTheme)}
                    sx={{
                        color: "#fff", 
                        mb: 2,
                        display: {xs: "none", md: "block"}
                    }}
                >
                    <ChevronLeftIcon />
                </IconButton>

                <Typography 
                    sx={{
                        fontWeight: "900",
                        fontSize: {xs: "39.96px", md: "60px"},
                        lineHeight: {xs: "42.49px", md: "63.8px"},
                        letterSpacing: {xs: "-0.89px", md: "-1.34px"},
                    }}
                >
                    Create a Single
                </Typography>



                <Container 
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <ThemeProvider theme={customTheme(outerTheme)}>
                        <form noValidate onSubmit={ handleSubmit(onSubmit) } 
                            style={{
                                width: "100%",
                                maxWidth: "734px",
                                // textAlign: "lef"
                            }}
                        >


                            <Grid container spacing="20px">
                                
                                <Grid item
                                    xs={12} md={6}
                                    sx={{ alignSelf: "center" }}
                                >
                                    <Typography sx={{
                                        fontWeight: "400",
                                        fontSize: "15.38px",
                                        lineHeight: "38.44px",
                                        letterSpacing: "-0.12px"
                                    }}>
                                        Single Title
                                    </Typography>
                                </Grid>

                                <Grid item
                                    xs={12} md={6}
                                    sx={{ alignSelf: "center" }}
                                >
                                    <Box sx={{ my: 3 }}>

                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='recordLabelName'
                                            type='text'
                                            label=''
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
                                            
                                            error={ errors.recordLabelName ? true : false }
                                            { ...register('recordLabelName') }
                                        />
                                        { errors.recordLabelName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.recordLabelName?.message }</Box> }
                                    </Box>
                                    
                                </Grid>

                         

                            </Grid>





                            {
                                apiResponse.display && (
                                    <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                        <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                    </Stack>
                                )
                            }

                            <Button variant="contained" 
                                fullWidth type="submit" 
                                disabled={ !isValid || isSubmitting } 
                                sx={{ 
                                    bgcolor: "#fff",
                                    "&.Mui-disabled": {
                                        background: "#9c9c9c",
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
                                    my: 3, py: 1.5,
                                    fontSize: {md: "15.38px"},
                                    fontWeight: "900",
                                    letterSpacing: "-0.12px",
                                    textTransform: "none"
                                }}
                            >
                                <span style={{ display: isSubmitting ? "none" : "initial" }}>Continue</span>
                                <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
                            </Button>
                        </form>
                    </ThemeProvider>
                </Container>

            </Box>
        </AccountWrapper>
    )
}

export default CreateSingle;