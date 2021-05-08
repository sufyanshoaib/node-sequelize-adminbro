const models = require('../models');
const AWS = require('aws-sdk');
const uploadFeature = require('@admin-bro/upload');

const Bucket = 'publicusersdb';

var credentials = process.env.NODE_ENV === 'development' ? 
    new AWS.SharedIniFileCredentials({ profile: process.env.AWS_PROFILE }) : {
      accessKeyId:process.env.aws_access_key_id, secretAccessKey:process.env.aws_secret_access_key };
 
const categoryUploadOptions = {
    resource:  models['Category'],
    options: {
      properties: {
        imagePath: { isVisible: false },
        mimeType: { isVisible: false }
      },
    },
    features: [uploadFeature({
      provider: { aws: { region: process.env.AWS_REGION, bucket: Bucket, expires: 0,
                          accessKeyId: credentials.accessKeyId, 
                          secretAccessKey: credentials.secretAccessKey} },
      properties: {
        key: 'imagePath', // to this db field feature will safe S3 key
        mimeType: 'mimeType'
      },
      multiple: false,
      uploadPath: (record, filename) => `images/${record.id()}/${filename}`,
      validation: {
        mimeTypes: ['image/png', 'image/jpeg']
      }
    })]
};
module.exports = categoryUploadOptions;