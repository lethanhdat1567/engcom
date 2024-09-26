import classNames from 'classnames/bind';
import styles from './BlogsDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { readBlog } from '~/requestApi/requestBlog';
import BlogDetailLoading from '~/components/Loading/BlogDetailLoading/BlogDetailLoading';

const cx = classNames.bind(styles);

function BlogsDetail() {
    const { slug } = useParams();
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        readBlog(slug)
            .then((res) => {
                setContent(res.data.content);
                setTitle(res.data.title);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    return (
        <div className={cx('wrap')}>
            {loading ? (
                <BlogDetailLoading />
            ) : (
                <>
                    <h1 className={cx('title')}>{title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </>
            )}
        </div>
    );
}

export default BlogsDetail;
