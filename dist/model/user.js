'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.login = login;
exports.joinRoom = joinRoom;
exports.logout = logout;
var Constant = require('../constant');
var uniqid = require('uniqid');
var RoomConstant = Constant.Room;
var ClientConstant = Constant.Client;

function login(socketId, name) {
    var id = uniqid();
    var username = name + "_" + id.slice(id.length - 5, id.length);
    var user = {
        socket: socketId,
        username: username,
        name: name,
        status: ClientConstant.Status.ONLINE
    };
    return user;
}

function joinRoom(user, room) {
    user.status = ClientConstant.Status.IN_ROOM;

    if (room.status == RoomConstant.Status.EMPTY) {
        // truong hop dang co 0 user trong room

        // mac dinh nguoi vao trc se la player white
        room.playerWhite = user;
        user.chessman = RoomConstant.Board.Cell.WHITE;
        room.status = RoomConstant.Status.AVAILABLE;
    } else if (room.status == RoomConstant.Status.AVAILABLE) {
        // truong hop dang co 1 user trong room

        // nguoi vao sau se la player black
        room.playerBlack = user;
        user.chessman = RoomConstant.Board.Cell.BLACK;
        room.status = RoomConstant.Status.PLAYING;
    }
}

function logout(room, user) {
    var enemySocket = void 0;

    if (room.playerWhite == user) {
        room.playerWhite = null;
        enemySocket = room.playerBlack ? room.playerBlack.socket : null;
    }
    if (room.playerBlack == user) {
        room.playerBlack = null;
        enemySocket = room.playerWhite ? room.playerWhite.socket : null;
    }

    if (room.status != RoomConstant.Status.PLAYING) {
        room.status--;
    }

    return enemySocket;
}