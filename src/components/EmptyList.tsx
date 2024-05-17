import Box from '@mui/material/Box'

interface MyComponentProps {
    notFoundText?: string
};

const EmptyListComponent: React.FC<MyComponentProps> = ({notFoundText = 'not found'}) => {
    return (
        <Box sx={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: '20%',
        }}>
            <img src='/src/assets/images/empty.png' style={{ width: 200, height: 200 }} />
            <h4 style={{
                color: 'gray',
                fontSize: 20,
                textAlign: 'center'
            }}>
                {notFoundText}
            </h4>
        </Box>
    )
}

export default EmptyListComponent;
