import Category from '../components/admin/Category';
import Dashboard from '../components/admin/Dashboard';
import EditCategory from '../components/admin/EditCategory';
import Profile from '../components/admin/Profile';
import ViewCategory from '../components/admin/ViewCategory';

const routes = [
    { path: '/admin', exact: true, name: 'Admin', component: Dashboard },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/add-category', exact: true, name: 'Category', component: Category },
    { path: '/admin/view-category', exact: true, name: 'ViewCategory', component: ViewCategory },
    { path: '/admin/edit-category/:id', exact: true, name: 'EditCategory', component: EditCategory },
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
];

export default routes;