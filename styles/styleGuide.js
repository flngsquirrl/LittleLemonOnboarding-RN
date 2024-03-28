export const AppColors = {
  darkGreen: '#495E57',
  orange: '#EE9972',
  lime: '#F4CE14',
  peach: '#FBDABB',
  white: 'white',
  grey: 'grey',
  lightGrey: '#EDEFEE',
  darkGrey: '#333333',
};

export const AppFonts = {
  markazi: 'MarkaziText-Regular',
  karla: 'Karla-Regular',
};

export const screenContainer = {
  padding: 15,
};

export const iconTextButton = {
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

export const displayTitle = {
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
  heroBlock: {
    background: AppColors.darkGreen,
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
  checkBox: {
    color: AppColors.orange,
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
