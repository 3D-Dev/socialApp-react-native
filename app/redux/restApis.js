/* istanbul ignore file */
import { omit } from 'lodash';
import { get, post, put, del, patch } from 'redux/fetch';
import { API_URL } from 'redux/config';

const generateBody = (payload, type) =>
  (payload instanceof Array && {
    data: payload.map(dataItem => ({
      type,
      attributes: dataItem
    }))
  }) ||
  payload;

const performAction = method => ({ url: apiURL, auth }, ...models) => {
  if (models.length > 1) {
    return (...args) =>
      performAction(method)(
        { url: apiURL, auth },
        `${models[0]}/${args[0]}/${models[1]}`,
        ...models.slice(2)
      )(...args.slice(1));
  }
  const model = models[0];
  const type = model.split('/').slice(-1)[0]; // Get the last part (a/b/c/d => d)
  switch (method) {
    case 'create':
      return (payload = {}) => {
        return post(`${apiURL}/${model}`, {
          requestBody: generateBody(
            omit(payload, ['onSuccess', 'onFailure']),
            type
          ),
          auth
        });
      };

    // case 'update':
    //   return (id, payload = {}) => {
    //     return put(`${apiURL}/${model}/${id}`, {
    //       requestBody: generateBody(
    //         omit(payload, ['onSuccess', 'onFailure']),
    //         type
    //       ),
    //       auth
    //     });
    //   };

    case 'update':
      return (payload = {}) => {
        return patch(`${apiURL}/${model}`, {
          requestBody: generateBody(
            omit(payload, ['onSuccess', 'onFailure']),
            type
          ),
          auth
        });
      };

    case 'put':
      return (payload = {}) =>
        put(`${apiURL}/${model}`, {
          requestBody: generateBody(
            omit(payload, ['onSuccess', 'onFailure']),
            type
          ),
          auth
        });

    case 'patch':
      return (id, payload = {}) => {
        return patch(`${apiURL}/${model}/${id}`, {
          requestBody: generateBody(
            omit(payload, ['onSuccess', 'onFailure']),
            type
          ),
          auth
        });
      };

    case 'remove':
      return (id, payload = {}) => {
        return del(`${apiURL}/${model}/${id}`, {
          requestBody: generateBody(
            omit(payload, ['onSuccess', 'onFailure']),
            type
          ),
          auth
        });
      };

    case 'read':
      return (id, query = {}) =>
        get(
          `${apiURL}/${model}/${id}`,
          omit(query, ['onSuccess', 'onFailure']),
          auth
        );
    case 'multiRemove':
      return (query = {}) =>
        del(`${apiURL}/${model}`, {
          query: omit(query, ['onSuccess', 'onFailure']),
          auth
        });
    case 'list':
    default:
      return (query = {}) =>
        get(
          `${apiURL}/${model}`,
          omit(query, ['onSuccess', 'onFailure']),
          auth
        );
  }
};

export const restApisWithUrl = (data, ...models) => ({
  create: performAction('create')(data, ...models),
  update: performAction('update')(data, ...models),
  remove: performAction('remove')(data, ...models),
  multiRemove: performAction('multiRemove')(data, ...models),
  list: performAction('list')(data, ...models),
  read: performAction('read')(data, ...models),
  put: performAction('put')(data, ...models),
  patch: performAction('patch')(data, ...models)
});

export default (...models) => restApisWithUrl({ url: API_URL }, ...models);
