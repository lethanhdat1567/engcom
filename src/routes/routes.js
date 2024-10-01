import AdminLayout from '~/Layouts/AdminLayout/AdminLayout';
import CourseLayout from '~/Layouts/CourseLayout/CourseLayout';
import HeaderOnly from '~/Layouts/HeaderOnly/HeaderOnly';
import NotFound from '~/Layouts/NotFound/NotFound';
import SingleLayout from '~/Layouts/SingleLayout/SingleLayout';
import TeacherClassLayout from '~/Layouts/TeacherClassLayout/TeacherClassLayout';
import BlogAdmin from '~/pages/BlogAdmin/BlogAdmin';
import Blogs from '~/pages/Blogs';
import BlogsDetail from '~/pages/BlogsDetail/BlogsDetail';
import Bookmark from '~/pages/Bookmark/Bookmark';
import ClassAdmin from '~/pages/ClassAdmin/ClassAdmin';
import ClassDetail from '~/pages/ClassDetail/ClassDetail';
import Classes from '~/pages/Classes/Classes';
import ClassMore from '~/pages/ClassMore/ClassMore';
import Community from '~/pages/Community';
import Course from '~/pages/Course/Course';
import EditProfile from '~/pages/EditProfile/EditProfile';
import Home from '~/pages/Home';
import HomeAdmin from '~/pages/HomeAdmin/HomeAdmin';
import MyBlogs from '~/pages/MyBlogs/MyBlogs';
import NewPost from '~/pages/NewPost/NewPost';
import Profile from '~/pages/Profile/Profile';
import Role from '~/pages/Role/Role';
import TeacherClassComment from '~/pages/TeacherClassComment/TeacherClassComment';
import TeacherClassCourse from '~/pages/TeacherClassCourse/TeacherClassCourse';
import TeacherClassDesign from '~/pages/TeacherClassDesign/TeacherClassDesign';
import TeacherClassHome from '~/pages/TeacherClassHome/TeacherClassHome';
import TeacherClassOverView from '~/pages/TeacherClassOverView/TeacherClassOverView';
import TeacherClassUser from '~/pages/TeacherClassUser/TeacherClassUSer';
import TeacherCourse from '~/pages/TeacherCourse/TeacherCourse';
import TeacherHome from '~/pages/TeacherHome/TeachderHome';
import UpdateBLog from '~/pages/UpdateBlog/UpdateBlog';
import UserAdmin from '~/pages/UserAdmin/UserAdmin';

const publicPage = [
    { path: '/', element: Home },
    { path: '/blogs', element: Blogs },
    { path: '/community', element: Community },
    { path: '/classes/:slug', element: ClassMore },
    { path: '/user/role', element: Role },
    { path: '*', element: NotFound, layout: null },
];

const studentPage = [
    { path: '/', element: Home },
    { path: '/community', element: Community },
    { path: '/blogs', element: Blogs },
    { path: '/blogs/:slug', element: BlogsDetail, layout: HeaderOnly },
    { path: '/profile', element: Profile, layout: SingleLayout },
    { path: '/edit-profile', element: EditProfile, layout: null },
    { path: '/new-post', element: NewPost, layout: HeaderOnly },
    { path: '/post/:slug', element: UpdateBLog, layout: HeaderOnly },
    { path: '/my-class', element: Classes },
    { path: '/classes/:slug', element: ClassMore },
    { path: '/me/post', element: MyBlogs },
    { path: '/me/bookmark', element: Bookmark },
    { path: '/class/:slug', element: ClassDetail },
    { path: '/course/:slug', element: Course, layout: CourseLayout },
    { path: '*', element: NotFound, layout: null },
];
const teacherPage = [
    { path: '/', element: TeacherHome },
    { path: '/community', element: Community },
    { path: '/classes/all', element: Home },
    { path: '/classes/:slug', element: ClassMore },
    { path: '/blogs', element: Blogs },
    { path: '/blogs', element: Blogs },
    { path: '/class/:slug', element: ClassDetail },
    { path: '/profile', element: Profile, layout: SingleLayout },
    { path: '/edit-profile', element: EditProfile, layout: null },
    { path: '/new-post', element: NewPost, layout: HeaderOnly },
    { path: '/course/:slug', element: Course, layout: CourseLayout },
    { path: '/me/post', element: MyBlogs },
    { path: '/me/bookmark', element: Bookmark },
    // Update class
    { path: '/own/:slug/', element: TeacherClassHome, layout: TeacherClassLayout },
    { path: '/own/:slug/overview', element: TeacherClassOverView, layout: TeacherClassLayout },
    { path: '/own/:slug/courses', element: TeacherClassCourse, layout: TeacherClassLayout },
    { path: '/own/:slug/users', element: TeacherClassUser, layout: TeacherClassLayout },
    { path: '/own/:slug/comments', element: TeacherClassComment, layout: TeacherClassLayout },
    // Create class
    { path: '/create-class', element: TeacherClassHome, layout: TeacherClassLayout },
    { path: '/create-class/overview', element: TeacherClassOverView, layout: TeacherClassLayout },
    { path: '/create-class/courses', element: TeacherClassCourse, layout: TeacherClassLayout },
    { path: '/create-class/users', element: TeacherClassUser, layout: TeacherClassLayout },
    { path: '/create-class/comments', element: TeacherClassComment, layout: TeacherClassLayout },
    // Update course
    { path: '/class/:slug/course', element: TeacherCourse, layout: CourseLayout },
    // Create course
    { path: '/class/course', element: TeacherCourse, layout: CourseLayout },
    // Not found
    { path: '*', element: NotFound, layout: null },
];
const adminPage = [
    { path: '/', element: HomeAdmin, layout: AdminLayout },
    { path: '/admin/users', element: UserAdmin, layout: AdminLayout },
    { path: '/admin/blogs', element: BlogAdmin, layout: AdminLayout },
    { path: '/admin/classes', element: ClassAdmin, layout: AdminLayout },
    { path: '*', element: NotFound, layout: null },
];

export { publicPage, studentPage, teacherPage, adminPage };
