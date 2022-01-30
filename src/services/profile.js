import { useSelector } from 'react-redux';

const getProfileData = () => useSelector((state) => state.profile.data);

const getUserBranchId = () => {
  const profile = getProfileData();
  return profile.branchId;
};

export { getProfileData, getUserBranchId };
