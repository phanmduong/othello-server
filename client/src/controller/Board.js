import React, {Component} from 'react';
import {observer} from "mobx-react";
import store from "../Store";
import {removeObservable} from "../helpers/entity/mobx";
import socket from "../services/socketio";
import constant from "../constants";
import {isEmpty} from "../helpers/utility";
import BoardComponent from "../view/Board";

const ClientListener = constant.ClientListener;
const ServerListener = constant.ServerListener;
const RoomConstant = constant.Room;

const XX = [-1, -1, -1, 1, 1, 1, 0, 0];
const YY = [-1, 0, 1, -1, 0, 1, -1, 1];

@observer
class BoardContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        socket.on(ClientListener.JOINED_GAME, (room) => {
            store.updateRoom(room);
        });

        socket.on(ClientListener.UPDATE_BOARD, (room) => {
            store.updateRoom(room);
        });

        socket.on(ClientListener.FINISH, (data) => {
            store.result = data.result;
        });
    }


    onClickCell = (x, y, move) => {
        store.getCurrentRoom.board[x][y] = store.player.chessman;

        move.forEach((data) => {
            this.reverseCell(store.getCurrentRoom.board, store.player.chessman, store.partner.chessman, x, y, data.xx, data.yy);
        });

        this.updateBoard();
    };

    updateBoard = () => {
        socket.emit(ServerListener.TICK, store.getCurrentRoom.board);
    };

    createFences = () => {
        let fences = removeObservable(store.getCurrentRoom.board);
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (fences[i][j] == 1 || fences[i][j] == 2) {
                    for (let k = 0; k < 8; k++) {
                        if (0 <= i + XX[k] && i + XX[k] < 8 && 0 <= j + YY[k] && j + YY[k] < 8 && !fences[i + XX[k]][j + YY[k]]) {
                            fences[i + XX[k]][j + YY[k]] = -1;
                        }
                    }

                }
            }
        }

        return fences;
    }

    isAvailableMove = (fences, board, chessman) => {
        let moves = new Array(8).fill(null).map(() => new Array(8));
        let reverseChessman;
        if (chessman == 1) {
            reverseChessman = 2;
        } else {
            reverseChessman = 1;
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (fences[i][j] == -1) {
                    for (let k = 0; k < 8; k++) {
                        let isEvaluateMove = this.evaluateMove(board, chessman, reverseChessman, i, j, XX[k], YY[k]);
                        if (isEvaluateMove) {
                            fences[i][j] = -2;
                            if (moves[i][j] == undefined) {
                                moves[i][j] = [];
                            }
                            moves[i][j].push({xx: XX[k], yy: YY[k]});
                        }
                    }
                }
            }
        }
        return moves;
    }

    evaluateMove = (board, chessman, reverseChessman, x, y, xMove, yMove)=> {
        let count = 0;
        let x1 = x + xMove;
        let y1 = y + yMove;
        while (true) {
            if (!(0 <= x1 && x1 < 8 && 0 <= y1 && y1 < 8)) {
                return false;
            }

            if (board[x1][y1] == reverseChessman) {
                count++;
            } else {
                if (board[x1][y1] == chessman) {
                    break;
                } else {
                    return false;
                }

            }
            x1 = x1 + xMove;
            y1 = y1 + yMove;
        }

        if (count > 0) {
            return true;
        }

        return false;

    }

    reverseCell = (board, chessman, reverseChessman, x, y, xMove, yMove)=> {
        let x1 = x + xMove;
        let y1 = y + yMove;
        while (true) {

            if (!(0 <= x1 && x1 < 8 && 0 <= y1 && y1 < 8)) {
                return;
            }

            if (board[x1][y1] == reverseChessman) {
                board[x1][y1] = chessman;
            } else {
                if (board[x1][y1] == chessman) {
                    break;
                } else {
                    return;
                }

            }
            x1 = x1 + xMove;
            y1 = y1 + yMove;
        }
    }

    checkWin = (board) =>{
        let chessmanWhite = 0;
        let chessmanBlack = 0;
        board.forEach((row) => {
            row.forEach((cell) => {
                if (cell == RoomConstant.Board.Cell.WHITE) {
                    chessmanWhite++;
                }
                if (cell == RoomConstant.Board.Cell.BLACK) {
                    chessmanBlack++;
                }
            })
        });
        if (chessmanBlack > chessmanWhite) {
            return RoomConstant.Board.Cell.BLACK;
        }
        if (chessmanBlack < chessmanWhite) {
            return RoomConstant.Board.Cell.WHITE;
        }
        return 0;
    }

    isFullBoard = (board) => {
        let isFull = true;
        board.forEach((row) => {
            row.forEach((cell) => {
                if (isEmpty(cell)) {
                    isFull = false;
                }

            })
        });

        return isFull;
    }

    isMovable = (fences) => {
        let isMove = false;
        fences.forEach((row) => {
            row.forEach((cell) => {
                if (cell == -2) {
                    isMove = true;
                }
            })
        });

        return isMove;
    }


    checkUpdateBoard = (fences) => {
        if (this.isFullBoard(store.getCurrentRoom.board)) return;

        if (this.timeout != null) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            if (!this.isMovable(fences) && store.yourTurn) {
                this.updateBoard();
            }
        }, 500);
    }


    render() {

        return (
            <BoardComponent
                isFullBoard={this.isFullBoard}
                checkWin={this.checkWin}
                createFences={this.createFences}
                isAvailableMove={this.isAvailableMove}
                checkUpdateBoard={this.checkUpdateBoard}
                onClickCell={this.onClickCell}
            />
        )
    }
}

export default BoardContainer;
