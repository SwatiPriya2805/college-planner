import Router from 'vue-router';
import Login from '@/components/Login';
import FirstLogin from '@/components/firstLogin';
import AppSignUp from '@/components/SignUp';
import Home from '@/components/Home';
import Notice from '@/components/Notice';
import AddNotice from '@/components/AddNotice';
import Department from '@/components/Department';
import Notes from '@/components/Notes';
import AddNotes from '@/components/AddNotes';
import Timetable from '@/components/Timetable';
import AddTimetable from '@/components/AddTimetable';
import Chat from '@/components/Chat';
import ClubList from '@/components/ClubList';
import Club from '@/components/Club';
import Add from '@/components/AddEvent';
import Calendar from '@/components/Calendar';
import PageNotFound from '@/components/PageNotFound';
import store from '@/store';

/**
 * Add a route property ```meta: { authorize: [ <roles> ] }``` with <roles> authorized to access the route
 * Let authorize be empty to allow access to all authenticated users
 */
const meta = {
    authorize: [ 'admin', 'general' ]
};

const router = new Router({
    mode: 'history', 
    routes: [
        {
            name: 'login',
            path: '/login',
            component:Login
        },
        {
            name: 'firstLogin',
            path :'/firstLogin',
            component: FirstLogin
        },
        {
            name: 'signUp',
            path: '/signUp',
            component: AppSignUp
        },
        {
            name: 'home',
            path: '/',
            component: Home,
        },
        {
            name: 'notice',
            path: '/notice',
            component: Notice,
            meta,
            children:[
                {
                    name:'addNotice',
                    path:'addNotice',
                    component: AddNotice,
                    meta: {
                        authorize: [ 'admin' ]
                    }
                },
            ]
        },
        {
            name: 'department',
            path: '/department',
            component: Department,
            meta,
            children: [
                {
                    name: 'notes',
                    path: 'notes',
                    component: Notes,
                    meta
                },
                {
                    name: 'addNotes',
                    path: 'addNotes',
                    component: AddNotes,
                    meta:{
                        authorize: [ 'admin' ]
                    },
                },
                {
                    name: 'timetable',
                    path: 'timetable',
                    component: Timetable,
                    meta
                },
                {
                    name: 'addTimetable',
                    path: 'addTimetable',
                    component: AddTimetable,
                    meta:{
                        authorize: [ 'admin' ]
                    }
                },
                {
                    name: 'chat',
                    path: 'chat',
                    component: Chat
                    //meta
                }
            ]
        },
        {
            name: 'clubList',
            path: '/club',
            component: ClubList,
            meta
        },
        {
            name: 'club',
            path: '/club/:name',
            props: true,
            component: Club,
            meta,
            children: [
                {
                    name: 'add',
                    path: 'add/:name', 
                    props: true,
                    component: Add,
                    meta:{
                        authorize: [ 'admin' ]
                    }
                }
            ]
        },
        {
            name: 'calendar',
            path: '/calendar',
            component: Calendar,
            meta
        },
        {
            name: 'page-not-found',
            path: '*',
            component: PageNotFound
        }
    ]
});

router.beforeEach(( to, from, next ) => {
    const authorize = to.meta.authorize
    if( authorize && !store.getters.isAuthenticated ) {
        return next({
            name: 'login'
        });
    } else {
        if( authorize && !authorize.includes( store.state.auth.role ) ) {
            return next({
                path: '/'
            });
        }
    }

    next();
});

export default router;