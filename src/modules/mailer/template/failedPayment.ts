export default (mail: string, amount: number): string => {
  return `Hello, ${mail}, your payment amount of ${amount} 
  has failed, please use another card`;
};
