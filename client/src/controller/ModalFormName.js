import React, {Component} from 'react';
import {observer} from "mobx-react";
import store from "../Store";
import socket from "../services/socketio";
import constant from "../constants";
import ModalFormNameComponent from "../view/ModalFormName";

const ClientListener = constant.ClientListener;
const ServerListener = constant.ServerListener;

@observer
class ModalFormNameContainer extends Component {

    submitModalName = (data) => {
        socket.emit(ServerListener.LOG_IN, data);
        socket.on(ClientListener.LOG_IN_SUCCESS, (dataSocket) => {
            store.submitModalName(dataSocket);
        });

    };

    render() {
        return (
            <ModalFormNameComponent
                submitModalName={this.submitModalName}
            />
        );
    }
}

export default ModalFormNameContainer;
