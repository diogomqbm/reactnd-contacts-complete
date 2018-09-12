import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import { Route } from 'react-router-dom'
class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    console.log('posrender')
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    }).catch(err => console.log(err))
  }

  deleteContact = (contact) => {
    ContactsAPI.remove(contact).then(contact => {
      this.setState(prevState => ({
        contacts: prevState.contacts.filter(item => item.id !== contact.id)
      }))
    }).catch(err => console.log(err))
  }

  createContact = (contact) => {
    ContactsAPI.create(contact).then(contact => {
      this.setState(prevState => ({
        contacts: prevState.contacts.concat([ contact ])
      }))
    }).catch(err => console.log(err))
  }

  render() {
    console.log('render')
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts 
          contacts={this.state.contacts} 
          deleteContact={this.deleteContact}
          />
          )}/>
          <Route path='/create' render={({ history }) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.createContact(contact)
                history.push('/')
              }}            
            />
          )}/>
      </div>
    )
  }
}

export default App;
