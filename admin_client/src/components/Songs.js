import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSongs, deleteSong } from '../actions'

class Songs extends Component {
  componentDidMount = () => {
    this.props.fetchSongs()
  }

  renderSong = (songs) => {
    return (
      songs.map((song) => {
        return (
          <tr key={song._id}>
            <td>{song.name}</td>
            <td>{song.artist}</td>
            <td>{song.song}</td>
            <td>
              <button className='btn red' 
               onClick={() => { 
                if (window.confirm(`Deseja realmente música enviada por ${song.name}`)) 
                  this.props.deleteSong(song._id) 
              }}>
                Delete
              </button>
            </td>
          </tr>
        )
      })
    )
  }

  render = () => {
    const { songs } = this.props
    return (
      <div className='container'>
        <div className='row'>
            <div className='col s12 center'><h3>Songs</h3></div>
        </div>
        { songs.length > 0
        ? <table className='highlight'>
            <thead>
              <tr>
                <th>Enviado por</th>
                <th>Artista/Banda</th>
                <th>Título da música</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {this.renderSong(songs)}  
            </tbody>
          </table>
        : <div className='vertical-wrapper'>
            <p className='center'>No messages to show</p>      
          </div> 
        }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return { songs: state.songs }
}

Songs = connect(
  mapStateToProps, 
  { fetchSongs, deleteSong })(Songs)

export default Songs