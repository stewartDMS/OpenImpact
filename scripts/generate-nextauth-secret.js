#!/usr/bin/env node

const crypto = require('crypto');

// Generate a random 32-byte secret and convert to base64
const secret = crypto.randomBytes(32).toString('base64');

console.log('Generated NextAuth Secret:');
console.log(secret);
console.log('\nAdd this to your .env.local file:');
console.log(`NEXTAUTH_SECRET=${secret}`);
console.log('\nFor production, also set:');
console.log(`NEXTAUTH_URL=https://your-domain.com`);