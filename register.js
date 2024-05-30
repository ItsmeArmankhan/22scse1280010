const axios = require('axios');

const register = async () => {
  try {
    const response = await axios.post('http://20.244.56.144/test/register', {
      companyName: 'Armanullahkhan',
      ownerName: 'Arman ullah khan',
      rollNo: '22131280002',
      ownerEmail: 'armanullahkhan234@gmail.com',
      accessCode: 'TMaXNS'
    });
    console.log('Registration successful:', response.data);
  } catch (error) {
    console.error('Error registering:', error.response.data);
  }
};

register();
