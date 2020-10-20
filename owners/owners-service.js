module.exports = {
  isValid,
  validItem,
}

function isValid(owner) {
  return Boolean(owner.username && owner.password && typeof owner.password === 'string');
}

function validItem(item) {
  return Boolean(item.name && item.description && item.price);
}