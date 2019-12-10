import { axiosInstance, handleSuccess, handleError } from '../index';
import { getDeveloperLimit } from '../../helpers/setting';

export const getDeveloperList = async option => {
  let data = {
    search: option.search,
    type: option.type,
    offset: (option.active - 1) * getDeveloperLimit,
    limit: getDeveloperLimit
  };

  return await axiosInstance
    .post('/developerList', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const insertDeveloper = async formData => {
  return await axiosInstance
    .post('/developerInsert', formData)
    .then(handleSuccess)
    .catch(handleError);
};

export const detailDeveloper = async seq => {
  let data = {
    seq
  };
  return await axiosInstance
    .post('/developerDetail', data)
    .then(handleSuccess)
    .catch(handleError);
};

export const deleteDeveloper = async (seq, img) => {
  let data = {
    seq,
    img
  };
  return await axiosInstance
    .post('/developerDelete', data)
    .then(handleSuccess)
    .catch(handleError);
};
