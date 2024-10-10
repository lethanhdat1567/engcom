import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import PostItem from '../PostItem/PostItem';
import CreatePost from '../CreatePost/CreatePost';
import { useEffect, useState } from 'react';
import { getAllLikePost, getAllPost } from '~/requestApi/requestPost';
import { useDispatch, useSelector } from 'react-redux';
import { error } from 'jodit/esm/core/helpers';
import { post_like } from '~/redux/reducer/postLike';

const cx = classNames.bind(styles);

function Home() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [postValues, setPostValues] = useState([]);

    useEffect(() => {
        getAllLikePost()
            .then((res) => {
                dispatch(post_like.actions.getLiked(res.data));
                getAllPost(user.id)
                    .then((res) => {
                        setPostValues(res.data);
                    })
                    .catch((error) => {
                        console.log(error);
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
                <CreatePost />
                {postValues.map((item, index) => {
                    return <PostItem post={item} key={index} />;
                })}
            </div>
        </div>
    );
}

export default Home;
