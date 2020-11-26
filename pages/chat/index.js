import React, { Component } from "react";
import { render } from "react-dom";


class App extends Component {
    constructor(props) {
	super(props);
	this.state = {
	     roomName: ""
	};
    }


    componentDidMount(){
        document.querySelector('#room-name-input').focus();
        document.querySelector('#room-name-input').onkeyup = function(e) {
            if (e.keyCode === 13) {  // enter, return
                document.querySelector('#room-name-submit').click();
            }
        };

        document.querySelector('#room-name-submit').onclick = function(e) {
            var roomName = document.querySelector('#room-name-input').value;
            window.location.pathname = '/chat/' + roomName + '/';
        };
        }

    render() {

	return (
            <div>

            <input id="room-name-input" type="text" size="100"/><br/>
            <input id="room-name-submit" type="button" value="Enter"/>

            </div>
	);
    }
}


export default App;
