import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { matchApi } from "../services/api";
import socket from "../services/socket";
import '../styles/LiveScorePage.css'
import { TextField, Dialog, Button, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function LiveMatch() {
    const { id } = useParams();
    const [match, setMatch] = useState(null);
    const [runOutRuns, setRunOutRuns] = useState(0);
    const [controlsDisable, setControlsDisable] = useState(0);
    const [open, setOpen] = useState(false);
    const [mom, setMom] = useState('');
    // const token = sessionStorage.getItem("token");
    let userData = sessionStorage.getItem("user-data");
    if (userData) {
        userData = JSON.parse(userData)
    }

    useEffect(() => {
        matchApi.get(`/${id}`).then(res => setMatch(res.data));

        socket.emit("join-match", id);

        socket.on("live-score", data => {
            setMatch(data);
            // isControlsDisabled();
        });

        return () => {
            socket.off("live-score");
        };
    }, [id]);

    if (!match) return <p>Loading...</p>;

    //   const score = match.battingTeam === "Team A" ? match.teamA : match.teamB;

    const sendBall = (runs, specialBall = '') => {
        socket.emit("update-score", {
            matchId: id,
            runs,
            specialBall
        });
    };

    const matchAction = (action) => {
        setControlsDisable(false)
        matchApi.patch(`/${id}?action=${action}`, { mom }).then(res => setMatch(res.data));
        setOpen(false)
    }

    const isControlsDisabled = () => {
        const battingTeam = match.battingTeam === "Team A" ? match.teamA : match.teamB
        console.log('hoi', match.oversLimit, match.currentOver, match.wicketPerSide, battingTeam.wickets)
        if (match.oversLimit === match.currentOver || match.wicketPerSide === battingTeam.wickets) setControlsDisable(true);
        else setControlsDisable(false);
    }

    return (

        <div style={{ minHeight: '100vh' }}>
            <div className="container">
                <div className="card scoreboard">
                    <div className="teams">
                        <div className={`team-card ${match.battingTeam === "Team A" ? "active" : ""}`}>
                            <div className="team-name">{match.teamA.name}</div>
                            <div className="team-score">
                                {match.teamA.score}/{match.teamA.wickets}
                            </div>
                        </div>

                        <div className={`team-card ${match.battingTeam === "Team B" ? "active" : ""}`}>
                            <div className="team-name">{match.teamB.name}</div>
                            <div className="team-score">
                                {match.teamB.score}/{match.teamB.wickets}
                            </div>
                        </div>
                    </div>
                    <div>Over: {match.currentOver}.{match.currentBall}</div>
                </div>
            </div>
            {/* <h2>{match.matchName}</h2>

            <h3>
                {match.teamA.name}: {match.teamA.score}/{match.teamA.wickets}
            </h3>
            <h3>
                {match.teamB.name}: {match.teamB.score}/{match.teamB.wickets}
            </h3>

            <p>
                Over: {match.currentOver}.{match.currentBall} |
                Batting: {match.battingTeam === "Team A" ? match.teamA.name : match.teamB.name}
            </p> */}
            {(userData && userData.userId === match?.createdBy && match.status === 'LIVE') ? <>

                <div className="controls">
                    <div className="numbers">
                        {[0, 1, 2, 3, 4, 5, 6].map(r =>
                            <button disabled={controlsDisable} key={r} onClick={() => sendBall(r)}>{r}</button>
                        )}
                    </div>
                    <div className="numbers">
                        <button disabled={controlsDisable} className="wicket" onClick={() => sendBall(0, 'wicket')}>Wicket</button>
                        <button disabled={controlsDisable} className="wicket" onClick={() => sendBall(0, 'wide')}>Wd</button>
                        <button disabled={controlsDisable} className="wicket" onClick={() => sendBall(0, 'nb')}>NB</button>
                        <span>
                            <TextField sx={{
                                width: '50px',
                                backgroundColor: 'white',
                                borderRadius: '12px 0 0 12px',
                                height: '47px',
                                position: 'initial'
                            }} value={runOutRuns} onChange={(e) => setRunOutRuns(e.target.value)}></TextField>
                            <button disabled={controlsDisable} className="run-out" onClick={() => sendBall(runOutRuns, 'wicket')}>Run Out</button>
                        </span>
                    </div>
                    <br></br>
                    <div className="numbers">
                        <button className="switch" onClick={() => matchAction('switch')}>Switch side</button>
                        <button className="end" onClick={() => setOpen(true)}>End Match</button>
                        {/* <button onClick={() => socket.emit("undoLastBall", id)}>Undo</button> */}
                    </div>
                </div>
            </> : <></>}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>End Match</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to end this match?
                        <br></br>
                        {match.oversLimit !== match.currentOver ? <>
                            Still some overs are remaining
                        </> : <></>
                        }
                    </DialogContentText>
                    {match.oversLimit === match.currentOver ? <>
                        <TextField value={mom} onChange={(e) => setMom(e.target.value)} placeholder="Man of the Match"></TextField>
                        <Button sx={{
                            textDecoration: 'none'
                        }}

                            onClick={() => matchAction('end')}>End Match</Button>
                    </> : <>
                        <Button onClick={() => matchAction('abandon')}>Abandon Match</Button>
                    </>}
                </DialogContent>
            </Dialog>
        </div>
    );
}
