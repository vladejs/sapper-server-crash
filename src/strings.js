export const messages = {
  LOGIN_FAILED: "User or Password wrong. Can't log in",
  SIGNUP_FAILED: "Error signing up",
  STRIPE_LOADING: 'Securely Loading the Payment Form...',
  STRIPE_UNAVAILABLE: 'Unable to contact payment provider',
  ERROR_HAPPENED: 'En error happened. Please try again.',
  DASHBOARD_MESSAGE: 'Contact our tech support team for assistance on your initial setup',
  DASHBOARD_WELCOME: 'Welcome!',
  EMAIL_SUPPORT: 'email@gmail.com',
  EMAIL_WELCOME: 'Welcome to Product'
};

export const ROUTES = {
  ERROR_SIGNUP: '/?error=true&signup=true&message=',
  ERROR_LOGIN: '/?error=true',
  DASHBOARD: '/dashboard',
};

export const API = {
  EMAIL: '/email.json'
};

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

export const PLANS = {
  MONTHLY: 'ddmonthly',
  YEARLY: 'ddyearly'
};

export const PLANS_TR = {
  ddmonthly: 'Monthly',
  ddyearly: 'Yearly'
};

export const emailSignupBody = (email, password, first, last, plan) => `
${first} ${last}, you've successfully enrolled on the ${PLANS_TR[plan]} plan.

Sincerely, 
Company Team   
`;

