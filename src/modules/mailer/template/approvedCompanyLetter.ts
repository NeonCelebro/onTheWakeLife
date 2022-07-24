export default (email: string, password: string, companyName: string): string => {
  return `hello ${email}, your company : ${companyName} is approved. Your password: ${password} . Use this email for login like partner.`;
};
