import React, {Component} from 'react';
import './App.css';
import {observer} from "mobx-react";
import store from "./Store";
import {Layout} from 'antd';

import ModalFormNameContainer from "./controller/ModalFormName";
import DrawerContainer from "./controller/Drawer";
import ListRoomContainer from "./controller/ListRoom";
import BoardContainer from "./controller/Board";

const {Header, Sider, Content} = Layout;

@observer
class App extends Component {
    render() {
        return (
            <div>
                <ModalFormNameContainer/>
                <Layout className="layout">
                    <Header>
                        <div style={{color: '#fff', fontSize: '22px', fontWeight: 'bold', textAlign: 'center'}}>
                            {store.status == "choose room" ? "Chọn phòng" : "Chơi"}
                        </div>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{background: '#fff'}}>
                            <DrawerContainer/>
                        </Sider>
                        <Content
                            style={{
                                background: '#e2e2e2',
                                padding: 24,
                                margin: 0,
                                minWidth: '800px',
                                minHeight: 'calc(100vh - 64px)'
                            }}>
                            <div style={{
                                background: '#fff',
                                width: '100%',
                                height: '100%',
                                padding: 24,
                                borderRadius: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {
                                    store.status == "choose room" ? <ListRoomContainer/> : <BoardContainer/>
                                }
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default App;
