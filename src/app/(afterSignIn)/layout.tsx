'use client'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";

const WEB_BEZEL_MIN_HEIGHT = 670;
const WEB_BEZEL_MAX_HEIGHT = 820;
const WEB_BEZEL_WIDTH = 375;

const styles = {
  root: {
    backgroundColor: '#FFF'
  },
  desktop: {
    flex: 1,
    width: WEB_BEZEL_WIDTH,
    minHeight: WEB_BEZEL_MIN_HEIGHT,
    maxHeight: WEB_BEZEL_MAX_HEIGHT,
    borderRadius: 8,
    marginHorizontal: 'auto',
    marginVertical: 24,
    overflow: 'hidden',
    transform: 'translateZ(0)', // fixed safari border radius overflow not working issue
    boxShadow:
      'rgb(0 0 0 / 2%) 0px 0px 1px, rgb(0 0 0 / 8%) 0px 4px 8px, rgb(0 0 0 / 8%) 0px 16px 24px, rgb(0 0 0 / 2%) 0px 24px 32px',
  },
  mobile: {
    flex: 1,
    minWidth: 320,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Stack sx={[styles.root, matches ? styles.desktop : styles.mobile]}>
      <Header />
        {children}
      <Footer />
    </Stack>
  );
}
