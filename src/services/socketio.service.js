const io = require('socket.io-client');

export let socket;

export const initiateSocketConnection = (token) => {
    if (socket) {
        return;
    }
    socket = io(`${process.env.REACT_APP_SOCKET_URL}`, {
        reconnection: true,
        extraHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });

    socket.on('connect', () => {
        console.log('Socket connected.');
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected.');
    });

    socket.on('error', (err) => {
        console.error('Socket error: ', err);
    });
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

// receive notify
export const receiveNotification = (callback) => {
    if (socket) {
        socket.on('notification', (res) => {
            console.log(res);
            return callback(null, res);
        });
    }
};

// receive notify
export const receiveRooomsStatus = (callback) => {
    if (socket) {
        socket.on('rooms_status', (res) => {
            console.log(res);
            return callback(null, res);
        });
    }
};
