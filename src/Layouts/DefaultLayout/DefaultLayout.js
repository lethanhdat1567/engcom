import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('content')}>
                <div className="row">
                    <div className="col-2 col-lg-1 d-none d-md-block">
                        <Navbar />
                    </div>
                    <div className="col-12 col-md-10 col-lg-11">
                        <div className={cx('body')}>{children}</div>
                    </div>
                </div>
                <div className={cx('nav-mobile')}>
                    <Navbar />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
