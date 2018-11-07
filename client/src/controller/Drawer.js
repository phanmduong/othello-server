import React, {Component} from 'react';
import {observer} from "mobx-react";
import DrawerComponent from "../view/Drawer";

@observer
class DrawerContainer extends Component {

    totalChessman(board, chessman) {
        let count = 0;
        board.forEach((row) => {
            row.forEach((cell) => {
                if (cell == chessman) {
                    count++;
                }
            })
        });
        return count;
    }

    render() {
        return (
            <DrawerComponent totalChessman={this.totalChessman}/>
        );
    }
}

export default DrawerContainer;
