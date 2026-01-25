import { TextField, Button, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { matchApi } from "../services/api";

import "../styles/createMatchPage.css"



function CreateMatch() {
  const navigate = useNavigate();
  const decisions = ['Team A', 'Team B'];
  const [matchId, setMatchId] = useState('');
  console.log('matchId', matchId)
  const [matchName, setMatchName] = useState('');
  const [battingTeam, setBattingTeam] = useState('Team A');
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [wicketPerSide, setWicketPerSide] = useState(10);
  const [overs, setOvers] = useState(5);
  const [isStarted, setIsStarted] = useState(false);


  const startMatch = async () => {
    if (!matchName || !teamA || !teamB || !overs || !battingTeam || !wicketPerSide || overs < 1 || wicketPerSide < 1)
      return;

    setIsStarted(true);
    const res = await matchApi.post("", {
      matchName,
      teamA: {
        name: teamA,
        batFirst: battingTeam === 'Team A' ? true : false
      },
      teamB: {
        name: teamB,
        batFirst: battingTeam === 'Team B' ? true : false
      },
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
  }

  return (
    <>
      <div className="container">
        <div className="card create-match">
          <h2>🏏 Create New Match</h2>
          <br></br>
          <TextField id="match-name" label="Match Name" value={matchName} variant="outlined" onChange={(e) => setMatchName(e.target.value)} />
          <TextField type='number' id="overs" label="Overs" value={overs} variant="outlined" onChange={(e) => setOvers(e.target.value)} />
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
          <TextField id="team-a" label="Team A" variant="outlined" value={teamA} onChange={(e) => setTeamA(e.target.value)} />
          <TextField id="team-b" label="Team B" variant="outlined" value={teamB} onChange={(e) => setTeamB(e.target.value)} />
          <TextField type='number' id="wicketPerSide" label="Wickets Per Side" variant="outlined" value={wicketPerSide} onChange={(e) => setWicketPerSide(e.target.value)} />
          <br></br>
          <br></br>
        </div>
        <br></br>
        <Button variant="contained" onClick={startMatch} disabled={isStarted}>
          {/* {!isStarted ? 'Start Match' : 'Send'} */}
          Create & Start Match
        </Button>
      </div>
    </>
  )
}

export default CreateMatch;
