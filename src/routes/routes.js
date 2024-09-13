import Community from '~/pages/Community';
import Home from '~/pages/Home';

const publicPage = [
    { path: '/', element: Home },
    { path: '/community', element: Community },
];
const privatePage = [];

export { publicPage, privatePage };
