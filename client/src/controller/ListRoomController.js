import React, {Component} from 'react';
import {observer} from "mobx-react";
import store from "../Store";
import socket from "../services/socketio";
import constant from "../constants";
import {isEmpty} from "../helpers/utility";
import ListRoomView from "../view/ListRoomView";

const ClientListener = constant.ClientListener;
const ServerListener = constant.ServerListener;

@observer
class ListRoomContainer extends Component {

    componentWillMount() {
        this.listenOnRoom();
    }

    listenOnRoom = () => {
        socket.on(ClientListener.UPDATE_ROOM, (room) => {
            store.updateRoom(room);
        });
        socket.on(ClientListener.JOINED_ROOM, (room) => {
            store.updateRoom(room);
            store.setCurrentRoom(room);
        });
    }

    joinRoom = (room) => {
        socket.emit(ServerListener.JOIN_ROOM, {roomId: room.id});
    };

    countPlayer = (room) => {
        let count = 0;
        if (!isEmpty(room.playerWhite)) {
            count++;
        }
        if (!isEmpty(room.playerBlack)) {
            count++;
        }
        return count;
    };

    render() {
        return (
            <ListRoomView
                joinRoom={this.joinRoom}
                countPlayer={this.countPlayer}
            />

        );
    }
}

export default ListRoomContainer;
