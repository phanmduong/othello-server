import {isEmpty} from "./helpers/utility";

var Constant = require('./constant');
var uniqid = require('uniqid');
var ServerListener = Constant.ServerListener;
var ClientListener = Constant.ClientListener;
var RoomConstant = Constant.Room;
var ClientConstant = Constant.Client;

var users = [];
// khoi tao truoc 20 rooms
var rooms = new Array(100).fill(null).map((value, i) => {
    var room = {
        id: i,
        playerWhite: null,
        playerBlack: null,
        board: new Array(RoomConstant.Board.ROW).fill(RoomConstant.Board.Cell.EMPTY).map(() => new Array(RoomConstant.Board.COL).fill(RoomConstant.Board.Cell.EMPTY)),
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
var emitEventToOtherClient = (command, socketId, payload) => {
    socketIO.to(socketId).emit(command, payload);
};

function refreshRoom(room) {
    let roomResult = {
        ...room,
        board: new Array(RoomConstant.Board.ROW).fill(RoomConstant.Board.Cell.EMPTY).map(() => new Array(RoomConstant.Board.COL).fill(RoomConstant.Board.Cell.EMPTY)),
        status: RoomConstant.Status.EMPTY,
    };

    rooms = rooms.map((roomData) => {
        if (roomData.id == room.id) {
            return roomResult;
        }
        return roomData;
    });
    return roomResult;
}

module.exports = {
    startGameServer: (io) => {
        io.on(ServerListener.CONNECTION, (socket) => {
                socketIO = io;

                console.log('new user connected');
                socket.on(ServerListener.LOG_IN, (data) => {
                    // doan nay chua biet lam the nao de lay username
                    console.log(data.name);
                    let username = data.name + "_" + uniqid();
                    let user = {
                        socket: socket.id,
                        username: username,
                        name: data.name,
                        status: ClientConstant.Status.ONLINE,
                    };

                    socket.user = user;

                    // them user vao danh sach users
                    users.push(user);

                    socket.emit(ClientListener.LOG_IN_SUCCESS, {
                        user: user,

                        rooms: rooms
                    });
                });

                // // neu 1 user bam join vao 1 room thi
                socket.on(ServerListener.JOIN_ROOM, (data) => {
                    if (isEmpty(socket.user)) return;
                    let roomId = data.roomId;

                    let room = rooms.filter(room => room.id == roomId)[0];
                    let user = socket.user;


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
                    socket.broadcast.emit(ClientListener.UPDATE_ROOM, room)
                    socket.emit(ClientListener.JOINED_ROOM, room);

                    if (!isEmpty(room.playerBlack) && !isEmpty(room.playerWhite)) {
                        console.log("ok");
                        room.status = RoomConstant.Status.PLAYING;
                        emitEventToOtherClient(ClientListener.JOINED_GAME, room.playerWhite.socket, room);
                        emitEventToOtherClient(ClientListener.JOINED_GAME, room.playerBlack.socket, room);
                    }
                });
                //
                socket.on(ServerListener.TICK, (board) => {
                    if (isEmpty(socket.room)) return;
                    let room = socket.room;
                    room.board = board;

                    if (room.currentChessman == RoomConstant.Board.Cell.WHITE) {
                        room.currentChessman = RoomConstant.Board.Cell.BLACK;
                    } else {
                        if (room.currentChessman == RoomConstant.Board.Cell.BLACK) {
                            room.currentChessman = RoomConstant.Board.Cell.WHITE;
                        }
                    }

                    emitEventToOtherClient(ClientListener.UPDATE_BOARD, room.playerBlack.socket, room);
                    emitEventToOtherClient(ClientListener.UPDATE_BOARD, room.playerWhite.socket, room);

                    // xu li logic
                    // if (finish) {
                    //     // vi du
                    //     emitEventToOtherClient(ClientListener.FINISH, joinedRoom.playerWhite.socket, {
                    //         result: ClientConstant.GameResult.WIN
                    //     });
                    //     emitEventToOtherClient(ClientListener.FINISH, joinedRoom.playerBlack.socket, {
                    //         result: ClientConstant.GameResult.LOSE
                    //     });
                    // } else {
                    //     emitEventToOtherClient(ClientListener.UPDATE_BOARD, joinedRoom.playerWhite.socket, {
                    //         board: joinedRoom.board
                    //     });
                    //     emitEventToOtherClient(ClientListener.UPDATE_BOARD, joinedRoom.playerBlack.socket, {
                    //         board: joinedRoom.board
                    //     });
                    // }
                });
                //
                // socket.on(ServerListener.LOG_OUT, () => {
                //     if (user.status != ClientConstant.Status.ONLINE &&
                //         (joinedRoom.status == RoomConstant.Status.FULL ||
                //             joinedRoom.status == RoomConstant.Status.PLAYING)) {
                //         // tim socket cua doi thu
                //         let enemySocket = null;
                //         if (joinedRoom.playerWhite.socket != user.socket) {
                //             enemySocket = joinedRoom.playerWhite.socket;
                //         } else {
                //             enemySocket = joinedRoom.playerBlack.socket;
                //         }
                //
                //         switch (joinedRoom.status) {
                //             case RoomConstant.Status.FULL:
                //                 // truong hop chua vao game thi chi can thong bao thoat
                //                 emitEventToOtherClient(ClientListener.OUT_ROOM, enemySocket, {
                //                     message: 'your enemy has out room'
                //                 });
                //
                //                 break;
                //             case RoomConstant.Status.PLAYING:
                //                 // truong hop thoat khi dang playgame thi xu thang cho doi thu
                //
                //                 emitEventToOtherClient(ClientListener.FINISH, enemySocket, {
                //                     result: ClientConstant.GameResult.WIN
                //                 });
                //                 break;
                //         }
                //     }
                // });
                socket.on(ServerListener.LOG_OUT, function () {
                    if (isEmpty(socket.room) || isEmpty(socket.user)) return;
                    let room = socket.room;

                    if (room.playerWhite == socket.user) {
                        room.playerWhite = null;
                    }
                    if (room.playerBlack == socket.user) {
                        room.playerBlack = null;
                    }

                    if (isEmpty(room.playerWhite) && isEmpty(room.playerBlack) && room.status == RoomConstant.Status.PLAYING) {
                        room = refreshRoom(room);
                    }


                    io.emit(ClientListener.UPDATE_ROOM, room);
                })
            }
        )
        ;
    }
}