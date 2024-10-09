import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import PostItem from '../PostItem/PostItem';
import CreatePost from '../CreatePost/CreatePost';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrap')}>
            <h1 className={cx('title')}>Home</h1>
            <div className={cx('body')}>
                <CreatePost />
                <PostItem />
                <PostItem />
                <PostItem />
                <PostItem />
                <PostItem />
            </div>
        </div>
    );
}

export default Home;
