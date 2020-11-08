import React from 'react'
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import DeleteLocalButton from './DeleteLocalButton'

const GET_LOCAL_FILES = gql`
  query {
    localFiles
  }
`;

const ListLocal = () => (
  <Query query={GET_LOCAL_FILES} pollInterval={1000}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <ul>
          {data.localFiles.map(fname => (
            <li key={fname}>
              <a href={`/assets/${fname}`}>{fname}</a>
              <DeleteLocalButton file={fname} />
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default ListLocal;