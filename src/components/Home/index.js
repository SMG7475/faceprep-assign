/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-lone-blocks */

import React from 'react'
import Header from '../Header'
import './index.css'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      hasMoreContacts: true,
      isLoading: false,
      page: 1,
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.loadMoreContacts()
  }

  handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!this.state.isLoading && this.state.hasMoreContacts) {
        this.setState({isLoading: true})
        setTimeout(() => {
          this.loadMoreContacts()
        }, 1000)
      }
    }
  }

  loadMoreContacts() {
    // make API call to load more contacts
    fetch(`https://randomuser.me/api/?results=500&page=${this.state.page}`)
      .then(response => response.json())
      .then(data => {
        const updatedContacts = this.state.contacts.concat(data.results)
        this.setState({
          contacts: updatedContacts,
          hasMoreContacts: data.results.length > 0,
          isLoading: false,
          page: this.state.page + 1,
        })
      })
  }

  render() {
    return (
      <div>
        <Header />
        <ul className="cards-container">
          {this.state.contacts.map(contact => (
            <li className="card" key={contact.email}>
              <p>
                {contact.name.first} {contact.name.last}
              </p>
              <img
                className="contact-image"
                src={contact.picture.medium}
                alt={contact.name.first}
              />
            </li>
          ))}
        </ul>
        {this.state.isLoading && <div>Loading...</div>}
      </div>
    )
  }
}
export default Home
