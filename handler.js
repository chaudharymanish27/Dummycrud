'use strict';
const AWS = require('aws-sdk');
module.exports.hello = async (event) => {
  const scanParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
  };

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: event,
        TableName: scanParams.TableName
      },
      null,
      2
    ),
  };
};
