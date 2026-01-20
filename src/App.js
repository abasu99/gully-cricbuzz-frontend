import './App.css';
import * as React from 'react';
import io from 'socket.io-client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LiveScore from './components/live-score';
import ManageScore from './components/manage-score';
import CreateMatch from './components/create-match';
import LiveMatch from './components/LiveMatch';
import AuthPage from './components/AuthPage';
import Home from './components/Home';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

const socket = io('http://localhost:3001');

function App() {
  //   const [socketData, setSocketData] = React.useState(null);
  //   React.useEffect(() => {
  //     socket.on('live-score', (msg) => {
  //          const latestScore=JSON.parse(msg)
  //          setSocketData({...latestScore});
  //         // if(latestScore.matchId==matchId){
  //         // setScoreCard(latestScore);
  //         console.log('live', socketData,latestScore);
  //         // }
  //     });
  //     return () => {
  //         socket.off('live-score');
  //     };

  // }, []);

  return (
    <div className='score-page'>
      <BrowserRouter>
        {/* <Router> */}
        <div>
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Live Score</Link>
              </li>
              <li>
                <Link to="/manage-score">Manage Score</Link>
              </li>
            </ul>
          </nav> */}

          <Header />
          <Routes>
            {/* <Route path="/" element={<CreateMatch />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            {/* <Route path="/live-score/:matchId" element={<LiveScore />} /> */}
            <Route path="/live-score/:id" element={<LiveMatch />} />
            <Route path="/manage-score" element={
              <ProtectedRoute>
                <ManageScore />
              </ProtectedRoute>
            } />
          </Routes>
          <Footer />
        </div>
        {/* </Router> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
