import Flutterwave from 'flutterwave-node-v3';

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

export const paymentConfig = {
  currency: 'NGN',
  country: 'NG',
  paymentMethods: ['card', 'account', 'transfer', 'ussd'],
};

export default flw;
