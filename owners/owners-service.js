module.exports = {
  isValid,
}

function isValid(owner) {
  return Boolean(owner.username && owner.password && typeof owner.password === 'string');
}