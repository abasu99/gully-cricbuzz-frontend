import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button, Chip, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { matchApi } from "../services/api";

export default function Home() {
    const [matches, setMatches] = useState([]);
    const navigate = useNavigate();
    let userData=sessionStorage.getItem("user-data");
    if(userData){
        userData=JSON.parse(userData)
    }
    console.log('user-data',userData)

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        const res = await matchApi.get(userData?.userId?`?createdBy=${userData.userId}`:``);
        setMatches(res.data.result || res.data);
    };

    return (
        <>
        <Box
            sx={{
                // minHeight: "100vh",
                p: 4,
                background:
                    "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)"
            }}
        >
            <Typography
                variant="h4"
                fontWeight={700}
                color="white"
                mb={4}
                textAlign="center"
            >
                🏏 My Recent Matches
            </Typography>

            <Grid container spacing={3}>
                {matches.map((match) => (
                    <Grid item
                        xs={12}
                        sm={6}
                        md={6}     
                        lg={4}    
                        key={match._id}
                        onClick={() => navigate(`/live-score/${match._id}`)}
                        display="flex">
                        <MatchCard match={match} />
                    </Grid>
                ))}
            </Grid>
        </Box>
        <section style={{fontSize:'80px',fontFamily:'monospace'}}>
        Umpire nahi hai
        <br></br>
        par score toh hai...
        </section>
        </>
    );
}

/* ---------- Match Card ---------- */
function MatchCard({ match, onOpen }) {

    return (
        <Card
            sx={{
                width: "100%",
                height: "100%",    
                minWidth: 320,           
                borderRadius: 4,
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
                color: "white",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                transition: "0.3s ease",
                display: "flex",
                flexDirection: "column", // 🔥 keeps button aligned
                cursor: "pointer",
                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.6)"
                }
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                >
                    <Typography variant="subtitle1" fontWeight={600}>
                        {match.matchName}
                    </Typography>

                    <Chip
                        label={match.status}
                        size="small"
                        sx={{
                            backgroundColor: match.status === 'LIVE' ? "#ff4d4f" : match.status === 'UPCOMING' ? "purple" : "#4caf50",
                            color: "white",
                            fontWeight: 600
                        }}
                    />
                </Box>

                <Box mt={2}>
                    <TeamRow
                        name={match.teamA.name}
                        score={match.teamA.score}
                        wickets={match.teamA.wickets}
                        active={match.battingTeam === "Team A"}
                    />
                    <TeamRow
                        name={match.teamB.name}
                        score={match.teamB.score}
                        wickets={match.teamB.wickets}
                        active={match.battingTeam === "Team B"}
                    />
                </Box>
                <h3 style={{color: 'yellow'}}>{match.result}</h3>
                {/* <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            borderRadius: 3,
            fontWeight: 600,
            background:
              "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"
          }}
          
        >
          View Match
        </Button> */}
            </CardContent>
        </Card>
    );
}

/* ---------- Team Row ---------- */
function TeamRow({ name, score, wickets, active }) {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                py: 0.5,
                opacity: active ? 1 : 0.7,
                fontWeight: active ? 600 : 400
            }}
        >
            <Typography variant="body2">{name}</Typography>
            <Typography variant="body2">
                {score}/{wickets}
            </Typography>
        </Box>
    );
}
