export const getErrorMessage = (error: any) => {
  const resError = error?.response?.data?.message;
  if (resError) {
    return resError;
  } else {
    return error.message;
  }
};
