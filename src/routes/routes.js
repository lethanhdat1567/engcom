import CourseLayout from '~/Layouts/CourseLayout/CourseLayout';
import HeaderOnly from '~/Layouts/HeaderOnly/HeaderOnly';
import SingleLayout from '~/Layouts/SingleLayout/SingleLayout';
import Blogs from '~/pages/Blogs';
import Bookmark from '~/pages/Bookmark/Bookmark';
import ClassDetail from '~/pages/ClassDetail/ClassDetail';
import Classes from '~/pages/Classes/Classes';
import ClassMore from '~/pages/ClassMore/ClassMore';
import Community from '~/pages/Community';
import Course from '~/pages/Course/Course';
import Home from '~/pages/Home';
import MyBlogs from '~/pages/MyBlogs/MyBlogs';
import NewPost from '~/pages/NewPost/NewPost';
import Profile from '~/pages/Profile/Profile';
import TeacherClassUser from '~/pages/TeacherClassUser/TeacherClassUSer';
import TeacherHome from '~/pages/TeacherHome/TeachderHome';

const userPage = [
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
    { path: '/course/:slug', element: Course, layout: CourseLayout },
];
const teacherPage = [
    { path: '/', element: TeacherHome },
    { path: '/community', element: Community },
    { path: '/classes/:slug', element: ClassMore },
    { path: '/blogs', element: Blogs },
    { path: '/blogs', element: Blogs },
    { path: '/profile', element: Profile, layout: SingleLayout },
    { path: '/new-post', element: NewPost, layout: HeaderOnly },
    { path: '/me/post', element: MyBlogs },
    { path: '/me/bookmark', element: Bookmark },
    { path: '/class/:slug', element: TeacherClassUser },
    { path: '/class/user/:slug', element: TeacherClassUser },
];

export { userPage, teacherPage };
