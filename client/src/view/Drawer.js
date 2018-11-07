import React, {Component} from 'react';
import {observer} from "mobx-react";
import store from "../Store";
import {Avatar} from 'antd';
import constant from "../constants";

const RoomConstant = constant.Room;

@observer
class DrawerComponent extends Component {
    render() {
        const userStore = store.userStore;
        return (
            <div style={{
                padding: '20px 5px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <Avatar size={100} icon="user"/>
                <div style={{marginTop: 20}}>
                    Xin chào,
                </div>
                <div style={{fontWeight: 'bold'}}>{userStore.name}</div>
                <div style={{color: '#989898'}}>{userStore.username}</div>
                <div style={{marginBottom: '20px'}}/>
                {
                    store.player && store.partner &&
                    <div className="board-score">
                        {
                            store.player &&
                            <div style={{marginBottom: '30px'}}>
                                <div className="name">Bạn</div>
                                <div className="container-score">
                                    <div
                                        className={store.player.chessman == RoomConstant.Board.Cell.WHITE ? 'dot-white' : 'dot-black'}/>

                                    <div className="score">
                                        x {this.props.totalChessman(store.getCurrentRoom.board, store.player.chessman)}
                                    </div>
                                </div>

                            </div>
                        }
                        {
                            store.partner &&
                            <div style={{marginBottom: '30px'}}>
                                <div className="name">{store.partner.name}</div>
                                <div style={{color: '#ececec', textAlign: 'center'}}>{store.partner.username}</div>
                                <div className="container-score">
                                    <div
                                        className={store.partner.chessman == RoomConstant.Board.Cell.WHITE ? 'dot-white' : 'dot-black'}/>
                                    <div className="score">
                                        x {this.props.totalChessman(store.getCurrentRoom.board, store.partner.chessman)}
                                    </div>
                                </div>

                            </div>
                        }
                        {store.yourTurn ? <div className="name">Lượt bạn</div> :
                            <div className="name">Lượt đối thủ</div>}
                    </div>
                }


            </div>
        );
    }
}

export default DrawerComponent;
