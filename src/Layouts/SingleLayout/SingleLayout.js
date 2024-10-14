import classNames from 'classnames/bind';
import styles from './SingleLayout.module.scss';
import HeaderSingle from '../components/HeaderSingle/HeaderSingle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

const cx = classNames.bind(styles);

function SingleLayout({ children }) {
    const user = useSelector((state) => state.user.user);

    return (
        <div>
            {Object.keys(user).length > 0 ? <HeaderSingle transparent /> : <Header />}
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

export default SingleLayout;
