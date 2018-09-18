module.exports = {
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui',
    manifest: `    
    <!-- Web Application Manifest -->
    <link rel="manifest" href="manifest.json">

    <!-- Chrome for Android theme color -->
    <meta name="theme-color" content="#2E3AA1">

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
    <meta name="msapplication-TileColor" content="#3372DF">
    <meta name="msapplication-TileImage" content="img/touch/icon-192x192.png">
`
}