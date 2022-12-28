module.exports = {
    apps: [
        {
            name: 'qy-web',
            exec_mode: 'cluster',
            instances: 'max',
            script: './server/index.mjs'
        }
    ]
}
