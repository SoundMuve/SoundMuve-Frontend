import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { ThemeProvider, useTheme } from '@mui/material/styles';

import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

import { useSettingStore } from '@/state/settingStore';
import { customTextFieldTheme } from '@/util/mui';

import PayPalLogo from "@/assets/images/PayPalLogo.png";
import PayoneerLogo from "@/assets/images/PayoneerLogo.png";


interface _Props {
    openModal: boolean,
    closeModal: () => void;

    openWithdrawReviewModal: () => void;
}


const formSchema = yup.object({
    amount: yup.string().required().min(2).trim().label("Amount"),
});

const WithdrawMoneyModalComponent: React.FC<_Props> = ({
    openModal, closeModal, openWithdrawReviewModal
}) => {
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const outerTheme = useTheme();
    const [withdrawOption, setWithdrawOption] = useState('');

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    
    const { 
        handleSubmit, register, reset, formState: { errors, isSubmitting, isValid } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });

    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        console.log(formData);

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        closeModal();
        openWithdrawReviewModal();

        reset();

    }


    return (
        <Modal
            open={openModal}
            onClose={() => closeModal() }
            aria-labelledby="payout-modal-title"
            aria-describedby="payout-modal-description"
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    outline: "none"
                }}
            >
                <Box 
                    sx={{
                        bgcolor: darkTheme ? "#272727" : "#fff",
                        maxWidth: {xs: "92%", sm: "496px"},
                        maxHeight: "605px",
                        borderRadius: "12px",
                        p: "25px",
                        color: darkTheme ? "#fff" : "#000"
                    }}
                >
                    <Box sx={{textAlign: "right"}}>
                        <IconButton onClick={() => closeModal() }>
                            <CloseIcon 
                                sx={{color: darkTheme ? "#fff" : "#000", fontSize: "30px"}} 
                            />
                        </IconButton>
                    </Box>

                    <Box id="payout-modal-title">
                        <Typography variant="h6" component="h2"
                            sx={{
                                fontWeight: "900",
                                fontSize: {xs: "20px", md: "35px"},
                                lineHeight: {xs: "20px", md: "24px"},
                                letterSpacing: {xs: "-0.34px", md: "-1.34px"},
                                textAlign: "center",
                                mt: 2
                            }}
                        >
                            Withdraw money
                        </Typography>

                        <Typography variant='body2' component="p"
                            sx={{
                                fontWeight: "400",
                                fontSize: "14px",
                                lineHeight: "12px",
                                letterSpacing: "-1px",
                                mt: "45px",
                                mb: "25px"
                            }}
                        >Choose payment method</Typography>
                    </Box>


                    <Box id="payout-modal-description">
                        <Stack direction={"row"} flexWrap={'wrap'} gap={"20px"} justifyContent={{xs: "center", md: "left"}}>
                            <Box
                                sx={{
                                    borderBottom: withdrawOption == "PayPal" ? "3px solid #644986" : "none",
                                    pb: 0.5
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "111.12px",
                                        height: "34.97px",
                                        padding: "4px 10px 4px 10px",
                                        border: "1px solid #666666",
                                        borderRadius: "8px",
                                        background: "#FFFFFF",

                                        boxShadow: withdrawOption == "PayPal" ? "1px 3px 18px 0px #C89FF5" : 'none',
                                        
                                        ":hover": {
                                            boxShadow: "1px 3px 18px 0px #C89FF5"
                                        },
                                        overflow: "hidden",
                                    }}
                                    onClick={() => setWithdrawOption("PayPal")}
                                >
                                    <img 
                                        src={PayPalLogo} alt='PayPal Logo'
                                        style={{
                                            width: "100%",
                                            objectFit: "contain"
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    borderBottom: withdrawOption == "Payoneer" ? "3px solid #644986" : "none",
                                    pb: 0.5
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "111.12px",
                                        height: "34.97px",
                                        padding: "4px 10px 4px 10px",
                                        border: "1px solid #666666",
                                        borderRadius: "8px",
                                        background: "#FFFFFF",

                                        boxShadow: withdrawOption == "Payoneer" ? "1px 3px 18px 0px #C89FF5" : 'none',

                                        ":hover": {
                                            boxShadow: "1px 3px 18px 0px #C89FF5"
                                        },
                                        overflow: "hidden"
                                    }}
                                    onClick={() => setWithdrawOption("Payoneer")}
                                >
                                    <img 
                                        src={PayoneerLogo} alt='Payoneer Logo'
                                        style={{
                                            width: "100%",
                                            objectFit: "contain"
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    borderBottom: withdrawOption == "Bank" ? "3px solid #644986" : "none",
                                    pb: 0.5
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "111.12px",
                                        height: "34.97px",
                                        padding: "4px 10px 4px 10px",
                                        border: "1px solid #666666",
                                        borderRadius: "8px",
                                        background: "#FFFFFF",

                                        boxShadow: withdrawOption == "Bank" ? "1px 3px 18px 0px #C89FF5" : 'none',

                                        ":hover": {
                                            boxShadow: "1px 3px 18px 0px #C89FF5"
                                        },
                                        overflow: "hidden"
                                    }}
                                    onClick={() => setWithdrawOption("Bank")}
                                >
                                    <Stack spacing={"14px"} direction={'row'} alignItems={"center"}>

                                        <Typography
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: "20.26px",
                                                lineHeight: "17.36px",
                                                letterSpacing: "-1.45px",
                                                color: "#000"
                                            }}
                                        >Bank</Typography>

                                        <AccountBalanceOutlinedIcon
                                            sx={{ color: "#000" }}
                                        />
                                    </Stack>
                                </Box>
                            </Box>
                            
                        </Stack>

                        <Box sx={{my: "35px"}}>
                            <Typography
                                sx={{
                                    fontWeight: "700",
                                    fontSize: "12px",
                                    lineHeight: "12px",
                                    color: "#797979"
                                }}
                            >
                                Available Balance
                            </Typography>

                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "35px",
                                    lineHeight: "24px",
                                    letterSpacing: "-1.34px",
                                    mt: "25px"
                                }}
                            >
                                $6,288.76
                            </Typography>
                        </Box>

                        <ThemeProvider theme={customTextFieldTheme(outerTheme, darkTheme)}>
                            <form noValidate onSubmit={ handleSubmit(onSubmit) } >
                                <Box sx={{ py: 1 }}>
                                    <Typography sx={{
                                        fontWeight: "700",
                                        fontSize: "12px",
                                        lineHeight: "12px",
                                        letterSpacing: "-1px",
                                        textAlign: "left",
                                        mb: 1
                                    }}>
                                        Amount
                                    </Typography>

                                    <TextField 
                                        variant="outlined" 
                                        fullWidth 
                                        id='amount'
                                        type='tel'
                                        label=''
                                        inputMode='numeric'
                                        defaultValue=""
                                        placeholder='0.00'
                                        
                                        InputLabelProps={{
                                            style: { color: '#c1c1c1', fontWeight: "400" },
                                        }}
                                        InputProps={{
                                            sx: {
                                                borderRadius: "16px",
                                            },
                                            startAdornment: <InputAdornment position="start" sx={{ color: "gray" }}><span>$</span></InputAdornment>
                                        }}
                                        
                                        error={ errors.amount ? true : false }
                                        { ...register('amount') }
                                    />
                                    { errors.amount && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.amount?.message }</Box> }
                                </Box>

                                {
                                    apiResponse.display && (
                                        <Stack sx={{ width: '100%', my: 2 }}>
                                            <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                        </Stack>
                                    )
                                }
                                        
                                <Box 
                                    sx={{ 
                                        mt: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Button variant="contained" 
                                        fullWidth type="submit" 
                                        disabled={ !isValid || isSubmitting } 
                                        sx={{ 
                                            bgcolor: darkTheme ? "#fff" : "#272727",
                                            borderRadius: "17px",
                                            p: "10px 26px",
                                            width: "fit-content",
                                            height: "auto",
                                            "&.Mui-disabled": {
                                                background: "#9c9c9c",
                                                color: "#797979"
                                            },
                                            "&:hover": {
                                                bgcolor: darkTheme ? "#fff" : "#272727",
                                            },
                                            "&:active": {
                                                bgcolor: darkTheme ? "#fff" : "#272727",
                                            },
                                            "&:focus": {
                                                bgcolor: darkTheme ? "#fff" : "#272727",
                                            },

                                            fontWeight: '700',
                                            fontSize: "12px",
                                            lineHeight: "12px",
                                            // letterSpacing: "-0.13px",
                                            // textAlign: 'center',
                                            color: darkTheme ? "#000" : "#fff",
                                            textTransform: "none"
                                        }}
                                    >
                                        <span style={{ display: isSubmitting ? "none" : "initial" }}>Confirm Request</span>
                                        <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
                                    </Button>
                                </Box>

                            </form>
                        </ThemeProvider>

                        <Stack direction={"row"} justifyContent={"center"} sx={{mt: "40px"}}>
                            <Typography 
                                sx={{
                                    fontWeight: '400',
                                    fontSize: "14px",
                                    lineHeight: "12px",
                                    letterSpacing: "-1px",
                                    // textAlign: 'center',
                                    color: darkTheme ? "#fff" : "#000",
                                    cursor: "pointer"
                                }}
                                onClick={() => closeModal() }
                            > Cancel Request </Typography>
                        </Stack>

                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default WithdrawMoneyModalComponent;