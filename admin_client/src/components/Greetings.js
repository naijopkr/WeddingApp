import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGreetings, deleteGreetings } from '../actions'

class Greetings extends Component {

  componentDidMount = () => {
    this.props.fetchGreetings()
  }

  renderGreeting = (greetings) => {
    return (
      greetings.map((greeting) => {
        return (
          <tr key={greeting._id}>
            <td>{greeting.name}</td>
            <td>{greeting.message}</td>
            <td>
              <button className='btn red' 
               onClick={() => { 
                if (window.confirm(`Deseja realmente apagar a mensagem de ${greeting.name}`)) 
                  this.props.deleteGreetings(greeting._id) 
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
    const { greetings } = this.props
    return (
      <div className='container'>
        <div className='row'>
            <div className='col s12 center'><h3>Greetings</h3></div>
        </div>
        { greetings.length > 0
        ? <table className='highlight'>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Mensagem</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {this.renderGreeting(greetings)}  
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
  return { greetings: state.greetings }
}

Greetings = connect(
  mapStateToProps, 
  { 
    fetchGreetings, 
    deleteGreetings 
  })(Greetings)

export default Greetings