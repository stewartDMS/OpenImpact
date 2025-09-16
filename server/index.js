// Server-side utilities and API handlers
// This directory contains server-side code for the Open Impact platform

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Server configuration and middleware would go here
// Currently using Next.js built-in API routes

module.exports = {
  // Export server utilities here
};