import SingleLayout from '~/Layouts/SingleLayout/SingleLayout';
import Blogs from '~/pages/Blogs';
import ClassDetail from '~/pages/ClassDetail/ClassDetail';
import Community from '~/pages/Community';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile/Profile';

const publicPage = [
    { path: '/', element: Home },
    { path: '/community', element: Community },
    { path: '/blogs', element: Blogs },
    { path: '/profile', element: Profile, layout: SingleLayout },
    { path: '/class/:slug', element: ClassDetail },
];
const privatePage = [];

export { publicPage, privatePage };
