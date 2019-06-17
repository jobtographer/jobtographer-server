const joinUsers = jobs => {
  return jobs.map(job => {
    return { ...job, author: '12345' };
  });
};

module.exports =  { joinUsers };
