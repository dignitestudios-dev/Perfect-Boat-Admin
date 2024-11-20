import AddOwner from "../components/dasboard/AddOwner";
import DetailOwner from "../components/dasboard/DetailOwner";
import DetailUser from "../components/dasboard/DetailUser";
import OwnerList from "../components/dasboard/OwnerList";
import OwnerUserlist from "../components/dasboard/OwnerUserlist";
import SingleUserList from "../components/dasboard/SingleUserList";
import SubscriptionList from "../components/dasboard/SubscriptionList";
import DeleteOwnerDetail from "../components/deleteusers/DeleteOwnerDetail";
import DeleteSingleUser from "../components/deleteusers/DeleteSingleUser";
import OwnerDetail from "../components/ownerdetail/OwnerDetail";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/dashboard/Home";
import Deleteuser from "../pages/deleteuser/Deleteuser";
import Login from "../pages/onboarding/Login";
import ProfileManagement from "../pages/profilemanagment/ProfileManagement";
import PushNotification from "../pages/pushnotification/PushNotification";
import RevenueReport from "../pages/revenuereport/Revenuereport";
import Notifications from "../pages/Settings/Notifications";
import Profile from "../pages/Settings/Profile";
import TaskManagement from "../pages/taskmanagement/TaskManagement";
import BlogDetails from "../pages/TidesTalesAndGuide/BlogDetails";
import Blogs from "../pages/TidesTalesAndGuide/Blogs";
import UpdateBlog from '../pages/TidesTalesAndGuide/UpdateBlog'
import Preview from '../pages/TidesTalesAndGuide/Preview'
import Publish from "../pages/TidesTalesAndGuide/Publish";
import CreateNewBlog from "../pages/TidesTalesAndGuide/CreateNewBlog";
import EditProfile from "../pages/Settings/EditProfile";
export const routes = [
  {
    title: "Login",
    url: "/login",
    page: <Login />,
  },
  {
    title: "Home",
    url: "/home",
    page: <AppLayout page={<Home />} />,
  },
  {
    title: "Revenuereport",
    url: "/revenuereport",
    page: <AppLayout page={<RevenueReport />} />,
  },
  {
    title: "Notifcations",
    url: "/notifications",
    page: <AppLayout page={<Notifications />} />,
  },
  {
    title: "Profile",
    url: "/profile",
    page: <AppLayout page={<Profile />} />,
  },
  {
    title: "OwnerList",
    url: "/ownerlist",
    page: <AppLayout page={<OwnerList />} />,
  },
  {
    title: "SingleUser",
    url: "/singleuser",
    page: <AppLayout page={<SingleUserList />} />,
  },
  {
    title: "DetailOwner",
    url: "/detailowner",
    page: <AppLayout page={<DetailOwner />} />,
  },
  {
    title: "OwnerUserlist",
    url: "/owneruserlist",
    page: <AppLayout page={<OwnerUserlist />} />,
  },
  {
    title: "SubscriptionList",
    url: "/subscriptionlist",
    page: <AppLayout page={<SubscriptionList />} />,
  },
  {
    title: "DetailUser",
    url: "/detailuser",
    page: <AppLayout page={<DetailUser />} />,
  },
  {
    title: "AddOwner",
    url: "/addowner",
    page: <AppLayout page={<AddOwner />} />,
  },
  {
    title: "TaskManagement",
    url: "/taskmanagement",
    page: <AppLayout page={<TaskManagement />} />,
  },
  {
    title: "PushNotification",
    url: "/pushnotification",
    page: <AppLayout page={<PushNotification />} />,
  },
  {
    title: "DeleteUser",
    url: "/deleteusers",
    page: <AppLayout page={<Deleteuser />} />,
  },
  {
    title: "DeleteOwnerDetail",
    url: "/deleteownerdetail",
    page: <AppLayout page={<DeleteOwnerDetail />} />,
  },
  {
    title: "DeleteSingleUser",
    url: "/deletesingleuser",
    page: <AppLayout page={<DeleteSingleUser />} />,
  },
  {
    title: "Setting",
    url: "/settings",
    page: <AppLayout page={<ProfileManagement />} />,
  },
  {
    title: "OwnerDetail",
    url: "/ownerdetail",
    page: <AppLayout page={<OwnerDetail />} />,
  },
  {
    title: "Blog",
    url: "/blogs",
    page: <AppLayout page={<Blogs />} />,
  },
  {
    title: "Blog Details" ,
    url: "/blogs/:id",
    page: <AppLayout page={<BlogDetails />} />,
  },
  {
    title: "Blog update" ,
    url: "/updateblog/:id",
    page: <AppLayout page={<UpdateBlog />} />,
  },
  {
    title: "preview" ,
    url: "/preview",
    page: <AppLayout page={<Preview />} />,
  },
  {
    title: "Publish" ,
    url: "/publish",
    page: <AppLayout page={<Publish />} />,
  },
  {
    title: "Create Blog" ,
    url: "/blog/createnewblog",
    page: <AppLayout page={<CreateNewBlog />} />,
  },
  {
    title: "EditProfile" ,
    url: "/editprofile",
    page: <AppLayout page={<EditProfile />} />,
  },
  
];
