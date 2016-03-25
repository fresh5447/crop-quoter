var React = require('react')

var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

var Toast = React.createClass({
    addAlert () {
      this.refs.container.success(
        "Welcome welcome welcome!!",
        "You are now home my friend. Welcome home my friend.", {
        timeOut: 30000,
        extendedTimeOut: 10000
      });
      window.open("http://youtu.be/3SR75k7Oggg");
    },
  render () {
    return (
      <div>
        <ToastContainer ref="container"
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right" />
        <button onClick={this.addAlert}>GGininder</button>
      </div>
    );
  }
  
})

module.exports = Toast;