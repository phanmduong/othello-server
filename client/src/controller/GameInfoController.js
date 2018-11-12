import React, {Component} from 'react';
import {observer} from "mobx-react";
import GameInfoView from "../view/GameInfoView";

@observer
class GameInfoContainer extends Component {

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
            <GameInfoView totalChessman={this.totalChessman}/>
        );
    }
}

export default GameInfoContainer;
