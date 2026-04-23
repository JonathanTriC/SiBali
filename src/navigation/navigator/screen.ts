import { NavigatorScreenParams } from '@react-navigation/native';

export type ParamList = {
  Common: NavigatorScreenParams<CommonStackParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
  Detail: NavigatorScreenParams<DetailStackParamList>;
};
