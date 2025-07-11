import { useState } from "react";
import { Button, Box, Typography, TextField, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate } from "react-router";

interface Props {
  onClose: () => void;
}
export default function LoginPopover({ onClose }: Props) {
  const [step, setStep] = useState<"login" | "otp">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const resetAll = () => {
    setEmail("");
    setPassword("");
    setOtp("");
    setEmailError("");
    setPasswordError("");
    setStep("login");
    // setAnchorEl(null);
  };

  const validateLogin = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError("Invalid email address");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    return valid;
  };

  const handleLogin = () => {
    if (validateLogin()) {
      // simulate sending OTP
      setStep("otp");
    }
  };

  const isOtpValid = otp.length === 6;

  const handleOtpComplete = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      // simulate login success
      navigate("/dashboard");
      onClose();
      resetAll();
    }
  };

  const handleResend = () => {
    setOtp("");
    // trigger resend logic
  };

  return (
    <>
      {step === "login" ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant='h6' fontWeight='600'>
            User Login
          </Typography>
          <TextField
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            fullWidth
          />
          <TextField
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            fullWidth
          />
          <Button variant='contained' fullWidth onClick={handleLogin}>
            Send OTP →
          </Button>
          <Box textAlign='center'>
            <Button variant='text' size='small'>
              Forgot your password?
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size='small' onClick={() => setStep("login")}>
              <ArrowBackIcon fontSize='small' />
            </IconButton>
            <Typography variant='h6' fontWeight='600'>
              Two-Factor Authentication
            </Typography>
          </Box>
          <Typography variant='body2' color='text.secondary' align='center'>
            We sent a verification code to {email}
          </Typography>
          <MuiOtpInput
            value={otp}
            length={6}
            onChange={handleOtpComplete}
            autoFocus
          />
          <Button variant='contained' fullWidth disabled={!isOtpValid}>
            Enter OTP →
          </Button>
          <Box textAlign='center'>
            <Button variant='text' size='small' onClick={handleResend}>
              Resend OTP
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
