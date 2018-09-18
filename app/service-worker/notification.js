function nRequestPermission() {  //首次询问用户通知许可，浏览器将保存用户选择，不会重复询问
    if ('Notification' in window && navigator.serviceWorker) {
        Notification.requestPermission(status => {
            console.log('Notification permission status:', status)
        })
    }
}

function displayNotification() {
    if (Notification.permission == 'granted') {  //当用户许可通知，显示通知
        navigator.serviceWorker.getRegistration().then(function (reg) {
            reg.showNotification('Hello world!');
        });
    }
}

module.exports = {nRequestPermission, displayNotification}