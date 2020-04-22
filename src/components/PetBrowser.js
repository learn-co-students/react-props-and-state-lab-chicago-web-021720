import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  // iterate through this.props.pets
  // render Pet comp for each pet object

  renderPets = () => {
    return this.props.pets.map(pet => {
      return <Pet pet={pet} onAdoptPet={this.props.onAdoptPet}/>
    })
  }
  render() {
    return <div className="ui cards">{this.renderPets()}</div>
  }
}

export default PetBrowser
