export default {
    ServerListener: {
        CONNECTION: 'connection',
        LOG_IN: "LOGIN",
        LOG_OUT: 'disconnect',
        JOIN_ROOM: 'JOIN_ROOM',
        READY_TO_PLAY: 'READY_TO_PLAY',
        TICK: 'TICK',
    },
    ClientListener: {
        LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
        JOINED_ROOM: 'JOINED_ROOM',
        OUT_ROOM: 'OUT_ROOM',
        UPDATE_ROOM: 'UPDATE_ROOM',
        JOINED_GAME: 'JOINED_GAME',
        UPDATE_BOARD: 'UPDATE_BOARD',
        FINISH: 'FINISH'
    },
    Room: {
        Board: {
            ROW: 8,
            COL: 8,
            Cell: {
                EMPTY: null,
                WHITE: 1,
                BLACK: 2
            }
        },
        Status: {
            EMPTY: 0,
            AVAILABLE: 1,
            PLAYING: 2
        }
    },
    Client: {
        Status: {
            ONLINE: 'ONLINE',
            IN_ROOM: 'IN_ROOM',
            PLAYING: 'PLAYING'
        },
        GameResult: {
            WIN: 'WIN',
            LOSE: 'LOSE'
        }
    },
}