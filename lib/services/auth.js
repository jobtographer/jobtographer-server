const { ManagementClient } = require('auth0');

const managementClient = new ManagementClient({
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
  scope: 'read:users'
});

const parseUser = user => ({
  email: user.email,
  name: user.nickname,
  id: user.user_id,
  image: user.picture
});

const getUser = id => {
  return managementClient.getUser({ id });
};

const getUsers = ids => {
  return managementClient.getUsers({ q: `user_id: ${ids.join(' OR ')}`
  })
    .then(users => users.map(parseUser));
};

// join users to a model like populate

const joinUsers = async(models, field = 'user') => {
  if(models.length === 0) {
    return [];
  }
  // get user ids
  const usersId = [...new Set(models.map(model => model[field]))];


  // use auth0 to fetch user profiles in bulk
  const users = await getUsers(usersId);

  // inject user into model
  const modelsWithUsers = models.map(model => {
    console.log('users,', users);
    return {
      ...model,
      [field]: users.find(user => user.id === model[field])
    };
  });

  // return all models with users populated
  return modelsWithUsers;
};

module.exports = {
  getUser,
  joinUsers
};
