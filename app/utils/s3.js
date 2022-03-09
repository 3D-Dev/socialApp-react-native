import { RNS3 } from 'react-native-aws3';

const genetratedDate = () => {
  const date = new Date();
  const dateStr = `${`00${date.getMonth() + 1}`.slice(
    -2
  )}-${`00${date.getDate()}`.slice(
    -2
  )}-${date.getFullYear()}_${`00${date.getHours()}`.slice(
    -2
  )}:${`00${date.getMinutes()}`.slice(-2)}:${`00${date.getSeconds()}`.slice(
    -2
  )}`;
  return dateStr;
};

const storeFileInS3 = async (
  name,
  uri
  // ,type
) => {
  const imageType = uri.includes('.jpg') ? 'jpg' : 'png';
  const imageName = `${name}/avatar_${genetratedDate()}.${imageType}`;

  const file = {
    uri,
    name: imageName,
    type: `image/${imageType}`
  };

  const options = {
    keyPrefix: 'uploads/',
    bucket: 'mochaassets',
    region: 'us-west-1',
    accessKey: 'AKIAY22HB4TWCR3BFTMD',
    secretKey: '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',
    successActionStatus: 201
  };

  const response = await RNS3.put(file, options);
  if (response.status !== 201) {
    throw new Error('Failed to upload image to S3');
  }

  const { body } = response;
  const { postResponse } = body;
  return postResponse.location;
};

export default storeFileInS3;
