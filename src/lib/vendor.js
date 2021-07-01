const DEPENDENCIES = {};

export const getDependencies = () => {
  return DEPENDENCIES;
};

export const setDependencies = value => {
  Object.assign(DEPENDENCIES, value);
};
