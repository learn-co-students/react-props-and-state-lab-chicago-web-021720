import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleFilterChange = event => {
    // Update state.filters.type with the selected type
    const select = event.target  // <select> tag that was changed
    
    this.setState(prevState => {
      return {
        ...prevState,
        filters: {
          ...prevState.filters,
          type: select.options[select.selectedIndex].value
        }
      }
    })
  }

  handleFindPetsClick = () => {

    // Determine the URL for the fetch request based on the filter type
    const baseUrl = '/api/pets'
    const filterType = this.state.filters.type
    const url = filterType === 'all' ? baseUrl : baseUrl + `?type=${filterType}`
    
    // Make the appropriate fetch request, and store returned pets data in state.
    fetch(url)
      .then(resp => resp.json())
      .then(pets => this.setState({pets: pets}))
  }

  handleAdoptPet = petId => {
    // Find the matching pet in state.pets and set the isAdopted property to true.
    this.setState(prevState => {

      const newPets = prevState.pets
      const pet = newPets.find(pet => pet.id === petId)
      pet.isAdopted = true

      return {
        ...prevState,
        pets: newPets
      }
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleFilterChange} onFindPetsClick={this.handleFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
