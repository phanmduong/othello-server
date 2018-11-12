import {observable} from "mobx";

export default class ClientStore {
    @observable name = '';
    @observable username = '';
    @observable socket = '';
    @observable status = '';
    @observable chessman = '';

    constructor(name, username, socket, status, chessman) {
        this.name = name;
        this.username = username;
        this.socket = socket;
        this.status = status;
        this.chessman = chessman;
    }
}