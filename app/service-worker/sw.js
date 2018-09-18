const pjPrefix = 'Cnode-demo'

workbox.core.setCacheNameDetails({prefix: pjPrefix});  //自定义预缓存名

workbox.skipWaiting();  //更新SW跳过等待状态
workbox.clientsClaim();  //激活后接管已打开的由旧SW控制的页面

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);  //预缓存方法

/*
* Runtime caching
* */

//导航网址返回预缓存文件index.html
workbox.routing.registerNavigationRoute("/");

//缓存字体图标
workbox.routing.registerRoute(
    new RegExp('.*alicdn.*\\.woff'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: pjPrefix + '-iconfont',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 1,
                purgeOnQuotaError: true
            })
        ]
    })
)

//缓存用户信息背景图片
workbox.routing.registerRoute(
    /img\/.*\.(?:jpg|png|gif)/,
    workbox.strategies.cacheFirst({
        cacheName: pjPrefix + '-bg',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 5
            })
        ]
    })
)