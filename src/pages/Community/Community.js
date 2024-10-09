import classNames from 'classnames/bind';
import styles from './Community.module.scss';
import CommuItem from '~/components/CommuteItem/CommuteItem';
import imgs from '~/assets/Image';

const cx = classNames.bind(styles);

function Community() {
    const communityData = [
        {
            title: 'Live chat',
            desc: 'The Real-Time Chat feature enables users to communicate instantly with one another within the community. This functionality allows for seamless interaction, fostering a sense of connection and engagement among members',
            img: imgs.liveChat,
            to: '/chat',
        },
        {
            title: 'Educational Forum',
            desc: 'Join our vibrant community where students and educators come together to discuss various subjects, exchange knowledge, and support each other in the learning journey. Whether you are seeking help with homework, exploring new topics, or sharing resources, our forum is the perfect place for collaborative learning!',
            img: imgs.newFeed,
            to: '/forum',
        },
        {
            title: 'Top Contributors',
            desc: 'Top Contributors (Outstanding Educators): This section highlights teachers who have made significant contributions to the community. It ranks educators based on their engagement, resources shared, and positive impact on students, encouraging excellence and collaboration within the educational environment.',
            img: imgs.rank,
            to: '/test',
        },
        {
            title: 'Meeting Rooms',
            desc: 'Meeting Rooms: This feature allows users to host and participate in online meetings. Members can discuss, share ideas, and collaborate in real-time, enhancing connectivity and interaction within the community.',
            img: imgs.meeting,
            to: '/test',
        },
    ];
    return (
        <div className={cx('wrap')}>
            <h1 className={cx('title')}>Community</h1>
            <p className={cx('desc')}>
                A community is a group of individuals who share common interests, goals, or values, engaging
                in discussions, collaborations, and support. It provides a space for members to connect, share
                knowledge, and contribute to a collective purpose, fostering a sense of belonging and
                empowerment.
            </p>
            <div className={cx('row row-cols-1 row-cols-lg-2 g-5')}>
                {communityData.map((item, index) => {
                    return (
                        <div className={cx('col')} key={index}>
                            <CommuItem data={item} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Community;
