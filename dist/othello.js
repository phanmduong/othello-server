'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utility = require('./helpers/utility');

var Constant = require('./constant');
var uniqid = require('uniqid');
var ServerListener = Constant.ServerListener;
var ClientListener = Constant.ClientListener;
var RoomConstant = Constant.Room;
var ClientConstant = Constant.Client;

// khoi tao truoc 100 rooms
var rooms = new Array(100).fill(null).map(function (value, i) {
    var room = {
        id: i + 1,
        playerWhite: null,
        playerBlack: null,
        board: new Array(RoomConstant.Board.ROW).fill(RoomConstant.Board.Cell.EMPTY).map(function () {
            return new Array(RoomConstant.Board.COL).fill(RoomConstant.Board.Cell.EMPTY);
        }),
        status: RoomConstant.Status.EMPTY,
        currentChessman: RoomConstant.Board.Cell.WHITE
    };

    var board = room.board;
    board[3][3] = 2;
    board[3][4] = 1;
    board[4][3] = 1;
    board[4][4] = 2;

    return room;
});

// bien de luu socketIO cua server
var socketIO;

// ham common de emit su kien len 1 client khi biet socket id
var emitEventToOtherClient = function emitEventToOtherClient(command, socketId, payload) {
    socketIO.to(socketId).emit(command, payload);
};

function refreshRoom(room) {
    var roomResult = _extends({}, room, {
        board: new Array(RoomConstant.Board.ROW).fill(RoomConstant.Board.Cell.EMPTY).map(function () {
            return new Array(RoomConstant.Board.COL).fill(RoomConstant.Board.Cell.EMPTY);
        }),
        status: RoomConstant.Status.EMPTY
    });

    var board = roomResult.board;
    board[3][3] = 2;
    board[3][4] = 1;
    board[4][3] = 1;
    board[4][4] = 2;

    rooms = rooms.map(function (roomData) {
        if (roomData.id == room.id) {
            return roomResult;
        }
        return roomData;
    });
    return roomResult;
}

module.exports = {
    startGameServer: function startGameServer(io) {
        io.on(ServerListener.CONNECTION, function (socket) {
            socketIO = io;

            console.log('new user connected');
            socket.on(ServerListener.LOG_IN, function (data) {
                // doan nay chua biet lam the nao de lay username
                var id = uniqid();
                var username = data.name + "_" + id.slice(id.length - 5, id.length);
                var user = {
                    socket: socket.id,
                    username: username,
                    name: data.name,
                    status: ClientConstant.Status.ONLINE
                };

                socket.user = user;

                socket.emit(ClientListener.LOG_IN_SUCCESS, {
                    user: user,

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
                room.board = board;

                if (room.currentChessman == RoomConstant.Board.Cell.WHITE) {
                    room.currentChessman = RoomConstant.Board.Cell.BLACK;
                } else {
                    if (room.currentChessman == RoomConstant.Board.Cell.BLACK) {
                        room.currentChessman = RoomConstant.Board.Cell.WHITE;
                    }
                }

                if (!(0, _utility.isEmpty)(room.playerBlack)) {
                    emitEventToOtherClient(ClientListener.UPDATE_BOARD, room.playerBlack.socket, room);
                }
                if (!(0, _utility.isEmpty)(room.playerWhite)) {
                    emitEventToOtherClient(ClientListener.UPDATE_BOARD, room.playerWhite.socket, room);
                }
            });

            socket.on(ServerListener.LOG_OUT, function () {
                if ((0, _utility.isEmpty)(socket.room) || (0, _utility.isEmpty)(socket.user)) return;
                var room = socket.room;
                var enemySocket = null;

                if (room.playerWhite == socket.user) {
                    room.playerWhite = null;
                    enemySocket = room.playerBlack ? room.playerBlack.socket : null;
                }
                if (room.playerBlack == socket.user) {
                    room.playerBlack = null;
                    enemySocket = room.playerWhite ? room.playerWhite.socket : null;
                }

                if (room.status != RoomConstant.Status.PLAYING) {
                    room.status--;
                }

                if (room.status == RoomConstant.Status.PLAYING && enemySocket) {
                    emitEventToOtherClient(ClientListener.FINISH, enemySocket, {
                        result: ClientConstant.GameResult.WIN
                    });
                }

                if ((0, _utility.isEmpty)(room.playerWhite) && (0, _utility.isEmpty)(room.playerBlack) && room.status == RoomConstant.Status.PLAYING) {
                    room = refreshRoom(room);
                }

                io.emit(ClientListener.UPDATE_ROOM, room);
            });
        });
    }
};