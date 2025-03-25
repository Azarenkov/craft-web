import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { SitemarkIcon } from "./CustomIcons";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Stack } from "@mui/material";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignInCard() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  // const [passwordError, setPasswordError] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const validateInputs = () => {
    const text = document.getElementById("text") as HTMLInputElement;

    let isValid = true;

    if (!text.value) {
      setEmailError(true);
      setEmailErrorMessage("Text is required");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    return isValid;
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SitemarkIcon />
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <Stack
          direction="row" // Lay out items horizontally
          spacing={2} // Add spacing between TextField and Select
          // alignItems="center"
        >
          <FormControl sx={{ flex: 1 }}>
            {" "}
            {/* Allow TextField to take remaining space */}
            {/* <FormLabel htmlFor="text">Text</FormLabel> */}
            <TextField
              id="text"
              type="text"
              name="text"
              // label="Text"
              placeholder="Your text here"
              // autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
              error={emailError}
              helperText={emailError ? emailErrorMessage : " "}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "55px",
                },
              }}
            />
          </FormControl>
          <FormControl variant="filled" sx={{ minWidth: 100 }}>
            <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
              autoWidth
            >
              <MenuItem value={10}>Standard</MenuItem>
              <MenuItem value={20}>Shadow</MenuItem>
              <MenuItem value={30}>Thinkertoy</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          Generate
        </Button>
      </Box>
      <Divider>Your art</Divider>
      {/* <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}></Box> */}
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        AA
      </Typography>
    </Card>
  );
}
