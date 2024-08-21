import { memo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { privateRoutes, publicRoutes } from './router';
import Auth from 'src/pages/Auth/Auth';
import { ErrorPage, NotFound } from 'src/pages/Error';
import AuthGuard from 'src/middlewares/AuthGuard';
import storageService from 'src/services/storage.service';

const AppRouter = () => {
    const token = storageService.getAccessToken();
    return (
        <Router>
            <ErrorBoundary FallbackComponent={ErrorPage}>
                <Routes>
                    <Route path="/login" element={!token ? <Auth /> : <Navigate to="/" />} />
                    <Route element={<AuthGuard token={token} />}>
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Route>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    );
};

export default memo(AppRouter);
