import React, {Component} from 'react';
import {observer} from "mobx-react";
import store from "../Store";
import constant from "../constants";
import {Button, Modal} from "antd";

const ClientConstant = constant.Client;
const RoomConstant = constant.Room;


@observer
class BoardComponent extends Component {
    constructor(props) {
        super(props);
    }

    renderWin = () => {
        return (
            <Modal
                title="Kết quả trận đấu"
                visible={this.props.isFullBoard(store.getCurrentRoom.board) || store.result}
                // visible={true}
                footer={null}
                closable={true}
                onCancel={this.props.onFinish}
            >
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{fontSize: '30px', fontWeight: 'bold'}}>
                        {
                            store.result == ClientConstant.GameResult.WIN || this.props.isWin(store.getCurrentRoom.board) == store.player.chessman ? "Bạn thắng" :
                                this.props.isWin(store.getCurrentRoom.board) != store.player.chessman && this.props.isWin(store.getCurrentRoom.board) != 0
                                    ? store.player.name + "Bạn thua" : "Hòa"
                        }
                    </div>
                    <Button onClick={this.props.onFinish}>Thoát</Button>
                </div>
            </Modal>
        )
    };

    renderBoard = () => {
        let fences = this.props.createFences();
        const moves = this.props.isAvailableMove(fences, store.getCurrentRoom.board, store.player.chessman);

        this.props.isUpdateBoard(fences);

        return (
            <div className="board-game">
                {
                    store.getCurrentRoom.board.map((row, indexX) => {
                        return (
                            <div className="board-row" key={indexX}>
                                {
                                    row.map((cell, indexY) => {
                                        return (
                                            <div
                                                className={"cell-game " + (!moves[indexX][indexY] || !store.yourTurn ? "not-allowed-cell" : "")}
                                                key={indexY}
                                                onClick={() => {
                                                    if (moves[indexX][indexY] && store.yourTurn) {
                                                        this.props.onClickCell(indexX, indexY, moves[indexX][indexY]);
                                                    }
                                                }}>
                                                {
                                                    cell == RoomConstant.Board.Cell.BLACK ?
                                                        <div className="dot-black"/> :
                                                        cell == RoomConstant.Board.Cell.WHITE ?
                                                            <div className="dot-white"/> :
                                                            <div
                                                                className={(moves[indexX][indexY] && store.yourTurn ?
                                                                    (store.player.chessman == RoomConstant.Board.Cell.BLACK ?
                                                                        "hover-black" : "hover-white") : "not-allowed")}/>
                                                }

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )

                    })
                }
                {
                    this.renderWin()
                }
            </div>
        )
    };

    renderWaitingOpponent = () => {
        return <div className="waiting-opponent">Đang đợi đối thủ...</div>;
    }

    render() {
        const room = store.getCurrentRoom;

        if (room.status == RoomConstant.Status.PLAYING) {
            return this.renderBoard();
        }

        return this.renderWaitingOpponent();
    }
}

export default BoardComponent;
