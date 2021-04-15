import React from 'react';
import * as ProposalAPI  from 'axios/Proposal'


class ChatTestContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isIn: false
        }
    }

    componentDidMount(){


        const chatSocket = new WebSocket('wss://127.0.0.1:8443/ws/chat/'+`${this.props.roomName}`+'/');
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log(data);
            const message = data['message'];
            
            document.querySelector('#chat-log').value += (message + '\n');
        };
    
        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
            ProposalAPI.getMyProject()
            .then((res) => {
				console.log(res.data)
			})
			.catch(e => {
				console.log(e);
				console.log(e.response)
			})
        };
    
    
        document.querySelector('#chat-message-submit').onclick = function(e) {
            const messageInput = document.querySelector('#chat-message-input');
            const message = messageInput.value;
            console.log('front')
            chatSocket.send(JSON.stringify({
                'message': message,
                'type':'client'

            }));
            messageInput.value = '';
        };
    }
    
    render() {
        return(   
            <>
                <textarea id="chat-log" cols="100" rows="20"></textarea><br/>
                <input id="chat-message-input" type="text" size="100"/><br/>
                <input id='chat-message-submit' type="button" value="Send"/>
            </>);
    }
}

export default ChatTestContainer;
