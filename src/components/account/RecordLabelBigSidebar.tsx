import { useNavigate } from 'react-router-dom';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { useSettingStore } from '@/state/settingStore';
import { useUserStore } from '@/state/userStore';



interface _Props {
    // openModal: boolean,
    setSideNav: (state: boolean) => void;
}

const RecordLabelBigSidebarComponent: React.FC<_Props> = ({setSideNav}) => {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const _logOutUser = useUserStore((state) => state._logOutUser);


    return (
        <Box onMouseEnter={() => setSideNav(false)} onMouseLeave={() => setSideNav(true)}
            sx={{
                maxWidth: "200px",
                width: '100%',
            }}
        >
            <Box
                sx={{
                    // height: '100dvh',
                    // overflow: 'auto',
                    pt: {xs: 5, md: 10},
                }}
            >
                <List>
                    <ListItem disablePadding sx={{ color: darkTheme ? "#FBFBFB" : "#1C1B1F" }} >
                        <ListItemButton onClick={() => navigate('/account/record-label')}>
                            <ListItemIcon
                                sx={{
                                    "&.MuiListItemIcon-root": {
                                        minWidth: '0px',
                                        pr: "5px"
                                    }
                                }}
                            >
                                <HomeIcon sx={{ color: darkTheme ? "#FBFBFB" : "#1C1B1F" }} />
                            </ListItemIcon>

                            <ListItemText primary="Home" />

                            <IconButton  onClick={() => setSideNav(true)}>
                                <CloseIcon sx={{ fontSize: '16px', color: darkTheme ? "#FBFBFB" : "#1C1B1F" }} />
                            </IconButton>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ my: '40px' }}>
                        <ListItemButton disabled
                            sx={{
                                "&.Mui-disabled": {
                                    opacity: 1
                                }
                            }}  
                        >
                            <ListItemText 
                                primary="Analytics"
                                sx={{ 
                                    color: "#C89FF5", 
                                    "& .MuiListItemText-primary": {
                                        fontWeight: '900', 
                                        fontSize: '15px' ,
                                    }
                                }} 
                            />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding 
                        sx={{ 
                            mb: '40px',
                            color: "#666666"
                        }}
                    >
                        <ListItemButton onClick={() => navigate('/account/record-label/sales-report')}>
                            <ListItemIcon
                                sx={{
                                    "&.MuiListItemIcon-root": {
                                        minWidth: '0px',
                                        pr: "5px"
                                    }
                                }}
                            >
                                <ReceiptLongIcon sx={{ color: "#666666" }}  />
                            </ListItemIcon>

                            <ListItemText primary="Sales report" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding
                        sx={{ 
                            mb: '40px',
                            color: "#666666"
                        }}
                    >
                        <ListItemButton onClick={() => navigate('/account/record-label/balance-history')}>
                            <ListItemIcon
                                sx={{
                                    "&.MuiListItemIcon-root": {
                                        minWidth: '0px',
                                        pr: "5px"
                                    }
                                }}
                            >
                                <AccountBalanceWalletIcon sx={{ color: "#666666" }}  />
                            </ListItemIcon>

                            <ListItemText primary="Balance history"/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding
                        sx={{ 
                            mb: '40px',
                            color: "#666666"
                        }}
                    >
                        <ListItemButton onClick={() => navigate('/account/record-label/analytics-reach')}>
                            <ListItemIcon
                                sx={{
                                    "&.MuiListItemIcon-root": {
                                        minWidth: '0px',
                                        pr: "5px"
                                    }
                                }}
                            >
                                <AssessmentOutlinedIcon sx={{ color: "#666666" }}  />
                            </ListItemIcon>

                            <ListItemText primary="Reach" />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Box my="auto">
                    <Box p="8px 16px" mb="23px">
                        <Stack direction="row" alignItems="center" spacing="15px"
                            onClick={() => navigate('add-artist')}
                            sx={{
                                color: darkTheme ? '#C8F452' : '#5B8E14',
                                fontWeight: '400',
                                fontSize: '13px',
                                border: `1px solid ${ darkTheme ? '#C8F452' : '#5B8E14' }`,
                                borderRadius: '6.09px',
                                padding: 1,
                                width: "130px",
                                cursor: 'pointer'
                            }}
                        >
                            <PersonIcon />
                            <Typography>Add Artist</Typography>
                        </Stack>
                    </Box>

                    <Box p="8px 16px">
                        <Stack direction="row" alignItems="center" spacing="15px"
                            onClick={() => _logOutUser()}
                            sx={{
                                color: '#666666',
                                fontWeight: '400',
                                fontSize: '13px',
                                // border: '1px solid #666666',
                                borderRadius: '6.09px',
                                padding: 1,
                                width: "130px",
                                bgcolor: '#34343459',
                                cursor: 'pointer'
                            }}
                        >
                            <SettingsPowerIcon />
                            <Typography>Log out</Typography>
                        </Stack>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default RecordLabelBigSidebarComponent;