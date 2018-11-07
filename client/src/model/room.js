import {observable} from "mobx";

export default class RoomStore {
    @observable id = '';
    @observable playerWhite = '';
    @observable playerBlack = '';
    @observable status = '';
    @observable currentChessman = '';
    @observable board = [];


    constructor(id, playerWhite, playerBlack, status, board, chessman) {
        this.id = id;
        this.playerWhite = playerWhite;
        this.playerBlack = playerBlack;
        this.status = status;
        this.board = board;
        this.chessman = chessman;
    }
}
