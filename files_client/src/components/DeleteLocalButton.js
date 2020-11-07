import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const DELETE_FILE = gql`
  mutation DeleteLocalFile($file: String!) {
    deleteLocal(file: $file)
  }
`;

const DeleteLocalButton = ({ file }) => (
  <>
    <Mutation mutation={DELETE_FILE} variables={{ file: file }}>
      {(postMutation) => <button onClick={postMutation}>Delete</button>}
    </Mutation>
  </>
);

export default DeleteLocalButton;
