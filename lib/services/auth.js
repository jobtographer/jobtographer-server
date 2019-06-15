const { ManagementClient } = require('auth0');

const managementClient = new ManagementClient({
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
  scope: 'read:users'
});

const getUser = id => {
  return managementClient.getUser({ id });
};

const getUsers = ids => {
  q: `user_id: ${ids.join(' OR ')}`
};
