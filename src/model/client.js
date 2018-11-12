var Constant = require('../constant');
var uniqid = require('uniqid');
var RoomConstant = Constant.Room;
var ClientConstant = Constant.Client;

export function login(socketId, name) {
    let id = uniqid();
    let username = name + "_" + id.slice(id.length - 5, id.length);
    let client = {
        socket: socketId,
        username: username,
        name: name,
        status: ClientConstant.Status.ONLINE
    };
    return client;
}


export function joinRoom(client, room) {
    client.status = ClientConstant.Status.IN_ROOM;

    if (room.status == RoomConstant.Status.EMPTY) {
        // truong hop dang co 0 user trong room

        // mac dinh nguoi vao trc se la player white
        room.playerWhite = client;
        client.chessman = RoomConstant.Board.Cell.WHITE;
        room.status = RoomConstant.Status.AVAILABLE;
    } else if (room.status == RoomConstant.Status.AVAILABLE) {
        // truong hop dang co 1 user trong room

        // nguoi vao sau se la player black
        room.playerBlack = client;
        client.chessman = RoomConstant.Board.Cell.BLACK;
        room.status = RoomConstant.Status.PLAYING;
    }
}

export function logout(room, client) {
    let enemySocket;

    if (room.playerWhite == client) {
        room.playerWhite = null;
        enemySocket = room.playerBlack ? room.playerBlack.socket : null;
    }
    if (room.playerBlack == client) {
        room.playerBlack = null;
        enemySocket = room.playerWhite ? room.playerWhite.socket : null;
    }

    if (room.status != RoomConstant.Status.PLAYING) {
        room.status--;
    }

    return enemySocket;
}

