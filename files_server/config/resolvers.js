/* eslint-disable id-length */
/* eslint-disable no-unused-vars */
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { GraphQLDateTime } = require('graphql-iso-date');

AWS.config.update({ region: 'us-east-1' });

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const s3bucket = 'upload-test-1234';

const uploadDir = path.join(__dirname, '../public');
const fsPromises = fs.promises;

const makeSignedUrl = (fname) => {
  const presignedURL = s3.getSignedUrl('getObject', {
    Bucket: s3bucket,
    Key: fname,
    Expires: 60 * 5,
  });

  return presignedURL;
};

const resolvers = {
  Date: GraphQLDateTime,
  Query: {
    uploads: (parent, args) => {},
    localFiles: async () => {
      const fileList = await fsPromises.readdir(uploadDir);
      return fileList.filter((f) => f !== '.gitignore');
    },
    s3Files: async () => {
      const fileList = await s3.listObjects({ Bucket: s3bucket }).promise();

      return fileList.Contents.map((item) => ({
        fileName: item.Key,
        size: item.Size,
        modified: item.LastModified,
        link: makeSignedUrl(item.Key),
      }));
    },
  },
  Mutation: {
    singleUpload: (parent, args) => {
      return args.file.then((file) => {
        const { createReadStream, filename, mimetype } = file;
        const fileStream = createReadStream();
        const loc = path.join(uploadDir, filename);

        fileStream.pipe(fs.createWriteStream(loc));

        return file;
      });
    },
    deleteLocal: async (parent, args) => {
      fs.unlinkSync(path.join(uploadDir, args.file));
      const fileList = await fsPromises.readdir(uploadDir);
      return fileList.filter((f) => f !== '.gitignore');
    },
    singleUploadStream: async (parent, args) => {
      const file = await args.file;
      const { createReadStream, filename, mimetype } = file;
      const fileStream = createReadStream();

      const uploadParams = {
        Bucket: s3bucket,
        Key: filename,
        Body: fileStream,
      };
      const result = await s3.upload(uploadParams).promise();

      return file;
    },
    deleteS3: async (parent, args) => {
      const params = {
        Bucket: s3bucket,
        Key: args.file,
      };

      await s3.deleteObject(params).promise();

      const fileList = await s3.listObjects({ Bucket: s3bucket }).promise();

      return fileList.Contents.map((item) => ({
        fileName: item.Key,
        size: item.Size,
        modified: item.LastModified,
        link: makeSignedUrl(item.Key),
      }));
    },
  },
};

module.exports = {
  resolvers,
};
