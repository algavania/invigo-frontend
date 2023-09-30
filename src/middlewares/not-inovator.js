export default function auth({
    next,
    router
}) {
    const user = JSON.parse(localStorage.getItem('user'));
    const currentUrl = window.location.href;
    if (user['role'] == 'Inovator' && !currentUrl.includes(user['username'])) return router.push({
        name: 'dashboard'
    });

    return next();
}