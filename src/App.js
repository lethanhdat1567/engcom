import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { adminPage, studentPage, teacherPage, userPage } from './routes/routes';
import { DefaultLayout } from './Layouts';
import { Fragment } from 'react';
import ScrollToTop from './utils/ScrollToTop';

function App() {
    return (
        <Router>
            <div className="App">
                <ScrollToTop />
                <Routes>
                    {adminPage.map((item, index) => {
                        const Page = item.element;
                        let Layout = DefaultLayout;
                        if (item.layout) {
                            Layout = item.layout;
                        } else if (item.layout === null) {
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
            </div>
        </Router>
    );
}

export default App;
