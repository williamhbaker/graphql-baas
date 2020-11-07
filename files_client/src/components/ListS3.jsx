import React from 'react'
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import DeleteS3Button from './DeleteS3Button'

const GET_S3_FILES = gql`
  query {
    s3Files {
      fileName
      size
      modified
      link
    }
  }
`;

const ListS3 = () => (
  <Query query={GET_S3_FILES} pollInterval={1000}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <ul>
          {data.s3Files.map(fobj => (
            <li key={fobj.size}>
              <a href={fobj.link}>
                {fobj.fileName} - {fobj.modified} - {Math.round(fobj.size / 1000, 2)}kb
              </a>
              <DeleteS3Button file={fobj.fileName} />
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default ListS3;