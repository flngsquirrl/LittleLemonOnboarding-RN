const AppColors = {
  darkGreen: "#495E57",
  orange: "#EE9972",
  lime: "#F4CE14",
  peach: "#FBDABB",
  white: "white",
  grey: "grey",
  darkGrey: "#333333",
};

export default appStyles = {
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
  toolbarButton: {
    color: AppColors.darkGreen,
  },
  actionButton: {
    color: AppColors.darkGreen,
  },
  separatorLine: {
    color: AppColors.grey,
  },
  inputColors: {
    border: AppColors.grey,
    text: AppColors.darkGrey,
  },
  labelColors: {
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
