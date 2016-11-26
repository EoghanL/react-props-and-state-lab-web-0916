const React = require('react');

const fetchMock = require('fetch-mock')
const Filters = require('./Filters');
const PetBrowser = require('./PetBrowser');
const PetsList = require('../data/pets')

class App extends React.Component {
  constructor() {
    super();

    this.onChangeType = this.onChangeType.bind(this)
    this.onFindPetsClick = this.onFindPetsClick.bind(this)
    this.onPetFind = this.onPetFind.bind(this)
    this.onAdoptPet = this.onAdoptPet.bind(this)

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all',
      }
    };
  }

  onChangeType(optionVal){
    this.setState(Object.assign({}, this.state, { filters: Object.assign({}, {type: optionVal} ) }))
  }

  onFindPetsClick(){
    let petUrl = '/api/pets';
    let petType = this.state.filters.type;
    let that = this;
    let petArr = [];

    if(petType !== 'all'){
      petUrl += "?type=" + petType
    }

    fetch(petUrl).then(function(resp){
      return resp.json()
    }).then(function(response){
      that.onPetFind(response);
    });
  }

  onPetFind(pets){
    this.setState(Object.assign({}, this.state, {pets: pets} ));
  }

  onAdoptPet(petId){
    debugger
    this.setState(Object.assign({}, this.state, { adoptedPets: [petId, ...this.state.adoptedPets]} ))
    console.log(this.state)
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
              <Filters filters={this.state.filters} onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adoptedPets={this.state.adoptedPets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = App;
