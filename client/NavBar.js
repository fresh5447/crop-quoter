var React = require('react');
var ReactDOM = require('react-dom');

var NavBar = React.createClass({
  render: function(){
    return (
      <div className="">
        <nav>
          <div className="nav-wrapper my-nav">
            <a href="" ><img className="nav-logo" src="http://www.mcmeelins.com/wp-content/uploads/2015/05/McWoodMThive-300x170.png" /></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="sass.html">Quote</a></li>
              <li><a href="badges.html">McMeel Insurance</a></li>
              <li><a href="collapsible.html">Contact</a></li>
            </ul>
          </div>
        </nav>
      </div>
      )
  }
});

module.exports = NavBar;

