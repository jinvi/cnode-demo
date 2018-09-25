const AndroidChromeThemeColor = '#4eb729'  //安卓Chrome浏览器导航栏颜色，非桌面应用
const Win8tileColor = '#4eb729'

module.exports = {

    //视口设置
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',

    //manifest.json及其浏览器兼容标签
    manifest: `    
    <!-- Web Application Manifest -->
    <link rel="manifest" href="manifest.json">

    <!-- Chrome for Android theme color -->
    <meta name="theme-color" content="${AndroidChromeThemeColor}">

    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="PSK">
    <link rel="icon" sizes="192x192" href="img/touch/icon-192x192.png">

    <!-- Add to homescreen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Polymer Starter Kit">
    <link rel="apple-touch-icon" href="img/touch/icon-192x192.png">

    <!-- Tile for Win8 -->
    <meta name="msapplication-TileColor" content="${Win8tileColor}">
    <meta name="msapplication-TileImage" content="img/touch/icon-192x192.png">
`,

    //其他html头部标签
    otherTag: `
    <!--去掉IE10,11在Windows Phone点击时产生的高光-->
    <meta name="msapplication-tap-highlight" content="no" />
    `
}