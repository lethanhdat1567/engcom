import AdminLayout from '~/Layouts/AdminLayout/AdminLayout';
import CourseLayout from '~/Layouts/CourseLayout/CourseLayout';
import HeaderOnly from '~/Layouts/HeaderOnly/HeaderOnly';
import SingleLayout from '~/Layouts/SingleLayout/SingleLayout';
import TeacherClassLayout from '~/Layouts/TeacherClassLayout/TeacherClassLayout';
import BlogAdmin from '~/pages/BlogAdmin/BlogAdmin';
import Blogs from '~/pages/Blogs';
import Bookmark from '~/pages/Bookmark/Bookmark';
import ClassAdmin from '~/pages/ClassAdmin/ClassAdmin';
import ClassDetail from '~/pages/ClassDetail/ClassDetail';
import Classes from '~/pages/Classes/Classes';
import ClassMore from '~/pages/ClassMore/ClassMore';
import Community from '~/pages/Community';
import Course from '~/pages/Course/Course';
import Home from '~/pages/Home';
import HomeAdmin from '~/pages/HomeAdmin/HomeAdmin';
import MyBlogs from '~/pages/MyBlogs/MyBlogs';
import NewPost from '~/pages/NewPost/NewPost';
import Profile from '~/pages/Profile/Profile';
import TeacherClassComment from '~/pages/TeacherClassComment/TeacherClassComment';
import TeacherClassCourse from '~/pages/TeacherClassCourse/TeacherClassCourse';
import TeacherClassDesign from '~/pages/TeacherClassDesign/TeacherClassDesign';
import TeacherClassHome from '~/pages/TeacherClassHome/TeacherClassHome';
import TeacherClassOverView from '~/pages/TeacherClassOverView/TeacherClassOverView';
import TeacherClassUser from '~/pages/TeacherClassUser/TeacherClassUSer';
import TeacherCourse from '~/pages/TeacherCourse/TeacherCourse';
import TeacherHome from '~/pages/TeacherHome/TeachderHome';
import UserAdmin from '~/pages/UserAdmin/UserAdmin';

const studentPage = [
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
    { path: '/course/:slug', element: Course, layout: CourseLayout },
    { path: '/me/post', element: MyBlogs },
    { path: '/me/bookmark', element: Bookmark },
    { path: '/class/:slug/', element: TeacherClassHome, layout: TeacherClassLayout },
    { path: '/class/:slug/overview', element: TeacherClassOverView, layout: TeacherClassLayout },
    { path: '/class/:slug/courses', element: TeacherClassCourse, layout: TeacherClassLayout },
    { path: '/class/:slug/users', element: TeacherClassUser, layout: TeacherClassLayout },
    { path: '/class/:slug/comments', element: TeacherClassComment, layout: TeacherClassLayout },
    // Course
    { path: '/class/:slug/course/:slug', element: TeacherCourse, layout: CourseLayout },
];
const adminPage = [
    { path: '/', element: HomeAdmin, layout: AdminLayout },
    { path: '/admin/users', element: UserAdmin, layout: AdminLayout },
    { path: '/admin/blogs', element: BlogAdmin, layout: AdminLayout },
    { path: '/admin/classes', element: ClassAdmin, layout: AdminLayout },
];

export { studentPage, teacherPage, adminPage };
