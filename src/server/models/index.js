import { initUser } from './user';
import { initLog } from './log';

export const initModels = () => {
  initUser();
  initLog();
};
