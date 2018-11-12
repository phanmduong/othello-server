import React, {Component} from 'react';
import {observer} from "mobx-react";
import store from "../Store";
import {Col, Row} from 'antd';

@observer
class ListRoomComponent extends Component {
    renderRoom = (room, index) => {
        const numberPlayer = this.props.countPlayer(room);
        return (
            <Col span={4} key={index}>
                <div className="room" onClick={() => {
                    if (room.status != 2) this.props.joinRoom(room)
                }}>
                    <div className={"room-empty " + `room-${room.status}-user`}>
                        <div className="text">
                            {numberPlayer}/2
                        </div>
                    </div>
                    <div className="room-name">
                        Phòng {room.id}
                    </div>
                </div>

            </Col>
        )
    }

    render() {
        return (
            <div>

                <Row gutter={24}>
                    {
                        store.roomsStore.map((room, index) => {
                            return this.renderRoom(room, index);
                        })
                    }
                </Row>
            </div>

        );
    }
}

export default ListRoomComponent;
