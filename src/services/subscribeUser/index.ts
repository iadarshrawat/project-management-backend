import { SUBSCRIBE_USER } from '../../models';

export const createSubscriber = async (payload= {}) => {
  return await SUBSCRIBE_USER.create(payload);
};

export const getSubscriber = async (selection= {}, projection= {}) => {
  return await SUBSCRIBE_USER.findOne(selection, projection)
  .lean()
  .exec();
};

export const updateSubscriber = async (selection= {}, updation= {}) => {
  return await SUBSCRIBE_USER.updateOne(selection, updation, {new: true})
  .lean()
  .exec();
};
