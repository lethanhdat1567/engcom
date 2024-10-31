import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { adminPage, publicPage, studentPage, teacherPage } from './routes/routes';
import { DefaultLayout } from './Layouts';
import { Fragment } from 'react';
import ScrollToTop from './utils/ScrollToTop';
import { useSelector } from 'react-redux';

function App() {
    const user = useSelector((state) => state.user.user);
    const handleRoute = (route) => {
        return (
            <Routes>
                {route.map((item, index) => {
                    const Page = item.element;
                    let Layout = DefaultLayout;
                    if (item.layout) {
                        Layout = item.layout;
                    } else if (item.layout == null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            path={item.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                            key={index}
                        />
                    );
                })}
            </Routes>
        );
    };
    return (
        <Router>
            <div className="App">
                <ScrollToTop />
                {!user.id && handleRoute(publicPage)}
                {user.id && user.role_id == 1 && handleRoute(publicPage)}
                {user.id && user.role_id == 2 && handleRoute(studentPage)}
                {user.id && user.role_id == 3 && handleRoute(teacherPage)}
                {user.id && user.role_id == 4 && handleRoute(adminPage)}
            </div>
        </Router>
    );
}

export default App;
