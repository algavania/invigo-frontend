export default function auth({
    next,
    router
}) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user['role'] != 'Investor') return router.push({
        name: 'dashboard'
    });

    return next();
}