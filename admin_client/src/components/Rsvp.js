import React, { Component } from 'react'
import { connect } from 'react-redux'
import M from 'materialize-css'
import { fetchRsvps, deleteRsvp } from '../actions'

class Rsvp extends Component {
  componentDidMount = () => {
    this.props.fetchRsvps()
  }

  renderRsvp = (rsvps) => {
    return (
      rsvps.map((rsvp) => {
        return (
          <tr key={rsvp._id}>
            <td>{rsvp.name}</td>
            <td>{rsvp.email}</td>
            <td><ul>{rsvp.guests.map((guest, i) => <li key={i}>{guest.name}</li>)}</ul></td>
            <td>
              <button className='btn red' 
               onClick={() => { 
                if (window.confirm(`Deseja realmente apagar o RSVP de ${rsvp.name}`)) 
                  this.props.deleteRsvp(rsvp._id) 
              }}>
                Delete
              </button>
            </td>
          </tr>
        )
      })
    )
  }

  renderContent = (going) => {
    return (
      <table className='highlight'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Convidados</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRsvp(this.props.rsvps.filter(rsvp => rsvp.rsvp === going))}  
        </tbody>
      </table>
    )
  }

  render = () => {
    const { rsvps } = this.props
    return (
      <div className='container'>
        <div className='row'>
            <div className='col s12 center'><h3>RSVP</h3></div>
        </div>
        { rsvps.length > 0
        ? <div className='row'>
            <div className='col s12'>
              <ul className='tabs' ref={tabs => M.Tabs.init(tabs)}>
                <li className='tab col s6'><a href='#going'>Irão</a></li>
                <li className='tab col s6'><a href='#notgoing'>Não Irão</a></li>
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
  return { rsvps: state.rsvps }
}

Rsvp = connect(
  mapStateToProps, 
  { fetchRsvps, deleteRsvp })(Rsvp)

export default Rsvp