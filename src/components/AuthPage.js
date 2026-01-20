import { useState } from "react";
import { authApi } from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Link
} from "@mui/material";

export default function AuthPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = async () => {
        try {
            if (isLogin) {
                const res = await authApi.post("/login", {
                    email: form.email,
                    password: form.password
                });
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("user-data", JSON.stringify({
                    userId: res.data.user._id,
                    email: res.data.user.email,
                    name: res.data.user.name
                }));
                navigate('/');
            } else {
                await authApi.post("/register", form);
                navigate('/auth');
                setIsLogin(true);
            }
        } catch (err) {
            alert(err.response?.data?.error || "Something went wrong");
        }
    };

    if (sessionStorage.getItem("token")) {
        return <Navigate to="/" replace />;
    } else {
        return (
            <>
                <Box
                    sx={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                            "linear-gradient(135deg, #141e30 0%, #243b55 100%)"
                    }}
                >
                    <Card
                        sx={{
                            width: 380,
                            borderRadius: 4,
                            backdropFilter: "blur(12px)",
                            background: "rgba(255,255,255,0.1)",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                            color: "white"
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" textAlign="center" fontWeight={600}>
                                {isLogin ? "Welcome Back 👋" : "Create Account ✨"}
                            </Typography>

                            <Typography
                                variant="body2"
                                textAlign="center"
                                sx={{ opacity: 0.8, mb: 3 }}
                            >
                                {isLogin
                                    ? "Login to manage your matches"
                                    : "Register to start scoring live matches"}
                            </Typography>

                            {!isLogin && (
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    variant="outlined"
                                    margin="dense"
                                    onChange={handleChange}
                                    InputLabelProps={{ style: { color: "#ddd" } }}
                                    sx={textFieldStyle}
                                />
                            )}

                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                variant="outlined"
                                margin="dense"
                                onChange={handleChange}
                                InputLabelProps={{ style: { color: "#ddd" } }}
                                sx={textFieldStyle}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                margin="dense"
                                onChange={handleChange}
                                InputLabelProps={{ style: { color: "#ddd" } }}
                                sx={textFieldStyle}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    py: 1.2,
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    background:
                                        "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"
                                }}
                                onClick={submit}
                            >
                                {isLogin ? "Login" : "Register"}
                            </Button>

                            <Typography
                                variant="body2"
                                textAlign="center"
                                sx={{ mt: 2, opacity: 0.85 }}
                            >
                                {isLogin ? (
                                    <>
                                        Don’t have an account?{" "}
                                        <Link
                                            component="button"
                                            onClick={() => setIsLogin(false)}
                                            sx={{ color: "#00c6ff", fontWeight: 600 }}
                                        >
                                            Register
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?{" "}
                                        <Link
                                            component="button"
                                            onClick={() => setIsLogin(true)}
                                            sx={{ color: "#00c6ff", fontWeight: 600 }}
                                        >
                                            Login
                                        </Link>
                                    </>
                                )}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </>
        );
    }
}

/* ---------- Shared styles ---------- */
const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
        color: "white",
        borderRadius: 2,
        "& fieldset": {
            borderColor: "rgba(255,255,255,0.4)"
        },
        "&:hover fieldset": {
            borderColor: "#00c6ff"
        }
    }
};
