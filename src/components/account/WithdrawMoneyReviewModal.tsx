import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

import { useSettingStore } from '@/state/settingStore';


interface _Props {
    openModal: boolean,
    closeModal: () => void;

    openWithdrawConfirmationModal: () => void;
}

const WithdrawMoneyReviewModalComponent: React.FC<_Props> = ({
    openModal, closeModal, openWithdrawConfirmationModal
}) => {
    const darkTheme = useSettingStore((state) => state.darkTheme);

    const handleConfirmRequest = () => {
        closeModal();
        openWithdrawConfirmationModal();


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
                            Payout Review
                        </Typography>
                    </Box>


                    <Box id="payout-modal-description">
                        <Box sx={{my: "35px"}}>
                            <Typography
                                sx={{
                                    fontWeight: "700",
                                    fontSize: "14px",
                                    lineHeight: "12px",
                                    letterSpacing: "-1px",
                                    // color: "#797979"
                                }}
                            >
                                Amount
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
                                $200.00
                            </Typography>
                        </Box>

                        <Stack direction={"row"} spacing={"8px"} sx={{mb: "70px"}}>
                            <Typography
                                sx={{
                                    fontWeight: "700",
                                    fontSize: "14px",
                                    lineHeight: "12px",
                                    letterSpacing: "-1px"
                                }}
                            > Fees: </Typography>


                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "11px",
                                    lineHeight: "17px",
                                    color: "#797979"
                                }}
                            >
                                Fees displayed are only an estimate. More Information on payout fees can be found on Payoneer's Fee Overview Page
                            </Typography>
                        </Stack>

                        <Stack direction={"row"} spacing={"20px"} alignItems={"center"} justifyContent={"space-between"}>
                            <Box 
                                sx={{
                                    p: "10px 25px",
                                    borderRadius: "17px",
                                    background: darkTheme ? "#fff" : "#272727",
                                    color: darkTheme ? "#000" : "#fff",
                                    cursor: "pointer",
                                    display: "inline-block"
                                }}
                                onClick={() => handleConfirmRequest()}
                            >
                                <Typography 
                                    sx={{
                                        fontWeight: '700',
                                        fontSize: "12px",
                                        lineHeight: "12px",
                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                        textAlign: 'center',
                                    }}
                                > Confirm Request </Typography>
                            </Box>

                            <Box 
                                sx={{
                                    p: "10px 25px",
                                    borderRadius: "17px",
                                    // background: darkTheme ? "#fff" : "#272727",
                                    border: darkTheme ? "1px solid #fff" : "1px solid #000000",
                                    color: darkTheme ? "#fff" : "#000",
                                    cursor: "pointer",
                                    display: "inline-block"
                                }}
                                onClick={() => closeModal()}
                            >
                                <Typography 
                                    sx={{
                                        fontWeight: '700',
                                        fontSize: "12px",
                                        lineHeight: "12px",
                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                        textAlign: 'center',
                                    }}
                                > Cancel Request </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default WithdrawMoneyReviewModalComponent;