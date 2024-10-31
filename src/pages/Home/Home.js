import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import SliderBanner from './SliderBanner';
import Classes from './Classes';
import { useEffect, useState } from 'react';
import { getAllClasses } from '~/requestApi/requestClass';
import { readAllBlogs } from '~/requestApi/requestBlog';
import CartLoading from '~/components/Loading/CartLoading/CartLoading';
import { useDispatch, useSelector } from 'react-redux';
import { storeData } from '~/redux/reducer/StoreSlice';

const cx = classNames.bind(styles);

function Home() {
    const user = useSelector((state) => state.user.user);
    const classes = useSelector((state) => state.storeData.classes);
    const blogs = useSelector((state) => state.storeData.blogs);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (Object.keys(classes).length == 0) {
            setLoading(true);
            getAllClasses()
                .then((res) => {
                    dispatch(storeData.actions.getClasses(res));
                    readAllBlogs()
                        .then((res) => {
                            setLoading(false);
                            dispatch(storeData.actions.getBlogs(res.data));
                        })
                        .catch((error) => {
                            setLoading(false);
                            console.log(error);
                        });
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
        }
    }, []);

    return (
        <>
            {/* <Loading /> */}
            <div className={cx('home')}>
                {(user.role_id == 2 || Object.keys(user).length == 0) && (
                    <div className={cx('banner')}>
                        <SliderBanner />
                    </div>
                )}
                <div className="container">
                    {loading ? (
                        <div className={cx('loading')}>
                            <div
                                className={cx('row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-5')}
                            >
                                {Array.from({ length: 8 }).map((_, index) => {
                                    return (
                                        <div className="col" key={index}>
                                            <CartLoading />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className={cx('content')}>
                            {classes?.public?.length > 0 && (
                                <Classes
                                    data={classes?.public.slice(0, 8)}
                                    title="PUBLIC CLASSES"
                                    to="public"
                                />
                            )}
                            {classes?.private?.length > 0 && (
                                <Classes
                                    data={classes?.private.slice(0, 8)}
                                    title="PRIVATE CLASSES"
                                    to="private"
                                />
                            )}
                            {blogs?.length > 0 && (
                                <Classes data={blogs.slice(0, 8)} title="BLOGS" type="blog" to="blogs" />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;
