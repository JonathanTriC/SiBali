type ColorShades = {
  neutral: {
    base: string;
    disabled: string;
  };
  primary: {
    base: string;
    disabled: string;
    light: string;
    light2: string;
  };
  danger: {
    base: string;
  };
  success: {
    base: string;
  };
  warning: {
    base: string;
  };
  info: {
    base: string;
  };
  white: string;
  transparent: string;
  backgroundColorModal: string;
};

type NeutralShades = keyof ColorShades['neutral'];
type PrimaryShades = keyof ColorShades['primary'];
type DangerShades = keyof ColorShades['danger'];
type SuccessShades = keyof ColorShades['success'];
type WarningShades = keyof ColorShades['warning'];
type InfoShades = keyof ColorShades['info'];
type ColorProp =
  | ThemeColor
  | `neutral.${NeutralShades}`
  | `primary.${PrimaryShades}`
  | `danger.${DangerShades}`
  | `success.${SuccessShades}`
  | `warning.${WarningShades}`
  | `info.${InfoShades}`
  | 'white'
  | `transparent`
  | `backgroundColorModal`;
