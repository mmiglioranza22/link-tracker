import * as moment from 'moment';

const seed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const getRandomIndex = () => Math.floor(Math.random() * seed.length);

export const shortLinkGenerator = () => {
  const link = [];
  for (let i = 0; i < 5; i++) {
    link.push(seed[getRandomIndex()]);
  }
  return link.join('');
};

export const checkExpireDate = (date: Date) => {
  return moment(date).diff(moment()) < 0;
};
