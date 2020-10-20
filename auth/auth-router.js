const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const config = require('../api/config.js');