var Constant = require('../constant');
var RoomConstant = Constant.Room;

export function createRooms() {
    return new Array(100).fill(null).map(function (value, i) {
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
}

export function refreshRoom(room) {
    let roomResult = {
        ...room,
        board: new Array(RoomConstant.Board.ROW).fill(RoomConstant.Board.Cell.EMPTY).map(() => new Array(RoomConstant.Board.COL).fill(RoomConstant.Board.Cell.EMPTY)),
        status: RoomConstant.Status.EMPTY,
    };

    var board = roomResult.board;
    board[3][3] = 2;
    board[3][4] = 1;
    board[4][3] = 1;
    board[4][4] = 2;

    return roomResult;
}


export function updateBoard(room, board) {
    room.board = board;

    if (room.currentChessman == RoomConstant.Board.Cell.WHITE) {
        room.currentChessman = RoomConstant.Board.Cell.BLACK;
    } else {
        if (room.currentChessman == RoomConstant.Board.Cell.BLACK) {
            room.currentChessman = RoomConstant.Board.Cell.WHITE;
        }
    }
}

export function finished(room, client) {
    if (room.playerWhite == client) {
        room.playerWhite = null;
    }
    if (room.playerBlack == client) {
        room.playerBlack = null;
    }
}


