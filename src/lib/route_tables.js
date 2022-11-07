'use strict'

module.exports = (routes) => {
    try {
        let columns = ['', 'Name', 'Path']
        let Table = require('cli-table')
        let table = new Table({
            style: {
                head: ['green'],
                compact: true
            },
            head: columns
        })
        console.log('====================================');
        console.log('\t\tAPIs for this service');
        console.log('====================================');
        for (const key of routes) {
            let val = key
            let row = {}
            let version = 1
            let path

            path = '/v' + version + val.path

            row[val.method] = [val.name, path]
            table.push(row)
        }
        console.log(table.toString())
    } catch (error) {
        throw new Error(err)
    }
}