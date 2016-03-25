var React = require('react');
var SelectField = require('material-ui/lib/SelectField');
var MenuItem = require('material-ui/lib/menus/menu-item');
var RadioButton = require('material-ui/lib/radio-button');
var RadioButtonGroup = require('material-ui/lib/radio-button-group')

/*var styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
}; */

/*var RadioButtonExampleSimple = React.createClass({
  render: function() {
    return (
      <div>
        <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
          <RadioButton
            value="light"
            label="Simple"
            style={styles.radioButton}
          />
          <RadioButton
            value="not_light"
            label="Selected by default"
            style={styles.radioButton}
          />
          <RadioButton
            value="ludicrous"
            label="Disabled"
            disabled={true}
            style={styles.radioButton}
          />
        </RadioButtonGroup>

        <RadioButtonGroup name="notRight" labelPosition="left" style={styles.block}>
          <RadioButton
            value="reverse"
            label="Label on the left"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
      </div>
      )
  }
})*/

var CountyCropSelection = React.createClass({
  getInitialState: function() {
    return { 
      cityValue: '',
      townValue: '',
      rangeValue: '',
      locKey: '',
      currentLoc: '',
      };
  },
  getLocKey: function() {
    var city = this.state.cityValue;
    var town = this.state.townValue;
    var range = this.state.rangeValue;
    if(!city || !town || !range){
      return null
    }
    var locKey = city + town + range;
    console.log(locKey);
    this.getOneLocation(city + town + range)
  },
  getOneLocation: function(id) {
    var self = this;
    $.ajax({
      url: '/api/locationkey/' + id,
      method: 'GET'
    }).done(function(data){
      self.setState({currentLoc: data})
    })
  },
  handleCityChange: function(event, index, value) {
    return this.setState({cityValue: value})
  },
  handleTownChange: function(event, index, value) {
    return this.setState({townValue: value})
  },
  handleRangeChange: function(event, index, value) {
    return this.setState({rangeValue: value})
  },
  render: function() {
    var cityItems = this.props.cities.map(function(i){
      return <MenuItem value={i.key} key={i.key} primaryText={i.name}/>
    });
    var townShipItems = this.props.locations.map(function(i){
      console.log(i._id);
      return <MenuItem value={i.twp} key={'townships_' + i._id} primaryText={i.twp}/>
    });
    var rangeItems = this.props.locations.map(function(i){
      return <MenuItem value={i.rge} key={i.rge} primaryText={i.rge}/>
    });
    return (
      <div className="container"> 
        <div className="row"> 
          <div className="col s4">
            <h5> county </h5>
            <SelectField maxHeight={300} value={this.state.cityValue} onChange={this.handleCityChange}>
              {cityItems}
            </SelectField>
          </div>
          <div className="col s4">
            <h5> township </h5>
            <SelectField  value={this.state.townValue} onChange={this.handleTownChange}>
              {townShipItems}
            </SelectField>
          </div>
          <div className="col s4">
            <h5>range </h5>
            <SelectField  value={this.state.rangeValue} onChange={this.handleRangeChange}>
              {rangeItems}
            </SelectField>
          </div>
        </div>
        <div>
          <h5> Your selection </h5>
          <button onClick={this.getLocKey}> GO </button>
          {this.state.currentLoc}
        </div>
      </div>
      )
  }
});

module.exports = CountyCropSelection;