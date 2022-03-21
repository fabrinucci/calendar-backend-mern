/*
    User Routers / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { fieldValidators } = require('../middlewares/field-validators');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post(
    '/new',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must have at least 6 characters').isLength({ min: 6 }),
        fieldValidators

    ],
    createUser
 );

router.post(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must have at least 6 characters').isLength({ min: 6 }),
        fieldValidators
    ],
    loginUser);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;