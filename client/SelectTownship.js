var React = require('react');

var SelectTownShip = React.createClass({
  render: function() {
    return (
      <div className="container s6">
        <div className="row">
        <h3> Select TownShip and Rance </h3>
          <p>
            <input className="with-gap" name="group3" type="radio" id="" />
            <label htmlFor="">N/S</label>
          </p>
          <p>
            <input className="with-gap" name="group3" type="radio" id="" />
            <label htmlFor="">E/W</label>
          </p>
        </div>
      </div>
      )
  }
});

module.exports = SelectTownShip;