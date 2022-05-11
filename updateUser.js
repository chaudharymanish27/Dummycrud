'use strict';
const AWS = require('aws-sdk');

module.exports.update = async (event) => {
    const requestBody = JSON.parse(event.body)
    const scanParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
        'primary_key': requestBody.primary_key,
        'Name': requestBody.updateValue
      },
  };
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.put(scanParams).promise().then((response) => {
     return {      
      UpdatedAttributes: response
    }
  })

  return {
    statusCode: 201,
    Message: 'SUCCESS',
    result : JSON.stringify(result)
    
  };
};