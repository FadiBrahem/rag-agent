// utils/detectIntent.js
async function detectIntent(userQuery) {
  const query = userQuery.toLowerCase();

  if (query.includes('reset my password') || query.includes('forgot password')) {
    return 'password_reset';
  } else if (query.includes('escalate') || query.includes('speak to a human')) {
    return 'escalate';
  } else {
    return 'general_query';
  }
}

module.exports = detectIntent;
