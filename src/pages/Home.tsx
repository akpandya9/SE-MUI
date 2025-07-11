import { useState, type FC, type MouseEvent } from "react";
import { Link as RouterLink } from "react-router";

// Asset Imports
import Logo from "@/assets/Logo.svg";
import CloudImage from "@/assets/CloudSaaSImageTBg.png";
import CTOAvatar from "@/assets/Raj-Shah.png";
import { faqs } from "@/lib/constants";

// MUI Core Components
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  Link,
  Grid,
  Avatar,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Popover,
  Dialog,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// MUI Icons
import {
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircleOutline as BadgeCheck,
  MonetizationOnOutlined as CircleDollarSignIcon,
  CloudOutlined as Cloud,
  ShieldOutlined as ShieldCheck,
  TrendingDownOutlined as TrendingDown,
  HeadsetMicOutlined as Headset,
  Twitter,
  LinkedIn,
  Facebook,
} from "@mui/icons-material";
import LoginPopover from "@/components/LoginPopover";

const Home: FC = () => {
  const [email, setEmail] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElLogin, setAnchorElLogin] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const openLogin = Boolean(anchorElLogin);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLogin(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElLogin(null);
  };

  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar
        position='static'
        color='transparent'
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "grey.200", bgcolor: "white" }}
      >
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <Link
              component={RouterLink}
              to='/'
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Box
                component='img'
                src={Logo}
                alt='SafetyXchange Logo'
                sx={{ height: 40, width: 40, borderRadius: "50%" }}
              />
              <Typography
                variant='h6'
                component='span'
                sx={{ ml: 2, fontWeight: "bold", color: "primary.main" }}
              >
                TrialSafetyXchange
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop nav */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 3,
              }}
            >
              <Link
                href='#'
                color='text.primary'
                sx={{ textDecoration: "none" }}
              >
                About Us
              </Link>
              <Button variant='contained' color='primary' size='small'>
                Subscribe Now
              </Button>
              <Button color='primary' onClick={handleLoginClick}>
                Login
              </Button>
              {!isMobile && (
                <Popover
                  open={openLogin}
                  anchorEl={anchorElLogin}
                  onClose={handlePopoverClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{ sx: { width: 360, p: 2 } }}
                >
                  <LoginPopover onClose={handlePopoverClose} />
                </Popover>
              )}
            </Box>

            {/* Mobile menu */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton color='inherit' onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>About Us</MenuItem>
                <MenuItem onClick={handleMenuClose}>Subscribe Now</MenuItem>
                <MenuItem onClick={handleLoginClick}>Login</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {isMobile && (
        <Dialog
          open={Boolean(anchorElLogin)}
          onClose={handlePopoverClose}
          fullWidth
          maxWidth='xs'
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 4,
            }}
          >
            <LoginPopover onClose={handlePopoverClose} />
          </Box>
        </Dialog>
      )}

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(to bottom, white, #f0f7ff)",
          py: { xs: 8, lg: 12 },
        }}
      >
        <Container maxWidth='lg'>
          <Grid
            container
            spacing={5}
            alignItems='center'
            sx={{
              flexDirection: { xs: "column", lg: "row" },
              textAlign: { xs: "center", lg: "left" },
            }}
          >
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box>
                <Typography
                  variant='h2'
                  component='h1'
                  fontWeight='bold'
                  mb={2}
                >
                  Simplify E2B R3 Compliance with SafetyXchange
                </Typography>
                <Typography
                  variant='h6'
                  color='text.secondary'
                  mb={4}
                  sx={{
                    maxWidth: { xs: "100%", lg: 500 },
                    mx: { xs: "auto", lg: 0 },
                  }}
                >
                  A cloud‑based and lightweight, affordable, and user‑friendly
                  tool designed to ensure compliance with the E2B R3 standard
                  while minimizing operational burden.
                </Typography>
                <Button variant='contained' size='large'>
                  Subscribe Now
                </Button>
              </Box>
            </Grid>

            <Grid
              size={{ xs: 0, lg: 6 }}
              sx={{
                display: { xs: "none", lg: "flex" },
                justifyContent: "flex-end",
              }}
            >
              <Box
                component='img'
                src={CloudImage}
                alt='Cloud SaaS'
                sx={{ width: "100%", height: "auto" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 10, lg: 15 } }}>
        <Container maxWidth='lg'>
          <Grid container spacing={8}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant='h5' mb={3}>
                Our Founder’s Vision
              </Typography>
              <Box display='flex' alignItems='center' mb={2}>
                <Avatar src={CTOAvatar} sx={{ width: 56, height: 56, mr: 2 }} />
                <Box>
                  <Typography fontWeight='bold'>Raj Shah</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Founder, CTIS Inc.
                  </Typography>
                </Box>
              </Box>
              <Typography variant='body1' fontStyle='italic'>
                "SafetyXchange has revolutionized our compliance workflow…
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant='h5' mb={3}>
                Why SafetyXchange?
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <BadgeCheck color='primary' sx={{ fontSize: 32 }} />
                  <Typography fontWeight='bold'>
                    Effortless E2B R3 Compliance
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <CircleDollarSignIcon color='primary' sx={{ fontSize: 32 }} />
                  <Typography fontWeight='bold'>
                    Cost‑Effective & Scalable
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Cloud color='primary' sx={{ fontSize: 32 }} />
                  <Typography fontWeight='bold'>
                    Cloud‑Based Simplicity
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant='h5' mb={3}>
                Get in Touch
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  id='email'
                  type='email'
                  label='Email'
                  placeholder='john.doe@gmail.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant='outlined'
                  helperText='Enter your Email Address'
                  fullWidth
                />
                <Button variant='contained' color='primary'>
                  Subscribe Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Compliance Features */}
      <Box sx={{ py: { xs: 10, lg: 15 }, bgcolor: "grey.50" }}>
        <Container maxWidth='lg'>
          <Box textAlign='center' mb={6}>
            <Typography variant='h3' component='h2' fontWeight='bold'>
              Your Compliance, Simplified
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              {
                icon: <ShieldCheck sx={{ fontSize: 48 }} color='primary' />,
                title: "Seamless FDA Compliance",
                text: "Stay compliant without the complexity",
              },
              {
                icon: <TrendingDown sx={{ fontSize: 48 }} color='primary' />,
                title: "Reduced IT Costs",
                text: "Peace of mind with dedicated assistance",
              },
              {
                icon: <Headset sx={{ fontSize: 48 }} color='primary' />,
                title: "Expert Support",
                text: "Peace of mind with dedicated assistance",
              },
            ].map((item, idx) => (
              <Grid size={{ xs: 12, md: 4 }} key={idx}>
                <Card elevation={2} sx={{ textAlign: "center", p: 2 }}>
                  <CardContent>
                    <Box mb={2}>{item.icon}</Box>
                    <Typography
                      variant='h6'
                      component='h3'
                      fontWeight='bold'
                      mb={1}
                    >
                      {item.title}
                    </Typography>
                    <Typography color='text.secondary'>{item.text}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: { xs: 8, lg: 5 } }}>
        <Container maxWidth='md'>
          <Box textAlign='center'>
            <Typography variant='h3' component='h2' fontWeight='bold' mb={2}>
              Ready to Ensure Compliance?
            </Typography>
            <Typography variant='h6' color='text.secondary' mb={4}>
              Join Safety Exchange today and stay ahead of the curve.
            </Typography>
            <Button variant='contained' size='large' color='primary'>
              Subscribe Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: { xs: 10, lg: 15 } }}>
        <Container maxWidth='lg'>
          <Grid container spacing={8} alignItems='start'>
            <Grid size={{ xs: 12, lg: 5 }}>
              <Typography variant='h3' component='h2' fontWeight='bold' mb={2}>
                Frequently asked questions
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                Explore our frequently asked questions...
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, lg: 7 }}>
              {faqs.map((faq, idx) => (
                <Accordion
                  key={faq.id}
                  defaultExpanded={idx === 0}
                  elevation={0}
                  sx={{
                    "&:before": { display: "none" },
                    borderBottom: 1,
                    borderColor: "grey.200",
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box
                      sx={{
                        width: 4,
                        height: 20,
                        bgcolor: "primary.main",
                        mr: 2,
                        borderRadius: "2px",
                      }}
                    />
                    <Typography fontWeight='medium'>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color='text.secondary'>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component='footer'
        sx={{ bgcolor: "white", borderTop: 1, borderColor: "grey.200", py: 6 }}
      >
        <Container maxWidth='lg'>
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box display='flex' alignItems='center' mb={2}>
                <Box
                  component='img'
                  src={Logo}
                  alt='SafetyXchange Logo'
                  sx={{ height: 40, width: 40, borderRadius: "50%" }}
                />
                <Typography
                  variant='h6'
                  component='span'
                  ml={2}
                  fontWeight='bold'
                  color='primary.main'
                >
                  TrialSafetyXchange
                </Typography>
              </Box>
              <Typography color='text.secondary' sx={{ maxWidth: 400, mb: 2 }}>
                Simplifying E2B R3 compliance for healthcare organizations
                worldwide.
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                sales@ctsinc.com
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                www.ctsinc.com
              </Typography>
            </Grid>

            <Grid size={{ xs: 6, md: 2 }}>
              <Typography fontWeight='bold' mb={1}>
                Company
              </Typography>
              {[
                "About Us",
                "Services",
                "Product",
                "Pricing",
                "Testimonial",
              ].map((link) => (
                <Link
                  key={link}
                  href='#'
                  display='block'
                  color='text.secondary'
                  sx={{ mb: 0.5, textDecoration: "none" }}
                >
                  {link}
                </Link>
              ))}
            </Grid>

            <Grid size={{ xs: 6, md: 2 }}>
              <Typography fontWeight='bold' mb={1}>
                Contact
              </Typography>
              {["Help", "FAQs", "Terms & Conditions", "Privacy Policy"].map(
                (link) => (
                  <Link
                    key={link}
                    href='#'
                    display='block'
                    color='text.secondary'
                    sx={{ mb: 0.5, textDecoration: "none" }}
                  >
                    {link}
                  </Link>
                )
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Typography fontWeight='bold' mb={1}>
                Socials
              </Typography>
              <Box display='flex' gap={1}>
                {[
                  <Twitter key='tw' />,
                  <LinkedIn key='li' />,
                  <Facebook key='fb' />,
                ].map((icon, idx) => (
                  <IconButton
                    key={idx}
                    sx={{ bgcolor: "primary.light", color: "white" }}
                  >
                    {icon}
                  </IconButton>
                ))}
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant='body2' color='text.secondary' textAlign='center'>
            © {new Date().getFullYear()} SafetyXchange. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
