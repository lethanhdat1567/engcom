import AdminLayout from '~/Layouts/AdminLayout/AdminLayout';
import Header from '~/Layouts/components/Header';
import CourseLayout from '~/Layouts/CourseLayout/CourseLayout';
import CourseStudent from '~/Layouts/CourseStudent/CourseStudent';
import HeaderOnly from '~/Layouts/HeaderOnly/HeaderOnly';
import NotFound from '~/Layouts/NotFound/NotFound';
import SingleLayout from '~/Layouts/SingleLayout/SingleLayout';
import TeacherClassLayout from '~/Layouts/TeacherClassLayout/TeacherClassLayout';
import Approve from '~/pages/Approve/Approve';
import ApproveDetail from '~/pages/ApproveDetail/ApproveDetail';
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
import ForumDetail from '~/pages/ForumDetail/ForumDetail';
import Home from '~/pages/Home';
import HomeAdmin from '~/pages/HomeAdmin/HomeAdmin';
import Forum from '~/pages/LiveChat/Forum/Forum';
import LiveChat from '~/pages/LiveChat/LiveChat';
import MyBlogs from '~/pages/MyBlogs/MyBlogs';
import NewPost from '~/pages/NewPost/NewPost';
import Payment from '~/pages/Payment/Payment';
import Profile from '~/pages/Profile/Profile';
import Rank from '~/pages/Rank/Rank';
import Role from '~/pages/Role/Role';
import SearchMore from '~/pages/SearchMore/SearchMore';
import TeacherClassComment from '~/pages/TeacherClassComment/TeacherClassComment';
import TeacherClassCourse from '~/pages/TeacherClassCourse/TeacherClassCourse';
import TeacherClassHome from '~/pages/TeacherClassHome/TeacherClassHome';
import TeacherClassOverView from '~/pages/TeacherClassOverView/TeacherClassOverView';
import TeacherClassUser from '~/pages/TeacherClassUser/TeacherClassUSer';
import TeacherCourse from '~/pages/TeacherCourse/TeacherCourse';
import TeacherHome from '~/pages/TeacherHome/TeachderHome';
import UpdateBLog from '~/pages/UpdateBlog/UpdateBlog';
import UserAdmin from '~/pages/UserAdmin/UserAdmin';
import VideoCall from '~/pages/VideoCall/VideoCall';
import ZoomDetail from '~/pages/ZoomDetail/ZoomDetail';
import ZoomMeeting from '~/pages/ZoomMeeting/ZoomMeeting';

const publicPage = [
    { path: '/', element: Home },
    { path: '/blogs', element: Blogs },
    { path: '/blogs/:slug', element: BlogsDetail, layout: HeaderOnly },
    { path: '/community', element: Community },
    { path: '/classes/:slug', element: ClassMore },
    { path: '/user/role', element: Role, layout: null },
    { path: '/class/:slug', element: ClassDetail },
    { path: '/search', element: SearchMore },
    { path: '/profile/:slug', element: Profile, layout: SingleLayout },
    { path: '*', element: NotFound, layout: null },
];

const studentPage = [
    { path: '/', element: Home },
    { path: '/community', element: Community },
    { path: '/community/chat', element: LiveChat, layout: null },
    { path: '/community/forum', element: Forum, layout: null },
    { path: '/community/forum/:slug', element: ForumDetail, layout: null },
    { path: '/community/rank', element: Rank, layout: null },
    { path: '/community/meeting', element: ZoomMeeting, layout: null },
    { path: '/community/meeting/join', element: ZoomDetail, layout: null },
    { path: '/community/meeting/:slug', element: VideoCall, layout: null },
    { path: '/blogs', element: Blogs },
    { path: '/blogs/:slug', element: BlogsDetail, layout: HeaderOnly },
    { path: '/profile', element: Profile, layout: SingleLayout },
    { path: '/profile/:slug', element: Profile, layout: SingleLayout },
    { path: '/edit-profile', element: EditProfile, layout: null },
    { path: '/new-post', element: NewPost, layout: HeaderOnly },
    { path: '/post/:slug', element: UpdateBLog, layout: HeaderOnly },
    { path: '/my-class', element: Classes },
    { path: '/search', element: SearchMore },
    { path: '/classes/all', element: ClassMore },
    { path: '/me/post', element: MyBlogs },
    { path: '/me/bookmark', element: Bookmark },
    { path: '/class/:slug', element: ClassDetail },
    { path: '/payment/:slug', element: Payment, layout: HeaderOnly },
    { path: '/course/:slug', element: CourseStudent, layout: null },
    { path: '*', element: NotFound, layout: HeaderOnly },
];
const teacherPage = [
    { path: '/', element: TeacherHome },
    { path: '/community', element: Community },
    { path: '/community/chat', element: LiveChat, layout: null },
    { path: '/community/forum', element: Forum, layout: null },
    { path: '/community/forum/:slug', element: ForumDetail, layout: null },
    { path: '/community/rank', element: Rank, layout: null },
    { path: '/community/meeting', element: ZoomMeeting, layout: null },
    { path: '/community/meeting/join', element: ZoomDetail, layout: null },
    { path: '/community/meeting/:slug', element: VideoCall, layout: null },
    { path: '/classes/all', element: ClassMore },
    { path: '/blogs', element: Blogs },
    { path: '/class/:slug', element: ClassDetail },
    { path: '/profile', element: Profile, layout: SingleLayout },
    { path: '/edit-profile', element: EditProfile, layout: null },
    { path: '/new-post', element: NewPost, layout: HeaderOnly },
    { path: '/blogs/:slug', element: BlogsDetail, layout: HeaderOnly },
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
    { path: '/create-class/courses', element: TeacherClassCourse, layout: TeacherClassLayout },
    // Update course
    { path: '/class/:slug/course', element: TeacherCourse, layout: CourseLayout },
    // Create course
    { path: '/class/course', element: TeacherCourse, layout: CourseLayout },
    // Not found
    { path: '*', element: NotFound, layout: null },
];
const adminPage = [
    { path: '/', element: HomeAdmin, layout: AdminLayout },
    { path: '/admin/approve', element: Approve, layout: AdminLayout },
    { path: '/own/:slug/', element: TeacherClassOverView, layout: TeacherClassLayout },
    { path: '/class/:slug/course', element: CourseStudent, layout: null },
    { path: '/admin/users', element: UserAdmin, layout: AdminLayout },
    { path: '/admin/blogs', element: BlogAdmin, layout: AdminLayout },
    { path: '/admin/classes', element: ClassAdmin, layout: AdminLayout },
    { path: '*', element: NotFound, layout: null },
];

export { publicPage, studentPage, teacherPage, adminPage };
