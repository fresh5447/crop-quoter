var React = require('react');

var StateOptions = React.createClass({
  render: function() {
    return (
      <div className="container">
      <h3>Your city, township, and range.</h3>
      <p> Available Pricing For: </p>
        <ul>
          <li> Wheat </li>
          <li> Barley </li>
        </ul>
      </div>
      )
  }
});

module.exports = StateOptions;