"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startGameServer = startGameServer;

var _utility = require("./helpers/utility");

var _user = require("./model/user");

var _room = require("./model/room");

var Constant = require('./constant');
var ServerListener = Constant.ServerListener;
var ClientListener = Constant.ClientListener;
var RoomConstant = Constant.Room;
var ClientConstant = Constant.Client;

// bien de luu socketIO cua server
var socketIO;

// ham common de emit su kien len 1 client khi biet socket id
var emitEventToOtherClient = function emitEventToOtherClient(command, socketId, payload) {
    socketIO.to(socketId).emit(command, payload);
};

var rooms = (0, _room.createRooms)();

function startGameServer(io) {
    io.on(ServerListener.CONNECTION, function (socket) {
        socketIO = io;

        console.log('new user connected');
        socket.on(ServerListener.LOG_IN, function (data) {
            socket.user = (0, _user.login)(socket.id, data.name);

            socket.emit(ClientListener.LOG_IN_SUCCESS, {
                user: socket.user,
                rooms: rooms
            });
        });

        // // neu 1 user bam join vao 1 room thi
        socket.on(ServerListener.JOIN_ROOM, function (data) {
            if ((0, _utility.isEmpty)(socket.user)) return;
            var roomId = data.roomId;

            var room = rooms.filter(function (room) {
                return room.id == roomId;
            })[0];
            var user = socket.user;

            (0, _user.joinRoom)(user, room);

            socket.room = room;
            socket.broadcast.emit(ClientListener.UPDATE_ROOM, room);
            socket.emit(ClientListener.JOINED_ROOM, room);

            if (!(0, _utility.isEmpty)(room.playerBlack) && !(0, _utility.isEmpty)(room.playerWhite)) {
                room.status = RoomConstant.Status.PLAYING;
                emitEventToOtherClient(ClientListener.JOINED_GAME, room.playerWhite.socket, room);
                emitEventToOtherClient(ClientListener.JOINED_GAME, room.playerBlack.socket, room);
            }
        });

        socket.on(ServerListener.TICK, function (board) {
            if ((0, _utility.isEmpty)(socket.room)) return;
            var room = socket.room;

            (0, _room.updateBoard)(room, board);

            if (!(0, _utility.isEmpty)(room.playerBlack)) {
                emitEventToOtherClient(ClientListener.UPDATE_BOARD, room.playerBlack.socket, room);
            }
            if (!(0, _utility.isEmpty)(room.playerWhite)) {
                emitEventToOtherClient(ClientListener.UPDATE_BOARD, room.playerWhite.socket, room);
            }
        });

        socket.on(ServerListener.FINISHED, function () {
            if ((0, _utility.isEmpty)(socket.room) || (0, _utility.isEmpty)(socket.user)) return;
            var room = socket.room;
            (0, _user.finished)(room, socket.user);

            if ((0, _utility.isEmpty)(room.playerWhite) && (0, _utility.isEmpty)(room.playerBlack) && room.status == RoomConstant.Status.PLAYING) {
                room = (0, _room.refreshRoom)(room);

                rooms = rooms.map(function (roomData) {
                    if (roomData.id == room.id) {
                        return room;
                    }
                    return roomData;
                });
            }

            io.emit(ClientListener.UPDATE_ROOM, room);
        });

        socket.on(ServerListener.LOG_OUT, function () {
            if ((0, _utility.isEmpty)(socket.room) || (0, _utility.isEmpty)(socket.user)) return;
            var room = socket.room;
            var enemySocket = (0, _user.logout)(room, socket.user);

            if (room.status == RoomConstant.Status.PLAYING && enemySocket) {
                emitEventToOtherClient(ClientListener.FINISH, enemySocket, {
                    result: ClientConstant.GameResult.WIN
                });
            }

            if ((0, _utility.isEmpty)(room.playerWhite) && (0, _utility.isEmpty)(room.playerBlack) && room.status == RoomConstant.Status.PLAYING) {
                room = (0, _room.refreshRoom)(room);

                rooms = rooms.map(function (roomData) {
                    if (roomData.id == room.id) {
                        return room;
                    }
                    return roomData;
                });
            }
            io.emit(ClientListener.UPDATE_ROOM, room);
        });
    });
}