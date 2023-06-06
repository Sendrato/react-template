import { useMediaQuery, useTheme } from '@mui/material';

const useMedia = () => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return {
    isMobile,
    isMd,
    isLgUp,
  };
};

export default useMedia;
