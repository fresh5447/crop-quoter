var React = require('react');
var SelectField = require('material-ui/lib/SelectField');
var MenuItem = require('material-ui/lib/menus/menu-item');



var DropDownMenuLongMenuExample = React.createClass({
  getInitialState: function() {
    return { value: '' };
  },
  handleChange: function(event, index, value) {
    return this.setState({value: value})
  },
  render: function() {
    var items = [];
    var cities = this.props.cities;
    console.log(cities);
    var items = this.props.cities.map(function(i){
      return <MenuItem value={i.name} key={i.name} primaryText={i.name}/>
    });
    return (
      <SelectField maxHeight={300} value={this.state.value} onChange={this.handleChange}>
        {items}
      </SelectField>
      )
  }
});

module.exports = DropDownMenuLongMenuExample;