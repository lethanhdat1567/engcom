import classNames from 'classnames/bind';
import styles from './SingleLayout.module.scss';
import HeaderSingle from '../components/HeaderSingle/HeaderSingle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);

function SingleLayout({ children }) {
    return (
        <div>
            <HeaderSingle />
            <div className={cx('content')}>
                <div className="row">
                    <div className="col-1">
                        <Navbar />
                    </div>
                    <div className="col-11">
                        <div className={cx('body')}>{children}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SingleLayout;
