import { RootTabsParamList } from './router';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabsParamList {}
  }
}
