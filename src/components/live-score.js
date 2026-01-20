// import * as React from 'react';
// import io from 'socket.io-client';
// import { useParams } from 'react-router-dom';
// import '../App.css'

// const socket = io('http://localhost:3001');

// function LiveScore() {
//     const defaultscorecard = {
//         batsmen: [],
//         bowlers: [],
//         runs: 0,
//         wickets: 0,
//         balls: 0,
//         overs: '0.0',
//         run_rate: '0.00',
//         batting_team: '',
//         bowling_team: '',
//         toss_winner: '',
//         decision: '',
//         result: '',
//         mom: '',
//         innings: 1
//     }
//     const [scoreCard, setScoreCard] = React.useState(defaultscorecard);
//     const inningsMap = { 1: '1st', 2: '2nd', 3: '3rd', 4: '4th' }

//     const { batting_team, bowling_team, runs, wickets, overs, run_rate, batsmen, bowlers, toss_winner, decision, innings } = scoreCard;
//     let striker = {}; let nonStriker = {}; let currentBowler = {};

//     if (batsmen.length && bowlers.length) {
//         striker = batsmen.find(b => b.role === 'STRIKER');
//         nonStriker = batsmen.find(b => b.role === 'NON_STRIKER');
//         currentBowler = bowlers.find(b => b.isBowling);
//     }

//     const { matchId } = useParams();
//     React.useEffect(() => {
//         socket.on('live-score', (msg) => {
//             const latestScore = JSON.parse(msg)
//             if (latestScore.matchId == matchId) {
//                 setScoreCard(latestScore);
//                 console.log('live', latestScore);
//             }
//         });
//         // await fetch(`http://localhost:3000/api/v1/match/${matchId}`).then((data)=>{
//         //     console.log('data',data)
//         // })
//         return () => {
//             socket.off('live-score');
//         };

//     }, []);

//     React.useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const payload = {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ matchId: +matchId }),
//                 };
//                 const response = await fetch(`http://localhost:3001/api/v1/match/update`, payload);
//                 const jsonData = await response.json();
//                 setScoreCard({ ...scoreCard, ...jsonData.result })
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     return (
//         <>
//             <h2>Live Score</h2>
//             <br></br>
//             <div className="live-score-container">
//                 {/* Header */}
//                 <h2 className="match-title">
//                     {batting_team} vs {bowling_team}
//                 </h2>

//                 {/* Scoreboard */}
//                 <div className="score-board">
//                     <p className="team-score">
//                         {batting_team}: {runs}/{wickets}
//                     </p>
//                     <p className="overs-rate">
//                         Overs: {overs} | Run Rate: {run_rate} | {inningsMap[innings]} innings
//                     </p>
//                 </div>

//                 {/* Batsmen Info */}
//                 {striker.name || nonStriker.name &&
//                     <div className="batsmen-section">
//                         <h3 className="section-title">Batsmen</h3>
//                         <ul className="batsmen-list">
//                             {/* {striker?<> */}
//                             <li>
//                                 🟢 {striker.name} (STR): {striker.runs} ({striker.balls})
//                             </li>
//                             {/* </>:<></>}/ */}
//                             <li>
//                                 ⚪ {nonStriker.name} (NON-STR): {nonStriker.runs} ({nonStriker.balls})
//                             </li>
//                         </ul>
//                     </div>
//                 }

//                 {/* Bowler Info */}
//                 {currentBowler.name &&
//                     <div className="bowler-section">
//                         <h3 className="section-title">Bowler</h3>
//                         <p className="bowler-info">
//                             {currentBowler.name} - {currentBowler.overs} overs, {currentBowler.runs} runs, {currentBowler.wickets} wickets
//                         </p>
//                     </div>
//                 }

//                 {/* Footer Info */}
//                 <div className="footer-info">
//                     Toss: {toss_winner} won the toss and chose to {decision}
//                 </div>
//             </div>
//         </>
//     )

// }

// export default LiveScore;