import React, {Component} from 'react';
import {observer} from "mobx-react";
import store from "../Store";
import {Avatar} from 'antd';
import constant from "../constants";
import {isEmpty} from "../helpers/utility";

const RoomConstant = constant.Room;

@observer
class DrawerComponent extends Component {

    renderInfoClient = (client) => {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <Avatar size={100} icon="user"/>
                <div style={{marginTop: 20}}>
                    Xin chào,
                </div>
                <div style={{fontWeight: 'bold'}}>{client.name}</div>
                <div style={{color: '#989898'}}>{client.username}</div>
            </div>
        )
    }

    renderScorePlayer = (player) => {
        return (
            <div style={{marginBottom: '30px'}}>
                <div className="name">Bạn</div>
                <div className="container-score">
                    <div
                        className={player.chessman == RoomConstant.Board.Cell.WHITE ? 'dot-white' : 'dot-black'}/>

                    <div className="score">
                        x {this.props.totalChessman(store.getCurrentRoom.board, player.chessman)}
                    </div>
                </div>

            </div>
        )
    };

    renderScoreOpponent = (opponent) => {
        return (
            <div style={{marginBottom: '30px'}}>
                <div className="name">{opponent.name}</div>
                <div style={{color: '#ececec', textAlign: 'center'}}>{opponent.username}</div>
                <div className="container-score">
                    <div
                        className={opponent.chessman == RoomConstant.Board.Cell.WHITE ? 'dot-white' : 'dot-black'}/>
                    <div className="score">
                        x {this.props.totalChessman(store.getCurrentRoom.board, opponent.chessman)}
                    </div>
                </div>

            </div>
        )
    };

    renderCurrentTurn = (currentTurn) => {
        return (
            <div>
                {
                    currentTurn ? <div className="name">Lượt bạn</div> :
                        <div className="name">Lượt đối thủ</div>
                }
            </div>

        )
    }


    render() {
        const clientStore = store.clientStore;
        return (
            <div style={{
                padding: '20px 5px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                {this.renderInfoClient(clientStore)}
                <div style={{marginBottom: '20px'}}/>
                {
                    !isEmpty(store.player) && !isEmpty(store.opponent) &&
                    <div className="board-score">
                        {
                            this.renderScorePlayer(store.player)
                        }
                        {
                            this.renderScoreOpponent(store.opponent)

                        }
                        {this.renderCurrentTurn(store.yourTurn)}
                    </div>
                }


            </div>
        );
    }
}

export default DrawerComponent;
