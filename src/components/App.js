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

  onChangeType = (typeInput) => {
    
    this.setState({
      filters: {type: typeInput}
    })
    
  }

  onFindPetsClick= () => {
    let filterResult = this.state.filters.type
    let url = "/api/pets" 

    if (filterResult !== "all") {
      url += "?type=" + filterResult
    } 

    fetch(url)
    .then(resp => resp.json())
    .then(response => {
      this.setState({
        pets: response
      })
    })
  }

  onAdoptPet = (id) => {
    let newPets = this.state.pets.map(pet => {
      if (pet.id === id) {
        pet.isAdopted = true
      }
      return pet 
    })

    this.setState({
      pets: newPets
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
