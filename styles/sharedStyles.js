import { colorGuide, AppColors, AppFonts } from './styleGuide';

export const title = {
  fontFamily: AppFonts.markazi,
  fontSize: 50,
  color: AppColors.lime,
};

export const subtitle = {
  fontFamily: AppFonts.markazi,
  fontSize: 30,
  color: AppColors.white,
};

export const paragraph = {
  fontFamily: AppFonts.karla,
  fontSize: 18,
  color: AppColors.white,
};

export const input = {
  borderWidth: 1,
  borderColor: colorGuide.input.border,
  color: colorGuide.input.text,
  borderRadius: 7,
  height: 40,
  padding: 10,
};
