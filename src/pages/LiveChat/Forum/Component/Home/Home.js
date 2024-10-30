import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import PostItem from '../PostItem/PostItem';
import CreatePost from '../CreatePost/CreatePost';
import { useEffect, useState } from 'react';
import { getAllLikePost, getAllPost } from '~/requestApi/requestPost';
import { useDispatch, useSelector } from 'react-redux';
import { post_like } from '~/redux/reducer/postLike';
import ForumItemLoading from '~/components/Loading/ForumItemLoading/ForumItemLoading';

const cx = classNames.bind(styles);

function Home() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [postValues, setPostValues] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllLikePost()
            .then((res) => {
                dispatch(post_like.actions.getLiked(res.data));
                getAllPost(user.id)
                    .then((res) => {
                        setLoading(false);
                        setPostValues(res.data);
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className={cx('wrap')}>
            <h1 className={cx('title')}>Home</h1>
            <div className={cx('body')}>
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => {
                        return <ForumItemLoading key={index} />;
                    })
                ) : (
                    <>
                        <CreatePost />
                        {postValues.map((item, index) => {
                            return <PostItem post={item} key={index} />;
                        })}
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
