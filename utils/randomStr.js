const randomStr = (codeLength) => {
  let str = '';
  const symbols = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

  for (let i = 0; i <= codeLength - 1; i += 1) {
    const symbolPos = Math.floor(Math.random() * (symbols.length - 1));

    str += symbols.substring(symbolPos, symbolPos + 1);
  }

  const date = new Date();

  const [second, minute] = [date.getSeconds(), date.getMinutes()];

  str = `${str}${second}${minute}`;

  return str;
};

module.exports = randomStr;
