var scriptProperties = PropertiesService.getScriptProperties()

// function setCredentials() {
//     scriptProperties.setProperty('SLACK_TOKEN', 'YOUR TOKEN')
// 	   Logger.log(scriptProperties.getProperty('SLACK_TOKEN'))
// }

var divider = {'type': 'divider'}
const CHANNEL_ID = // YOUR CHANNEL
const activeUsersSheet = // Sheet ID
const importsSheet = // Sheet ID
const newUsersSheet = // Sheet ID

function getSheetById(id) {
  // Get sheet by ID
  return SpreadsheetApp.getActive().getSheets().filter(
    function(s) {return s.getSheetId() === id})[0]
}

function findCol(values, colName, rowNum) {
  // Find column value based on its name and row number
  idx = values[0].indexOf(colName)
  return values[rowNum][idx]
}

function buildSection(text) {
  return {
    'type': 'section',
    'text': {
      'type': 'mrkdwn',
      'text': text
    }
  }
}

function buildRow(col1, col2) {
  return {
    'type': 'section',
    'fields': [
        {
          'type': 'mrkdwn',
          'text': col1
        },
        {
          'type': 'mrkdwn',
          'text': col2
        }
    ]
  }
}

function bulletLine(description, data) {
  return `\t•\t${description} ${data}\n`
}

function header() {
  var greetings = 'Hey team! Here is our daily statistics :rocket: More info on the <https://datastudio.google.com/|dashboards>'
  return buildSection(greetings)
}

function activity(sheetId, section) {
  var values = getSheetById(sheetId).getDataRange().getValues()
  var data =
      bulletLine('Today', `*${findCol(values, 'today', 1).toLocaleString()}*`) +
      bulletLine('Yesterday', `${findCol(values, 'yesterday', 1).toLocaleString()} ${findCol(values, 'growth_1days', 1)}`) +
      bulletLine('Week ago', `${findCol(values, 'week_ago', 1).toLocaleString()} ${findCol(values, 'growth_7days', 1)}`) +
      bulletLine('Month ago', `${findCol(values, 'month_ago', 1).toLocaleString()} ${findCol(values, 'growth_30days', 1)}`)

  return `*${section}*\n${data}`
}

function newUsers() {
  var values = getSheetById(newUsersSheet).getDataRange().getValues()
  var newUsers = findCol(values, 'new_users', 1).toLocaleString()
  return buildSection(`*New users* ${newUsers} :hatching_chick:`)
}

function buildMessage() {
  var message = []
  message.push(
    header(),
    divider,
    buildRow(
      activity(activeUsersSheet, 'Active users'),
      activity(importsSheet, 'Imports')
    ),
    divider,
    newUsers()
  )
  return message
}

function sendToSlack(channelId, message) {
  var URL = 'https://slack.com/api/chat.postMessage'

  var data = {
    'channel': channelId,
    'unfurl_links': false,
    'text': 'Coupler.io Daily Notification',
    'blocks': message
  }

  var params = {
    'method': 'POST',
    'muteHttpExceptions': true,
    'headers': {
      'Authorization': `Bearer ${scriptProperties.getProperty('SLACK_TOKEN')}`,
      'Content-Type': 'application/json'
    },
    'payload': JSON.stringify(data)
  }

  Logger.log(UrlFetchApp.fetch(URL, params))
}

sendToSlack(CHANNEL_ID, buildMessage())
