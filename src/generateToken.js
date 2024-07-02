const jwt = require('jsonwebtoken');

// Função para gerar um token
const generateToken = (userId) => {
  const token = jwt.sign({ _id: userId }, 'secret', { expiresIn: '1h' });
  return token;
};

// Exemplo de uso
const token = generateToken('userId123');
console.log('Generated Token:', token);
