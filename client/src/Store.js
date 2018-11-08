import {observable, action, computed} from "mobx";
import {isEmpty} from "./helpers/utility";
import UserStore from "./model/user";
import RoomStore from "./model/room";

class Store {
    @observable visibleModalName = true;
    @observable userStore = {};
    @observable roomsStore = [];
    @observable currentRoomId;
    @observable status = "choose room";
    @observable result;


    @action
    submitModalName = (data) => {
        this.visibleModalName = false;
        const user = data.user;
        this.userStore = new UserStore(user.name, user.username, user.socket, user.status, user.chessman);
        data.rooms.forEach((room) => {
            this.roomsStore.push(new RoomStore(room.id, room.playerWhite, room.playerBlack, room.status, room.board, room.currentChessman))
        })
    }

    @action
    updateRoom = (roomData) => {
        this.roomsStore = this.roomsStore.map((room) => {
            if (room.id == roomData.id) {
                Object.keys(roomData).map((key) => {
                    room[key] = roomData[key];
                })
            }
            return room;

        });
    }

    @action
    setCurrentRoom = (roomData) => {
        this.status = "playing";
        this.result = null;
        this.currentRoomId = roomData.id;
    };

    @computed get getCurrentRoom() {
        return this.roomsStore.filter(room => room.id == this.currentRoomId)[0];
    }

    @computed get yourTurn() {
        const room = this.getCurrentRoom;
        const player = this.player;
        return player.chessman == room.currentChessman;
    }

    @computed get partner() {
        const room = this.getCurrentRoom;
        if (isEmpty(room)) return null;
        return room.playerBlack && this.userStore.username == room.playerBlack.username ? room.playerWhite : room.playerBlack;
    }

    @computed get player() {
        const room = this.getCurrentRoom;
        if (isEmpty(room)) return null;
        return room.playerWhite && this.userStore.username == room.playerWhite.username ? room.playerWhite : room.playerBlack;
    }

}

export default new Store();