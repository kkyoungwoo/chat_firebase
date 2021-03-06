import React, { Component } from 'react'
import MessageHeader from './MessageHeader'
import MessageForm from './MessageForm'
import Message from './Message'
export class MainPanel extends Component {
    render() {
        return (
            <div style={{
                padding: "2rem 2rem 0 2rem"
            }}>
                <MessageHeader/>

                <div style={{
                    height: "450px",
                    border: "1rem solid #ececec",
                    borderRadius: "1rem",
                    marginBottom: "1rem",
                    overflowY: "auto"
                }}>
                    <Message/>
                </div>
                    <MessageForm/>

            </div>
        )
    }
}

export default MainPanel
