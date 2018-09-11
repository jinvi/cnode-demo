module.exports = function () {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered! 😎');
                })
                .catch(err => {
                    console.log('Registration failed 😫 ', err);
                });
        });
    }
}