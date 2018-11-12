import {isEmpty} from "./helpers/utility";
import {joinRoom, login, logout} from "./model/client";
import {createRooms, finished, refreshRoom, updateBoard} from "./model/room";

var Constant = require('./constant');
var ServerListener = Constant.ServerListener;
var ClientListener = Constant.ClientListener;
var RoomConstant = Constant.Room;
var ClientConstant = Constant.Client;


// bien de luu socketIO cua server
var socketIO;

// ham common de emit su kien len 1 client khi biet socket id
var emitEventToOtherClient = (command, socketId, payload) => {
    socketIO.to(socketId).emit(command, payload);
};

let rooms = createRooms();

export function startGameServer(io) {
    io.on(ServerListener.CONNECTION, (socket) => {
            socketIO = io;

            console.log('new user connected');
            socket.on(ServerListener.LOG_IN, (data) => {
                socket.clientUser = login(socket.id, data.name);

                socket.emit(ClientListener.LOG_IN_SUCCESS, {
                    client: socket.clientUser,
                    rooms: rooms
                });
            });

            // // neu 1 user bam join vao 1 room thi
            socket.on(ServerListener.JOIN_ROOM, (data) => {
                if (isEmpty(socket.clientUser)) return;
                let roomId = data.roomId;

                let room = rooms.filter(room => room.id == roomId)[0];
                let client = socket.clientUser;

                joinRoom(client, room);

                socket.room = room;
                socket.broadcast.emit(ClientListener.UPDATE_ROOM, room)
                socket.emit(ClientListener.JOINED_ROOM, room);

                if (!isEmpty(room.playerBlack) && !isEmpty(room.playerWhite)) {
                    room.status = RoomConstant.Status.PLAYING;
                    emitEventToOtherClient(ClientListener.JOINED_GAME, room.playerWhite.socket, room);
                    emitEventToOtherClient(ClientListener.JOINED_GAME, room.playerBlack.socket, room);
                }
            });

            socket.on(ServerListener.TICK, (board) => {
                if (isEmpty(socket.room)) return;
                let room = socket.room;

                updateBoard(room, board);

                if (!isEmpty(room.playerBlack)) {
                    emitEventToOtherClient(ClientListener.UPDATE_BOARD, room.playerBlack.socket, room);
                }
                if (!isEmpty(room.playerWhite)) {
                    emitEventToOtherClient(ClientListener.UPDATE_BOARD, room.playerWhite.socket, room);
                }
            });

            socket.on(ServerListener.FINISHED, function () {
                if (isEmpty(socket.room) || isEmpty(socket.clientUser)) return;
                let room = socket.room;
                finished(room, socket.clientUser);

                if (isEmpty(room.playerWhite) && isEmpty(room.playerBlack) && room.status == RoomConstant.Status.PLAYING) {
                    room = refreshRoom(room);

                    rooms = rooms.map((roomData) => {
                        if (roomData.id == room.id) {
                            return room;
                        }
                        return roomData;
                    });
                }

                console.log(room);

                io.emit(ClientListener.UPDATE_ROOM, room);
            });

            socket.on(ServerListener.LOG_OUT, function () {
                if (isEmpty(socket.room) || isEmpty(socket.clientUser)) return;
                let room = socket.room;
                let enemySocket = logout(room, socket.clientUser);

                if (room.status == RoomConstant.Status.PLAYING && enemySocket) {
                    emitEventToOtherClient(ClientListener.FINISH, enemySocket, {
                        result: ClientConstant.GameResult.WIN
                    });
                }

                if (isEmpty(room.playerWhite) && isEmpty(room.playerBlack) && room.status == RoomConstant.Status.PLAYING) {
                    room = refreshRoom(room);

                    rooms = rooms.map((roomData) => {
                        if (roomData.id == room.id) {
                            return room;
                        }
                        return roomData;
                    });

                }
                io.emit(ClientListener.UPDATE_ROOM, room);

            })
        }
    )
    ;
}
