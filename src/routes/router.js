import Home from 'src/pages/Home';
import Room from 'src/pages/Room/Rooms';
import RoomDetail from 'src/pages/Room/RoomDetail';

import Booking from 'src/pages/Booking/Booking';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/rooms', component: Room },
    { path: '/room-detail/:roomId', component: RoomDetail },
];

const privateRoutes = [{ path: '/booking', component: Booking }];

export { publicRoutes, privateRoutes };
