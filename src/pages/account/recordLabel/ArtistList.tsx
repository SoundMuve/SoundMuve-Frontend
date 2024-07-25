import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

import album1 from "@/assets/images/album/album1.jpeg";
import album2 from "@/assets/images/album/album2.jpg";
import album3 from "@/assets/images/album/album3.jpeg";
import album4 from "@/assets/images/album/album4.jpg";
import album5 from "@/assets/images/album/album5.jpg";

import { stringAvatar } from '@/util/resources';
import { useSettingStore } from '@/state/settingStore';
import AccountWrapper from '@/components/AccountWrapper';
import PromotionalAdsComponent from '@/components/PromotionalAds';
import RecordLabelBigSidebarComponent from '@/components/account/RecordLabelBigSidebar';
import RecordLabelSmallSidebarComponent from '@/components/account/RecordLabelSmallSidebar';
import RecordLabelSearchComponent from '@/components/account/RecordLabelSearch';



const albumPreview = [
    {
        image: album1,
        title: 'David',
        subtitle: '5 Songs'
    },
    {
        image: album2,
        title: 'John',
        subtitle: '5 Songs'
    },
    {
        image: album3,
        title: 'Mavi',
        subtitle: '5 Songs'
    },
    {
        image: album4,
        title: 'Portable',
        subtitle: '5 Songs'
    },
    {
        image: album5,
        title: 'Limo',
        subtitle: '5 Songs'
    },
    {
        image: album1,
        title: 'David',
        subtitle: '5 Songs'
    },
    {
        image: album2,
        title: 'John',
        subtitle: '5 Songs'
    },
    {
        image: album3,
        title: 'Mavi',
        subtitle: '5 Songs'
    },
    {
        image: album4,
        title: 'Portable',
        subtitle: '5 Songs'
    },
    {
        image: album5,
        title: 'Limo',
        subtitle: '5 Songs'
    },
    {
        image: album1,
        title: 'David',
        subtitle: '5 Songs'
    },
    {
        image: album2,
        title: 'John',
        subtitle: '5 Songs'
    },
    {
        image: album3,
        title: 'Mavi',
        subtitle: '5 Songs'
    },
    {
        image: album4,
        title: 'Portable',
        subtitle: '5 Songs'
    },
    {
        image: album5,
        title: 'Limo',
        subtitle: '5 Songs'
    },
];

const ArtistList_RL = () => {
    // const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    // const userData = useUserStore((state) => state.userData); 
    // const accessToken = useUserStore((state) => state.accessToken);

    const [smallSideNav, setsmallSideNav] = useState(true);


    return (
        <AccountWrapper>
            <Box sx={{ position: "relative", zIndex: 10 }}>

                <Box sx={{ display: "flex" }}>

                    <Box
                        sx={{
                            bgcolor: darkTheme ? "#1C1B1F" : '#EFEFEF',
                            borderRadius: '8.67px',
                            display: {xs: 'none', sm: 'initial'},
                            // overflow: 'auto',
                            transition: '0.5s',
                            transitionTimingFunction: 'ease-in-out',
                        }}
                    >
                        {
                            smallSideNav ? 
                            <RecordLabelSmallSidebarComponent setSideNav={setsmallSideNav} />
                            :
                            <RecordLabelBigSidebarComponent setSideNav={setsmallSideNav} />
                        }
                    </Box>

                    <Box flexGrow={1}
                        sx={{
                            // height: '100dvh',
                            overflow: 'auto',
                            scrollBehavior: 'smooth',
                            flex: 1,

                            pt: 5,
                            px: {xs: 2, md: 5, lg: 12},
                            pb: 5,
                        }}
                    >

                        <RecordLabelSearchComponent />


                        <Box my={5}>
                            <PromotionalAdsComponent />
                        </Box>

                        <Box my={5}>

                            <Grid container spacing={3}>
                                {
                                    albumPreview.map((item, i) => (
                                        <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                                            <Stack alignItems="center">
                                                <Avatar
                                                    alt={`${item.title} icon`}
                                                    src={item.image}
                                                    // variant="rounded"
                                                    aria-label={item.title}
                                                    sx={{ 
                                                        boxShadow: "0px 4px 8px -1px rgba(0, 0, 0, 0.1)",
                                                        // bgcolor: stringToColor(project.title),
                                                        width: "110px",
                                                        height: "110px",
                                                        // mb: "0.5rem",
                                                        // p: 1
                                                    }}
                                                    children={<Typography sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "bold"
                                                    }}>{stringAvatar(item.title)}</Typography>}
                                                />
                        
                                                <Typography variant='h4' component="h4"
                                                    sx={{
                                                        fontWeight: '900',
                                                        fontSize: '23.73px',
                                                        lineHeight: '14.24px',
                                                        letterSpacing: '-0.59px',
                                                        mt: '26px'
                                                    }}
                                                >{item.title}</Typography>

                                                <Typography variant='body2'
                                                    sx={{
                                                        fontWeight: "400",
                                                        fontSize: '14.24px',
                                                        lineHeight: '10.68px',
                                                        letterSpacing: '-0.59px',
                                                        color: '#666666',
                                                        mt: '13px'
                                                    }}
                                                >{item.subtitle}</Typography>
                                            </Stack>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </AccountWrapper>
    )
}

export default ArtistList_RL