import { TextField, Button, MenuItem, Select, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { matchApi } from "../services/api";
import socket from "../services/socket";

import "../styles/createMatchPage.css"
// const socket = io('http://localhost:3001');

const names = ['0', '1', '2', '3', '4', '6', 'W', 'wd', 'NB',];
const decisions = ['Team A', 'Team B'];

function ManageScore() {
    const navigate = useNavigate();
    // const { matchId } = useParams();
    const [matchId, setMatchId] = React.useState('');
    const [ballUpdate, setBallUpdate] = React.useState([]);
    const [striker, setStriker] = React.useState('');
    const [nonStriker, setNonStriker] = React.useState('');
    const [bowler, setBowler] = React.useState('');
    // const [tossWinner, setTossWinner] = React.useState('');
    // const [decision, setDecision] = React.useState('');
    const [matchName, setMatchName] = React.useState('');
    const [battingTeam, setBattingTeam] = React.useState('Team A');
    const [teamA, setTeamA] = React.useState('');
    const [teamB, setTeamB] = React.useState('');
    const [wicketPerSide, setWicketPerSide] = React.useState(10);
    const [overs, setOvers] = React.useState(5);
    const [isStarted, setIsStarted] = React.useState(false);

    const [scoreCard, setScoreCard] = React.useState(null);

    // React.useEffect(() => {
    //     socket.on('live-score', (msg) => {
    //         const latestScore = JSON.parse(msg)
    //         if (latestScore.matchId == matchId) {
    //             setScoreCard(latestScore);
    //             console.log('live', latestScore);
    //             if (scoreCard && scoreCard.balls%6===0) {
    //                 swapBatsmen();
    //                 setBowler('');
    //             }
    //         }
    //     });
    //     // await fetch(`http://localhost:3000/api/v1/match/${matchId}`).then((data)=>{
    //     //     console.log('data',data)
    //     // })
    //     return () => {
    //         socket.off('live-score');
    //     };

    // }, []);


    const handleChange = (event) => {
        const { target: { value }, } = event;
        setBallUpdate(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const startMatch = async () => {
        setIsStarted(true);
        const res = await matchApi.post("", {
            matchName,
            teamA: { name: teamA,batFirst: battingTeam==='Team A'?true:false},
            teamB: { name: teamB,batFirst: battingTeam==='Team B'?true:false },
            oversLimit: overs,
            battingTeam,
            wicketPerSide
        });

        console.log(res.data.result._id)
        setMatchId(res.data.result._id);

        setTimeout(async () => {

            await matchApi.patch(`/${res.data.result._id}?action=start`);
            navigate(`/live-score/${res.data.result._id}`);
        }, 2000);
        // updateScore();
    }
    const updateScore = () => {
        const payload = { striker, nonStriker, bowler, ballUpdate, battingTeam, matchId };
        // const payload = { striker, nonStriker, bowler, ballUpdate, battingTeam, bowlingTeam, tossWinner, decision, matchId };
        socket.emit('update-score', JSON.stringify(payload));
        if ((ballUpdate.includes('1') || ballUpdate.includes('3')) || (scoreCard && scoreCard.balls % 6 === 0)) {
            swapBatsmen();
        } else if (ballUpdate.includes('W')) {
            setStriker('');
        }
        setBallUpdate([])
    }

    const swapBatsmen = () => {
        const tempStriker = striker;
        setStriker(nonStriker);
        setNonStriker(tempStriker);
    }

    return (
        <>
            <div className="container">
                <div className="card create-match">
                    <h2>🏏 Create New Match</h2>
                    <br></br>
                    <TextField id="match-name" label="Match Name" value={matchName} variant="outlined" onChange={(e) => setMatchName(e.target.value)} />
                    <TextField id="overs" label="Overs" value={overs} variant="outlined" onChange={(e) => setOvers(e.target.value)} />
                    <Select
                        labelId="batting-team-label"
                        id="batting-team"
                        value={battingTeam}
                        label="Batting Team"
                        // disabled={isStarted}
                        onChange={(e) => setBattingTeam(e.target.value)}
                    >
                        {decisions.map((dec) => (
                            <MenuItem key={dec} value={dec}>{dec}</MenuItem>
                        ))}
                    </Select>
                    <TextField id="team-a" label="Team A" variant="outlined" value={teamA} disabled={isStarted} onChange={(e) => setTeamA(e.target.value)} />
                    <TextField id="team-b" label="Team B" variant="outlined" value={teamB} disabled={isStarted} onChange={(e) => setTeamB(e.target.value)} />
                    <TextField id="wicketPerSide" label="Wickets Per Side" variant="outlined" value={wicketPerSide} disabled={isStarted} onChange={(e) => setWicketPerSide(e.target.value)} />
                    <br></br>
                    <br></br>
                    {/* <Button variant="contained" onClick={startMatch} disabled={isStarted}>Start Match</Button>
            <br></br>
            <br></br> */}
                    {/* <TextField id="batsman-1" label="Striker" variant="outlined" value={striker} disabled={!ballUpdate.includes('W') && isStarted} onChange={(e) => setStriker(e.target.value)} />
                <TextField id="batsman-2" label="Non Striker" variant="outlined" value={nonStriker} disabled={!ballUpdate.includes('W') && isStarted} onChange={(e) => setNonStriker(e.target.value)} /> */}
                    {/* <Select
                    labelId="demo-multiple-checkbox-label"
                    id="ball-update"
                    multiple
                    value={ballUpdate}
                    onChange={handleChange}
                    input={<OutlinedInput label="Ball update" />}
                    renderValue={(selected) => selected.join(', ')}

                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={ballUpdate.includes(name)} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select> */}
                    {/* <TextField id="bowler" label="Bowler" variant="outlined" value={bowler} disabled={scoreCard && scoreCard.balls%6 !== 0} onChange={(e) => setBowler(e.target.value)} /> */}
                </div>
                <br></br>
                <Button variant="contained" onClick={startMatch}>
                    {/* {!isStarted ? 'Start Match' : 'Send'} */}
                    Create & Start Match
                </Button>
            </div>
        </>
    )
}

export default ManageScore;