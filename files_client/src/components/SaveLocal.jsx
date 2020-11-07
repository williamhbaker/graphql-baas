import React from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const UPLOAD_FILE = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

const SaveLocal = () => (
  <>
    <h2>Save to Local Storage</h2>
    <Mutation mutation={UPLOAD_FILE}>
      {(singleUpload, { data, loading }) => {
        return (
          <form
            onSubmit={() => {
              console.log('Submitted');
            }}
            encType={'multipart/form-data'}
          >
            <input
              name={'document'}
              type={'file'}
              onChange={({ target: { files } }) => {
                const file = files[0];
                file && singleUpload({ variables: { file: file } });
              }}
            />
            {loading && <p>Loading.....</p>}
          </form>
        );
      }}
    </Mutation>
  </>
);


export default SaveLocal