import { DEFAULT_CONFIG } from 'tslint/lib/configuration';

export const MESSAGE: any = {
  ADDED: 'Data has been added successfully.',
  ALREADY: 'Requested data already exists.',
  CREATE: 'Data has been created successfully.',
  CATEGORY_DELETE_ERROR: 'Default category cannot be deleted.',
  CATEGORY_NAME_REQUIRED: 'Category name is required.',
  CHAT_URL_DUPLICATE: 'ChatUrl array contains duplicates.',
  DEFAULT_CATEGORY_NAME: 'common',
  DEFAULT_MIN_URL_NAME_LENGTH: 2,
  DEFAULT_MAX_URL_NAME_LENGTH: 200,
  DEFAULT_MIN_MONITOR_INTERVAL: 60,
  DEFAULT_MIN_MONITOR_TIMEOUT: 1,
  DEFAULT_NOTIFICATION_INTERVAL_MS: 10 * 60 * 1000, // 8 minutes,
  DEFAULT_TIMEOUT: 10,
  DELETE: 'Data has been deleted successfully.',
  DOMAIN_RESTRICTION: 'Access Denied: Only @relinns.com emails are allowed',
  EMPTY_ARRAY: 'Array is empty.',
  ERROR: 'Something went wrong, Please try again in some time.',
  FETCH_SETTING: 'Data has been fetched successfully.',
  FIELD_REQUIRED: 'Field is required in body',
  FORBIDDEN: 'The user you are looking for is not allowed.',
  GET: 'Data has been retrieved successfully.',
  INCORRECT_OLD_PASSWORD: 'Password that you had entered is incorrect.',
  INTERVAL_TIMEOUT_ERROR: 'Interval must be greater than timeout.',
  INVALID: 'Please provide a valid ID.',
  INVALID_TOKEN: 'Please provide a valid token.',
  LINK_EXPIRE: 'The link you are using has expired, Please create a new link and use the same.',
  MISSING_CRED: 'Missing Google credential',
  NOTFOUND: 'Not found',
  NOT_PERMITTED: 'You have insufficient permissions to continue.',
  ORDER_EXIST: 'Order already exists.',
  PARAM_MISSING: 'You are not entering at least one required piece of information.',
  SCREEN_EXIST: 'Screen name already exists.',
  SUBSCRIBE_SUCCESSFULLY: 'You have subscribed successfully.',
  SUCCESS: 'Success.',
  TOKEN_EXPIRED: 'Token expired.',
  UNAUTHORIZED: 'You are making an unauthorized request.',
  UPDATE: 'Data has been updated successfully.',
  X_USER_MISSING: 'The user you are looking for is not available in the database.',
  MONITOR_ALERT: (
      monitorUrl: string,
      monitorUrlName: string,
      monitorStatus: string,
      monitorStatusCode: string
    ) => {
      return {
        text: `🚨 *Monitor Alert* 🚨\nThe website *${monitorUrlName || ''}* is currently *${monitorStatus} (${monitorStatusCode})*.\nURL: ${monitorUrl}\nLast checked at: ${new Date().toLocaleString('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour12: false
        })}`
      };
  },
  SUBSCRIPTION_ALERT: (
      monitorUrlName: string,
      categoryName: string,
      monitorStatus: string,
      monitorStatusCode: string,
      monitorUrl: string
    ) => {
      return {
        text: `🔔 *Subscription Alert* 🔔\nThe monitor *${monitorUrlName || ''}* under the *${categoryName}* status page is currently *${monitorStatus} (${monitorStatusCode})*.\nURL: ${monitorUrl}\nLast checked at: ${new Date().toLocaleString('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour12: false
        })}`
      };
  }
};

MESSAGE.MIN_MONITOR_INTERVAL_MESSAGE = `Interval must be at least ${MESSAGE.DEFAULT_MIN_MONITOR_INTERVAL} seconds`;
MESSAGE.MIN_MONITOR_TIMEOUT_MESSAGE = `Timeout must be at least ${MESSAGE.DEFAULT_MIN_MONITOR_TIMEOUT} seconds`;
