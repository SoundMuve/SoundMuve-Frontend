import React from 'react'
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';


interface _Props {
    // children: React.ReactNode,
    artworkImage: any,
    songTitle: string,
    artistName: string,
    distributedDSP: string[]
}


const AlbumSongItem: React.FC<_Props> = ({
    artistName, artworkImage, distributedDSP, songTitle
}) => {


    return (
        <Box
            sx={{
                height: {xs: "82px", md: "82.92px"}, 
                borderRadius: "8.65px",
                border: "0.07px solid #FFFFFF",
                bgcolor: "#581D3A",
                py: {xs: "6.02px",md: "6.5px"},
                px: "7.2px",

                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8.65px",
                mb: 2
            }}
        >
            <Box
                sx={{
                    width: "70.67px",
                    height: "69.94px",
                    borderRadius: "5.77px",
                    overflow: "hidden"
                }}
            >
                <img 
                    src={artworkImage} alt="album Art"
                    style={{ width: "100%", objectFit: "contain" }}
                />
            </Box>

            <Box>
                <Box 
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "5px",
                        alignItems: "center"
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "700",
                            fontSize: "18.03px",
                            lineHeight: "14.42px",
                            letterSpacing: "-0.09px",
                            color: "#fff"
                        }}
                    >{songTitle}</Typography>

                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: "12px",
                            lineHeight: "12px",
                            letterSpacing: "-0.09px",
                            color: "#AC3A72"
                        }}
                    >{artistName}</Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                        mt:  "7.2px",
                    }}
                >
                    { distributedDSP.map((dsp, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: "82.2px",
                                height: "25.24px",
                                borderRadius: "8.65px",
                                bgcolor: "#C89FF5",
                                py: "5.1px",
                                px: "8.65px",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "10px"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "700",
                                    fontSize: "10.82px",
                                    lineHeight: "14.42px",
                                    letterSpacing: "-0.09px",
                                    color: "#581D3A"
                                }}
                            >{dsp}</Typography>

                            <CheckCircleIcon 
                                sx={{ 
                                    color: "#fff",
                                    fontSize: "10.82px",
                                    lineHeight: "14.42px",
                                    letterSpacing: "-0.09px",
                                }} 
                            />
                        </Box>
                    )) }
                </Box>
            </Box>

        </Box>
    )
}

export default AlbumSongItem;