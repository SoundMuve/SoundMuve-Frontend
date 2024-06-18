import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import AccountWrapper from '@/components/AccountWrapper';
import { useSettingStore } from '@/state/settingStore';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import WithdrawMoneyModalComponent from '@/components/account/WithdrawMoneyModal';
import { useState } from 'react';
import WithdrawMoneyReviewModalComponent from '@/components/account/WithdrawMoneyReviewModal';
import WithdrawMoneyConfirmationModalComponent from '@/components/account/WithdrawMoneyConfirmationModal';
import ArtistAnalyticsNavComponent from '@/components/account/ArtistAnalyticsNav';

  
const headerTitle = [
    "Date", "Description", "Debit", "Credit", "Balance", "Currency"
]

const tBodyContent = [
    {
        Date: "21/5/2024",
        Description: "sales",
        Debit: "",
        Credit: "$14.13",
        Balance: "$6,228.76",
        Currency: "USD"
    },
    {
        Date: "21/5/2024",
        Description: "sales",
        Debit: "",
        Credit: "$14.13",
        Balance: "$6,228.76",
        Currency: "USD"
    },
    {
        Date: "21/5/2024",
        Description: "sales",
        Debit: "",
        Credit: "$14.13",
        Balance: "$6,228.76",
        Currency: "USD"
    },
    {
        Date: "21/5/2024",
        Description: "sales",
        Debit: "",
        Credit: "$14.13",
        Balance: "$6,228.76",
        Currency: "USD"
    },
    {
        Date: "21/5/2024",
        Description: "sales",
        Debit: "",
        Credit: "$14.13",
        Balance: "$6,228.76",
        Currency: "USD"
    },
    {
        Date: "21/5/2024",
        Description: "sales",
        Debit: "",
        Credit: "$14.13",
        Balance: "$6,228.76",
        Currency: "USD"
    },
    {
        Date: "21/5/2024",
        Description: "sales",
        Debit: "",
        Credit: "$14.13",
        Balance: "$6,228.76",
        Currency: "USD"
    },
    {
        Date: "21/5/2024",
        Description: "sales",
        Debit: "",
        Credit: "$14.13",
        Balance: "$6,228.76",
        Currency: "USD"
    },
    {
        Date: "21/5/2024",
        Description: "sales",
        Debit: "",
        Credit: "$14.13",
        Balance: "$6,228.76",
        Currency: "USD"
    },
    {
        Date: "21/5/2024",
        Description: "sales",
        Debit: "",
        Credit: "$14.13",
        Balance: "$6,228.76",
        Currency: "USD"
    },
]


function BalanceHistory() {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);



    const [openWithdrawMoneyModal, setOpenWithdrawMoneyModal] = useState(false);

    const [openWithdrawMoneyReviewModal, setOpenWithdrawMoneyReviewModal] = useState(false);

    const [openWithdrawMoneyConfirmationModal, setOpenWithdrawMoneyConfirmationModal] = useState(false);



    return (
        <AccountWrapper>
            <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 7, md: 10}  }}>
                <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                    <IconButton 
                        onClick={() => navigate(-1)}
                        sx={{
                            color: darkTheme ? "#fff" : "#000", 
                            mb: 2,
                            
                        }}
                    >
                        <ChevronLeftIcon sx={{ display: {xs: "none", md: "block"} }} />
                    </IconButton>

                    <ArtistAnalyticsNavComponent darkTheme={darkTheme} currentPage='balance-history' />

                    <Box></Box>
                </Stack>

                <Box sx={{ mt: 7 }}>

                    <Paper 
                        sx={{ 
                            width: '100%',
                            border: "1px solid #D9D9D9",
                            borderRadius: "13px",
                            overflow: "hidden",
                            bgcolor: darkTheme ? "#000" : "#fff",
                            color: darkTheme ? "#fff" : "#000"
                        }}
                    >
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table" 
                                sx={{
                                    [`& .${tableCellClasses.root}`]: {
                                        borderBottom: "none"
                                    }
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" colSpan={3} sx={{ bgcolor: darkTheme ? "#000" : "#fff" }}>
                                            <FormControl fullWidth sx={{ width: "fit-content" }}>
                                                <Select
                                                    labelId="sortByDays"
                                                    id="sortByDays-select"
                                                    label=""
                                                    defaultValue="Last 30 Days"
                                                    placeholder='Last 30 Days'

                                                    sx={{
                                                        color: "#fff",
                                                        borderRadius: "8px",
                                                        bgcolor: "#272727",
                                                        // textAlign: "center",
                                                        border: "none",
                                                        fontWeight: "900",
                                                        fontSize: {xs: "10px", md: "20px"},
                                                        lineHeight: {xs: "12px", md: "24px"},
                                                        letterSpacing: {xs: "-0.67px", md: "-1.34px"},

                                                        '& .MuiSelect-select': {
                                                            p: "5px 14px"
                                                        },

                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            border: "none",
                                                            // borderColor: '#fff',
                                                            p: 0
                                                        },
                                                        // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: '#fff',
                                                        // },
                                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: '#fff',
                                                        // },
                                                        '.MuiSvgIcon-root ': {
                                                            fill: "#797979",
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value="Last 30 Days">
                                                        Last 7 Days
                                                    </MenuItem>
                                                    <MenuItem value="Last 30 Days">
                                                        Last 14 Days
                                                    </MenuItem>
                                                    <MenuItem value="Last 30 Days">
                                                        Last 30 Days
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>

                                        <TableCell align="right" colSpan={3} sx={{ bgcolor: darkTheme ? "#000" : "#fff" }}>
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "10px", md: "18px"},
                                                    lineHeight: {xs: "12px", md: "24px"},
                                                    letterSpacing: {xs: "-0.67px", md: "-1.34px"},
                                                    color: darkTheme ? "#fff" : "#000"
                                                }}
                                            >April 22 - May 21</Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        {headerTitle.map((title, index) => (
                                            <TableCell
                                                key={index}
                                                align={index == 0 ? "left" : index == headerTitle.length - 1 ? "right" : 'center' }
                                                // style={{ top: 57, minWidth: column.minWidth }}
                                                sx={{ bgcolor: darkTheme ? "#000" : "#fff" }}
                                            >
                                                <Box 
                                                    sx={{
                                                        p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                        borderRadius: {xs: "8.14px", md: "12px"},
                                                        background: darkTheme ? "#fff" : "#272727",
                                                        color: darkTheme ? "#000" : "#fff",
                                                        cursor: "pointer",
                                                        display: "inline-block"
                                                    }}
                                                >
                                                    <Typography 
                                                        sx={{
                                                            fontWeight: '900',
                                                            fontSize: {xs: "10.18px", md: "15px"},
                                                            lineHeight: {xs: "8.82px", md: "13px"},
                                                            letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                            textAlign: 'center',
                                                        }}
                                                    > { title } </Typography>
                                                </Box>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {tBodyContent
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                {Object.entries(row).map(([_key,value], indez) => {
                                                    return (
                                                        
                                                        <TableCell 
                                                            key={indez} 
                                                            // align={"center"} 
                                                            align={indez == 0 ? "left" : indez == Object.entries(row).length - 1 ? "right" : 'center' }
                                                            sx={{ 
                                                                color: darkTheme ? "#fff" : "#000",
                                                                fontWeight: "400",
                                                                fontSize: {xs: "9.07px", md: "18px"},
                                                                lineHeight: {xs: "12.1px", md: "24px"},
                                                            }}
                                                        >
                                                            { value }
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>

                            </Table>
                        </TableContainer>

                        <Stack direction={'row'} justifyContent={"right"} sx={{p: 2 }}>
                            <Box 
                                sx={{
                                    p: {xs: "10.18px 19.68px", md: "10px 29px"},
                                    borderRadius: {xs: "8.14px", md: "5px"},
                                    background: darkTheme ? "#fff" : "#272727",
                                    color: darkTheme ? "#000" : "#fff",
                                    cursor: "pointer",
                                    display: "inline-block",
                                    // m: 2,
                                    width: "fit-content"
                                }}
                                onClick={() => setOpenWithdrawMoneyModal(true)}
                            >
                                <Typography 
                                    sx={{
                                        fontWeight: '900',
                                        fontSize: {xs: "10.18px", md: "15px"},
                                        lineHeight: {xs: "8.82px", md: "13px"},
                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                        textAlign: 'center',
                                    }}
                                > Withdraw </Typography>
                            </Box>
                        </Stack>
                    </Paper>
                </Box>
            </Box>



            <WithdrawMoneyModalComponent 
                openModal={openWithdrawMoneyModal}
                closeModal={() => { setOpenWithdrawMoneyModal(false) }}
                
                openWithdrawReviewModal={() => setOpenWithdrawMoneyReviewModal(true)}
            />


            <WithdrawMoneyReviewModalComponent 
                openModal={openWithdrawMoneyReviewModal}
                closeModal={() => { setOpenWithdrawMoneyReviewModal(false) }}

                openWithdrawConfirmationModal={() => setOpenWithdrawMoneyConfirmationModal(true)}
            />

            <WithdrawMoneyConfirmationModalComponent 
                openModal={openWithdrawMoneyConfirmationModal}
                closeModal={() => { setOpenWithdrawMoneyConfirmationModal(false) }}
            />

        </AccountWrapper>
    )
}

export default BalanceHistory;