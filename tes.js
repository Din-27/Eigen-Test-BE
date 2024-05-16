const moment = require('moment')
const now = moment('May 24, 2024')
const borrowDate = moment(1715842596086)
console.log(now.diff(borrowDate, 'days') > 7, borrowDate)