const AppColors = {
  darkGreen: '#495E57',
  orange: '#EE9972',
  lime: '#F4CE14',
  peach: '#FBDABB',
  white: 'white',
  grey: 'grey',
  darkGrey: '#333333',
};

export const iconTextButtonStyles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: AppColors.darkGreen,
    fontSize: 20,
  },
  text: {
    color: AppColors.darkGreen,
    fontWeight: 'bold',
  },
};

export const displayTitleStyles = {
  fontSize: 20,
  color: AppColors.darkGrey,
  marginBottom: 10,
};

export const colorGuide = {
  headerTitle: {
    background: AppColors.lime,
    color: AppColors.darkGrey,
  },
  button: {
    basic: {
      background: AppColors.orange,
      color: AppColors.white,
      borderColor: AppColors.orange,
    },
    destructive: {
      color: AppColors.darkGrey,
      borderColor: AppColors.darkGrey,
    },
  },
  separatorLine: {
    color: AppColors.grey,
  },
  input: {
    border: AppColors.grey,
    text: AppColors.darkGrey,
  },
  label: {
    text: AppColors.darkGrey,
  },
  infoBox: {
    background: AppColors.orange,
    color: AppColors.white,
    borderColor: AppColors.white,
  },
  selectionBox: {
    basic: {
      color: AppColors.darkGrey,
      borderColor: AppColors.darkGrey,
    },
    selected: {
      backgroundColor: AppColors.orange,
      color: AppColors.white,
      borderColor: AppColors.orange,
    },
  },
};
