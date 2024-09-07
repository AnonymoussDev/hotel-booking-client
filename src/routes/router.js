import Home from 'src/pages/Home';
import Room from 'src/pages/Room/Rooms';
import RoomDetail from 'src/pages/Room/RoomDetail';

import Booking from 'src/pages/Booking/Booking';
import BookingCart from 'src/pages/Booking/BookingCart';
import Statistic from 'src/pages/Admin/StatisticV2';
import Manage from '../pages/Admin/Manage';
import AddManage from 'src/pages/Admin/AddManage';
import UpdateManage from 'src/pages/Admin/UpdateManage';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/rooms', component: Room },
    { path: '/room-detail/:roomId', component: RoomDetail },
    { path: '/admin', component: Statistic },
    { path: '/admin/:option', component: Manage },
    { path: '/admin/add/:option', component: AddManage },
    { path: '/admin/update/:option/:optionId', component: UpdateManage },
];

const privateRoutes = [
    { path: '/booking', component: Booking },
    { path: '/booking-cart', component: BookingCart },
];

export { publicRoutes, privateRoutes };
