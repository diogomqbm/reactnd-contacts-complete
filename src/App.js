import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
class App extends Component {
  state = {
    screen: 'cr',
    contacts: []
  }

  componentDidMount() {
    console.log('posrender')
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    }).catch(err => console.log(err))
  }

  deleteContact = (contact) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== contact.id)
    }))
  }

  render() {
    console.log('render')
    return (
      <div>
        {this.state.screen === 'list' 
        ? <ListContacts 
        contacts={this.state.contacts} 
        deleteContact={this.deleteContact}
        />
        : <CreateContact/>
      }
      </div>
    )
  }
}

export default App;
