'use strict';
const AWS = require('aws-sdk');

module.exports.create = async (event) => { 
  try {
    const requestBody = JSON.parse(event.body)
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const putParams = {
      TableName:  process.env.DYNAMODB_CUSTOMER_TABLE,
      Item: requestBody
    };
    await dynamoDb.put(putParams).promise().then(() => {
        const message = {
          Operation: 'SAVE',
          Message: 'SUCCESS',
          Item: requestBody
        }
        
      })
      return {
        statusCode: 201,
        Message: 'SUCCESS',
        body : JSON.stringify(requestBody)
        
      };
      
  } catch (error) {
    return {
        statusCode: 201,
        Message: 'error',
        body : error
        
      };
      
  }
  
}