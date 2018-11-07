'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createRooms = createRooms;
exports.refreshRoom = refreshRoom;
exports.updateBoard = updateBoard;
var Constant = require('../constant');
var RoomConstant = Constant.Room;

function createRooms() {
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

    return roomResult;
}

function updateBoard(room, board) {
    room.board = board;

    if (room.currentChessman == RoomConstant.Board.Cell.WHITE) {
        room.currentChessman = RoomConstant.Board.Cell.BLACK;
    } else {
        if (room.currentChessman == RoomConstant.Board.Cell.BLACK) {
            room.currentChessman = RoomConstant.Board.Cell.WHITE;
        }
    }
}