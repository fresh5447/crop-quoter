var React = require('react');
var ReactDOM = require('react-dom');
var injectTapEventPlugin = require('react-tap-event-plugin');
var NavBar = require('./NavBar');
var Slider = require('./Slider');
var CountyCropSelection = require('./CountyCropSelection');
var StateOptions = require('./StateOptions');
var SelectTownShip = require('./SelectTownShip');
var Results = require('./Results');
var Example = require('./Example');
var CompareLoss = require('./Loss');
var Toaster = require('./Toaster');


injectTapEventPlugin();

var App = React.createClass({
  getInitialState: function() {
    return {
      cities: [],
      locations: [],
      selectedCity: null,
      selectedCrop: null,
    }
  },
  getCities: function() {
    var self = this;
    $.ajax({
      url: '/api/cities',
      method: 'GET'
    }).done(function(data){
      self.setState({cities: data})
    })
  },
  getLocations: function() {
    var self = this;
    $.ajax({
      url: '/api/locations',
      method: 'GET'
    }).done(function(data){
      self.setState({locations: data})
    })
  },
  componentDidMount: function() {
    this.getCities();
    this.getLocations();
  },
  render: function(){
    console.log(this.state.cities, "cities in index")
    return (
      <div>
        <NavBar/>
        <Slider/>
        <CountyCropSelection cities={this.state.cities} locations={this.state.locations}/>
        <Results/>
        <CompareLoss/>
      </div>
      )
  }
})


ReactDOM.render(<App/>, document.getElementById('app'));