export const isArrayContainsArray = (superset: any[], subset: any[]): boolean => {
  if (!subset) {
    return false;
  } else if (!subset.length) {
    return false;
  } else if (0 === subset.length) {
    return false;
  }
  if (!superset) {
    return false;
  } else if (!superset.length) {
    return false;
  } else if (0 === superset.length) {
    return false;
  }
  return subset.every(function (value: any) {
    return superset.indexOf(value) >= 0;
  });
};
