import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Footer from './Footer'
import Title from './Title'

export default function App() {
  const [games, setGames] = useState([])
  const links = []

  useEffect(() => {
    getGamesForToday()
  }, [])

  useEffect(() => {
    for (let i = 0; i < games.length; i++) {
      links.push(games[i].link)
    }
  }, [games])

  const getGamesForToday = () => {
    axios.get('http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1')
    .then(res => {
      setGames(res.data.dates[0].games)
    })
  }

  return (
    <div className="App">
      <Title/>
      <h1 className='mb-5 text-center'>Today's Games:</h1>
      {games.map(game => {
        return (
          <div className='container w-50 shadow p-3 mb-5 bg-white rounded'>
            <p>{game.teams.away.team.name} ({game.teams.away.leagueRecord.wins}-{game.teams.away.leagueRecord.losses}) @ {game.teams.home.team.name} ({game.teams.home.leagueRecord.wins}-{game.teams.home.leagueRecord.losses})</p>
            <p>Score:<br></br>{game.teams.away.score || 0} - {game.teams.home.score || 0}</p>
          </div>
        )
      })
      }
      <Footer/>
    </div>
  )
}
