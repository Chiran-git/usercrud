export const routes = [
    {
        path: '/',
        component: require('./components/UserList').default,
    },
    {
        path: '/users/create',
        component: require('./components/user/Create').default,
    },
    {
        path: '/users/:id',
        component: require('./components/EditComponent').default,
    },
];
