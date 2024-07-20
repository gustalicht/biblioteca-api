const { User } = require('../models');

async function createUser() {
  try {
    const user = await User.create({ username: 'user', password: 'password' });
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser();
