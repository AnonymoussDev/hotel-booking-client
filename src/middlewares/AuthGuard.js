import { Navigate, Outlet } from 'react-router-dom';
import storageService from 'src/services/storage.service';

const AuthGuard = () => {
    const token = storageService.getAccessToken();
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default AuthGuard;
