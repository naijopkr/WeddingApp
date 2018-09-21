import React, { Component } from 'react'
import { connect } from 'react-redux'
import M from 'materialize-css'
import { fetchPhotos, updatePhoto } from '../actions'

class Photos extends Component {
  componentDidMount = () => {
    this.props.fetchPhotos()
  }

  renderPhoto = (photos) => {
    return (
      photos.map((photo) => {
        return (
          <tr key={photo._id}>
            <td>{photo.key}</td>
            <td>
              <img 
                src={`${photo.location}_thumbnail`} 
                width='200px' alt={photo.key} />
            </td>
            <td>
              <button 
               className={`btn ${photo.authorized ? 'red' : 'green'}`}
               onClick={() => {
                 photo.authorized = !photo.authorized
                 this.props.updatePhoto(photo)
               }}>
                {photo.authorized ? 'Desautorizar' : 'Autorizar'}
              </button>
            </td>
          </tr>
        )
      })
    )
  }

  renderContent = (authorized) => {
    return (
      <table className='highlight'>
        <thead>
          <tr>
            <th>Nome do arquivo</th>
            <th>Foto</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {this.renderPhoto(this.props.photos.filter(photo => 
            photo.authorized === authorized))}  
        </tbody>
      </table>
    )
  }

  render = () => {
    const { photos } = this.props
    return (
      <div className='container'>
        <div className='row'>
            <div className='col s12 center'><h3>Photos</h3></div>
        </div>
        { photos.length > 0
        ? <div className='row'>
            <div className='col s12'>
              <ul className='tabs' ref={tabs => M.Tabs.init(tabs)}>
                <li className='tab col s6'><a href='#going'>Autorizadas</a></li>
                <li className='tab col s6'><a href='#notgoing'>Para autorizar</a></li>
              </ul>
            </div>
            <div id='going'>{this.renderContent(true)}</div>
            <div id='notgoing'>{this.renderContent(false)}</div>
          </div>
        : <div className='vertical-wrapper'>
            <p className='center'>No messages to show</p>      
          </div> 
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { photos: state.photos }
}

Photos = connect(
  mapStateToProps, 
  { fetchPhotos, updatePhoto })(Photos)

export default Photos