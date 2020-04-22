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

  onChangeType = (newType) => {
    this.setState({
      filters:{
        type: newType
      }
    })
  }

  onFindPetsClick = () => {

    let url = '/api/pets'
    if (this.state.filters.type !== 'all'){
      url = `/api/pets?type=${this.state.filters.type}`
    }
    fetch(url).then(r => r.json())
      .then(data => {
        this.setState({
          pets: data
        })
      })
  }

  onAdoptPet = (id) => {
    const newPets = this.state.pets.map(pet =>{
      if (pet.id === id){
        return {
          ...pet,
          isAdopted: true
        }
      } else {
        return pet 
      }
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
              <Filters onFindPetsClick={this.onFindPetsClick} onChangeType={this.onChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
