'use strict';
const AWS = require('aws-sdk');

module.exports.update = async (event) => {
    const requestBody = JSON.parse(event.body)
    const scanParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Key : {
        'primary_key': requestBody.primary_key
      },
      UpdateExpression: 'set ' + requestBody.updateKey  +' = :value',
       ExpressionAttributeValues:{
        ":value": requestBody.updateValue
    },
    ReturnValues:"UPDATED_NEW"
  };
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.update(scanParams).promise().then((response) => {
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
