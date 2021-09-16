import React from 'react'
import UserPanel from './UserPanel'
import Favorited from './Favorited'
import ChatRooms from './ChatRooms'
import DirectMessages from './DirectMessages'

function SidePanel() {
    return (
        <div style={{
            background: "#7B83EB",
            padding: "2rem",
            minHeight: "100vh",
            color: "white",
            minWidth: "200px"
        }}>
            <UserPanel/>
            <Favorited/>
            <ChatRooms/>
            <DirectMessages/>
        </div>
    )
}

export default SidePanel
