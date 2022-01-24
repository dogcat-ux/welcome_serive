module.exports = {
    devServer: {
        host: "localhost",
        port: 8080,
        https: false,
        hotOnly: false,
        disableHostCheck: true, // 禁用webpack热重载检查 解决热更新失效问题
        open: true, //配置自动启动浏览器
        // beforeCompile(app){
        //     app.get('/goods/list',(req,res)=>{
        //         res.json(proxy);
        //     })
        // }
        // before(app){
        //     app.get('/goods/list',(req,res)=>{
        //         res.json(proxy);
        //     })
        // }
        // Mock:true
        // proxy
        // axios.defaults.baseURL = 'http://120.55.53.66:9394/'
        proxy: {
            '/api': {
                target: 'http://120.55.53.66:9394/',
                changeOrigin: true,
                pathRewrite:{
                    "^/api":''
                }
            },
        },
    },

    publicPath: './',

    // pwa: {
    //     iconPaths: {
    //         favicon32: 'favicon.ico',
    //         favicon16: 'favicon.ico',
    //         appleTouchIcon: 'favicon.ico',
    //         maskIcon: 'favicon.ico',
    //         msTileImage: 'favicon.ico'
    //     }
    // },
};
// 接口
// 功能说明
// https://statistics.fzuhelper.w2fzu.com/api/v2/user/031904103/welcome_ num
//     迎新服务使用次数+1
// https://statistics.fzuhelper.w2fzu.com/api/v2/user/031904103/welcome_ people
//     迎新服务人数+1
// https://statistics.fzuhelper.w2fu.com/api/v2/user/031904103/welcome. x?
//     血赚组织进入次数+1.
// https://statistics.fzuhelper.w2fzu.com/api/v2/user/031904103/welcome_ stbm
//     社团与部门]进入次数+1.
// https://statistics.fzuhelper.w2fzu.com/api/v2/user/031904103/welcome_ search
//     搜索功能次数+1
// https://statistics.fzuhelper.w2fzu.com/api/v2/user/031904103/welcome_ share
//     分享次数+1
// https://statistics.fzuhelper.w2fzu.com/api/v2/user/031904103/welcome_ bmxq?
//     增加xx部查看次数+1
// bm=xx部
