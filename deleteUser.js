'use strict';
const AWS = require('aws-sdk');

module.exports.delete = async (event) => {
    const requestBody = JSON.parse(event.body)
    try {        
        const scanParams = {
        TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
        Key: {
            'primary_key': requestBody.primary_key
          },
          ReturnValues: 'ALL_OLD'
      };
    
      const dynamodb = new AWS.DynamoDB.DocumentClient();
      await dynamodb.delete(scanParams).promise();
      return {
        statusCode: 200,
        Operation: 'DELETED Successfully',
        Message: 'SUCCESS'
      };
        
    } catch (error) {
        return {
            statusCode: 201,
            Message: 'error',
            body: JSON.stringify(
                {
                  error: error,
                  requestBody:requestBody
                },
                null,
                2
              ),            
          };       
    }
   
};