const BACKEND_URL_LOCAL = 'http://localhost:4000/api';
// const BACKEND_URL_HOSTING = 'http://107.161.26.33:4000/api';
const BACKEND_URL_HOSTING = 'https://api-fwar-app.vercel.app/api';

const BSC_TRANSACTION_URL =
  process.env.REACT_APP_ISMAIN === '1'
    ? 'https://bscscan.com/tx/'
    : 'https://testnet.bscscan.com/tx/';

const GAME_URL =
  process.env.REACT_APP_ISMAIN === '1'
    ? 'https://api-fwar-app.vercel.app/game'
    : 'http://178.62.199.41:3000/game';

export { BACKEND_URL_LOCAL, BACKEND_URL_HOSTING, BSC_TRANSACTION_URL, GAME_URL };