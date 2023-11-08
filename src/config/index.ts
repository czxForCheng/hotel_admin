const config = {
    terminal: 1, //终端
    title: '后台管理系统', //网站默认标题
    version: '1.4.0', //版本号
    // baseUrl: '',
    // baseUrl: 'http://8.210.20.168:8082/', // 胡俊文服务器
    baseUrl: 'http://192.168.2.61:8082/', // 胡俊文本地
    // baseUrl: 'http://192.168.2.61:8082/', // 陶磊本地
    // baseUrl: 'http://192.168.2.44:8082/', // 张俊本地
    // baseUrl: 'http://192.168.2.45:8082/', // 李红本地
    // baseUrl: `${import.meta.env.VITE_APP_BASE_URL || 'http://8.210.20.168:8082'}/`, // 胡俊文服务器
    // baseUrl: `${import.meta.env.VITE_APP_BASE_URL || 'http://192.168.2.63:8082'}/`, // 胡俊文本地
    // baseUrl: `${import.meta.env.VITE_APP_BASE_URL || 'http://192.168.2.61:8082'}/`, // 陶磊本地
    urlPrefix: 'api', //请求默认前缀
    timeout: 20 * 1000 //请求超时时长
}

export default config

