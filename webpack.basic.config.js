const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let webpackConfig = {}

//定义编译的入口文件
webpackConfig.entry = {
    main: path.resolve(__dirname,'src/index.js')
}

//定义编译的输出
webpackConfig.output = {
    path: path.resolve(__dirname,'build'),   //webpack编译输出路径
    filename: 'index.js'                    //webpack编译输出文件
}

//定义loader
webpackConfig.module = {
    rules : [
        {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname,'src/'),
            use: [
                {
                    loader: 'babel-loader'
                }
            ]
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: [
                            path.join(__dirname, 'src', '**/*.scss'),
                        ],
                    },

                }
            ]
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }

    ]
}

//插件注册
webpackConfig.plugins = [
    new HtmlWebpackPlugin({
        chunks: ['main'],
        filename: 'index.html',
        template: './src/index.html'
    })
]


module.exports = webpackConfig
