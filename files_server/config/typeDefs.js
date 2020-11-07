const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type File {
    filename: String!
    mimetype: String
    encoding: String
  }

  type S3File {
    fileName: String!
    size: Int!
    modified: Date!
    link: String!
  }

  type Query {
    uploads: [File]
    localFiles: [String]
    s3Files: [S3File]
  }

  type Mutation {
    singleUpload(file: Upload!): File!
    singleUploadStream(file: Upload!): File!
  }
`;

module.exports = {
  typeDefs,
};
