const React = require('react');

const Pet = require('./Pet');
//filter the array of adopted pets versus total pets and add a conditional prop
class PetBrowser extends React.Component {
  render() {
    let petComponentList = this.props.pets.map((pet) => {
        if(this.props.adoptedPets.includes(pet.id)){
          return <Pet pet={pet} isAdopted={true} onAdoptPet={this.props.onAdoptPet}/>
        }
        else{
          return <Pet pet={pet} isAdopted={false} onAdoptPet={this.props.onAdoptPet}/>
        }
      }
    )
    return (
      <div className="ui cards">
        {petComponentList}
      </div>
    );
  }
}

module.exports = PetBrowser;
