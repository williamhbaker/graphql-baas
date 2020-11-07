import React from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const UPLOAD_FILE_STREAM = gql`
  mutation SingleUploadStream($file: Upload!) {
    singleUploadStream(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

const SaveStream = () => (
  <>
    <h2>Save to S3</h2>
    <Mutation mutation={UPLOAD_FILE_STREAM}>
      {(singleUploadStream, { data, loading }) => {
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
                file && singleUploadStream({ variables: { file: file } });
              }}
            />
            {loading && <p>Loading.....</p>}
          </form>
        );
      }}
    </Mutation>
  </>
);


export default SaveStream