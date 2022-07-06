import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Footer from './Footer'
import Title from './Title'

export default function App() {
  const [games, setGames] = useState([])
  const links = []
  const ht = []
  const at = []
  const [homeTotals, setHomeTotals] = useState([])
  const [awayTotals, setAwayTotals] = useState([])

  useEffect(() => {
    axios.get('http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1')
    .then(res => {
      setGames(res.data.dates[0].games)
    })
  }, [])

  useEffect(() => {
    for (let i = 0; i < games.length; i++) {
      links.push(games[i].link)
    }

    for (let i = 0; i < links.length; i++) {
      axios.get(`http://statsapi.mlb.com${links[i]}`)
      .then(res => {
        ht.push(res.data.liveData.linescore.teams.home)
        at.push(res.data.liveData.linescore.teams.away)
        setHomeTotals(old => [...old, res.data.liveData.linescore.teams.home])
        setAwayTotals(old => [...old, res.data.liveData.linescore.teams.away])
      })
    }
  }, [games])

  const e = () => {
    console.log(awayTotals)
  }

  return (
    <div className="container">
      <Title/>
      <button onClick={e}>ss</button>
      <h1 className='mb-5 text-center'>Today's Games:</h1>
      <table className="table table-striped">
          <thead>
              <tr>
                  <th scope="col">Runs</th>
                  <th scope="col">Hits</th>
                  <th scope="col">Errors</th>
              </tr>
          </thead>
          <tbody>
              {homeTotals.map((item) => {
                  return (
                      <tr>
                          <th scope="row">{item.runs}</th>
                          <td>{item.hits}</td>
                          <td>{item.errors}</td>
                      </tr>
                  )
              })}
          </tbody>
      </table>
      {games.map(game => {
        return (
          <div className='row'>
            <div className='col-2'></div>
            <div className='shadow p-3 mb-5 bg-white rounded col-8'>
              <h6 className='text-center'>{game.teams.away.team.name} <small className='text-muted'>({game.teams.away.leagueRecord.wins}-{game.teams.away.leagueRecord.losses})</small> @ {game.teams.home.team.name} <small className='text-muted'>({game.teams.home.leagueRecord.wins}-{game.teams.home.leagueRecord.losses})</small></h6>
              <h6 className='text-center'><small className='text-muted'>Score:</small><br></br>{game.teams.away.score || 0} - {game.teams.home.score || 0}</h6>
            </div>
          </div>
        )
      })
      }
      <Footer/>
    </div>
  )
}
