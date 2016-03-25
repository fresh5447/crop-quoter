var React = require('react');

var Slider = React.createClass({
  render: function() {
    return (
      <div className="slider">
        <ul className="slides">
          <li>
            <img src="./img/crop1.png"/>
            <div className="caption center-align">
              <h3>This is our big Tagline!</h3>
              <h5 className="light grey-text text-lighten-3">Heres our small slogan.</h5>
            </div>
          </li>
          <li>
            <img src="./img/crop2.png"/>
            <div className="caption left-align">
              <h3>Left Aligned Caption</h3>
              <h5 className="light grey-text text-lighten-3">Heres our small slogan.</h5>
            </div>
          </li>
        </ul>
      </div>

      )
  }
});

module.exports = Slider;