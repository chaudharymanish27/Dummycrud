'use strict';
const AWS = require('aws-sdk');

module.exports.get = async (event) => {
const primary_key = event.pathParameters.primary_key
  const scanParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Key: {
        'primary_key': primary_key
      } 
  };

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.get(scanParams).promise();

  if (result.Count === 0) {
    return {
      statusCode: 404,
      items : [],
      primary_key :primary_key
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({      
      items: result.Item,
      primary_key :primary_key
    }),
  };
};