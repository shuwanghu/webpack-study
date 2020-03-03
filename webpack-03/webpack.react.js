const path = require('path')

module.exports={
    mode:'production',
    entry:{
        test:'./src/test.js'
    },
    output:{
        filename:'[name].[hash:8].js',
        path:path.resolve(__dirname,'react')
    }
}