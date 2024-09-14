import Blogs from '~/pages/Blogs';
import Community from '~/pages/Community';
import Home from '~/pages/Home';

const publicPage = [
    { path: '/', element: Home },
    { path: '/community', element: Community },
    { path: '/blogs', element: Blogs },
];
const privatePage = [];

export { publicPage, privatePage };
