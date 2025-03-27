import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Stack } from "@mui/material";
import { createArt } from "../../api/artApi";

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
  const [text, setText] = React.useState("");
  const [typeBanner, setTypeBanner] = React.useState("standard");
  const [artText, setArtText] = React.useState("");
  const [inputError, setInputError] = React.useState(false);
  const [inputErrorMessage, setInputErrorMessage] = React.useState("");

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    setTypeBanner(event.target.value);
  };

  const handleGenerate = async () => {
    if (!text.trim()) {
      setInputError(true);
      setInputErrorMessage("Text is required");
      return;
    }

    setInputError(false);
    setInputErrorMessage("");

    const result = await createArt(typeBanner, text);
    if (result.output) {
      setArtText(result.output);
    } else {
      const errorMessage =
        result.error && typeof result.error === "string"
          ? result.error
          : result.error?.message || "Error generating ASCII art";

      setArtText(errorMessage);
    }
  };

  return (
    <Card variant="outlined">
      <Box
        component="form"
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <Stack direction="row" spacing={2}>
          <FormControl sx={{ flex: 1 }}>
            <TextField
              type="text"
              name="text"
              multiline
              placeholder="Your text here"
              required
              fullWidth
              variant="outlined"
              color={inputError ? "error" : "primary"}
              error={inputError}
              helperText={inputError ? inputErrorMessage : " "}
              value={text}
              onChange={handleChangeText}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "55px",
                  alignItems: "center",
                  overflow: "auto",
                },
              }}
            />
          </FormControl>
          <FormControl variant="filled">
            <InputLabel>Type</InputLabel>
            <Select value={typeBanner} onChange={handleChangeType}>
              <MenuItem value="standard">Standard</MenuItem>
              <MenuItem value="shadow">Shadow</MenuItem>
              <MenuItem value="thinkertoy">Thinkertoy</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Button onClick={handleGenerate} fullWidth variant="contained">
          Generate
        </Button>
      </Box>
      <Divider>Your art</Divider>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "150px",
          border: "1px solid",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "auto",
            fontFamily: "monospace",
            fontSize: "14px",
            lineHeight: "1.2",
            whiteSpace: "pre",
            padding: "8px",
          }}
        >
          {artText}
        </Box>
      </Box>
    </Card>
  );
}
