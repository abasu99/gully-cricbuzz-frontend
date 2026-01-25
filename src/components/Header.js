import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Header() {
  const navigate = useNavigate();
  const { setSharedData } = useAppContext();
  const token = sessionStorage.getItem("token");
  const [btnName,setBtnName]=useState('All');

  const logout = () => {
    sessionStorage.clear();
    navigate("/auth");
  };

  const matchesBtnClick = ()=>{
    if(btnName==='All') setBtnName('My')
      else setBtnName('All')
    setSharedData(btnName)
    navigate("/");
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#0f172a", // slate-900
        borderBottom: "1px solid rgba(255,255,255,0.08)"
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
          px: 2,
          justifyContent: "space-between"
        }}
      >
        {/* Brand */}
        <Typography
          onClick={() => navigate("/")}
          sx={{
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "1.05rem",
            letterSpacing: 0.4,
            color: "#e5e7eb"
          }}
        >
          Gully CricBuzz
        </Typography>

        {/* Actions */}
        <Stack direction="row" spacing={1.5}>
          {token && (
            <>
            <Button
              onClick={() => matchesBtnClick()}
              sx={{
                color: "#9ca3af",
                fontSize: "18px",
                "&:hover": {
                  color: "#e5e7eb",
                  backgroundColor: "transparent"
                },
                textTransform: 'none'
              }}
            >
             {btnName} matches
            </Button>
            <Button
              onClick={() => navigate("/create-match")}
              sx={{
                color: "#9ca3af",
                fontSize: "18px",
                "&:hover": {
                  color: "#e5e7eb",
                  backgroundColor: "transparent"
                },
                textTransform: 'none'
              }}
            >
              Create Match
            </Button>
            </>
          )}

          {token ? (
            <Button
              onClick={logout}
              sx={{
                color: "#9ca3af",
                fontSize: "18px",
                "&:hover": {
                  color: "#ef4444",
                  backgroundColor: "transparent"
                },
                textTransform: 'none'
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              sx={{
                color: "#e5e7eb",
                fontSize: "0.85rem",
                border: "1px solid rgba(255,255,255,0.12)",
                px: 2,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.05)"
                }
              }}
            >
              Login
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
