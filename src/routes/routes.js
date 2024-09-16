import HeaderOnly from '~/Layouts/HeaderOnly/HeaderOnly';
import SingleLayout from '~/Layouts/SingleLayout/SingleLayout';
import Blogs from '~/pages/Blogs';
import Bookmark from '~/pages/Bookmark/Bookmark';
import ClassDetail from '~/pages/ClassDetail/ClassDetail';
import Classes from '~/pages/Classes/Classes';
import ClassMore from '~/pages/ClassMore/ClassMore';
import Community from '~/pages/Community';
import Home from '~/pages/Home';
import MyBlogs from '~/pages/MyBlogs/MyBlogs';
import NewPost from '~/pages/NewPost/NewPost';
import Profile from '~/pages/Profile/Profile';

const publicPage = [
    { path: '/', element: Home },
    { path: '/community', element: Community },
    { path: '/blogs', element: Blogs },
    { path: '/profile', element: Profile, layout: SingleLayout },
    { path: '/new-post', element: NewPost, layout: HeaderOnly },
    { path: '/my-class', element: Classes },
    { path: '/classes/:slug', element: ClassMore },
    { path: '/me/post', element: MyBlogs },
    { path: '/me/bookmark', element: Bookmark },
    { path: '/class/:slug', element: ClassDetail },
];
const privatePage = [];

export { publicPage, privatePage };
