import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const DELETE_FILE = gql`
  mutation DeleteLocalFile($file: String!) {
    deleteS3(file: $file) {
      fileName
    }
  }
`;

const DeleteS3Button = ({ file }) => (
  <>
    <Mutation mutation={DELETE_FILE} variables={{ file: file }}>
      {(mut) => <button onClick={mut}>Delete</button>}
    </Mutation>
  </>
);

export default DeleteS3Button;
