import React, {Component} from 'react';
import {observer} from "mobx-react";
import store from "../Store";
import socket from "../services/socketio";
import constant from "../constants";
import LoginView from "../view/LoginView";

const ClientListener = constant.ClientListener;
const ServerListener = constant.ServerListener;

@observer
class ModalFormNameContainer extends Component {
    onCheckBlank = () => {
        return [
            {
                required: true,
                message: "Vui lòng nhập tên của bạn!"
            }
        ];
    };

    submitUsername = (data) => {
        socket.emit(ServerListener.LOG_IN, data);
        socket.on(ClientListener.LOG_IN_SUCCESS, (dataSocket) => {
            store.submitUsername(dataSocket);
        });

    };

    render() {
        return (
            <LoginView
                submitUsername={this.submitUsername}
                onCheckBlank={this.onCheckBlank}
            />
        );
    }
}

export default ModalFormNameContainer;
