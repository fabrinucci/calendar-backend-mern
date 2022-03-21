/*
    Event Routes
    host + /api/events
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { fieldValidators } = require('../middlewares/field-validators');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use( validateJWT )

// Get events
router.get('/', getEvents);

// Create a new event
router.post(
    '/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Date start is required').custom( isDate ),
        check('end', 'Date end is required').custom( isDate ),
        fieldValidators
    ],
    createEvent);

// Update event
router.put(
    '/:id',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Date start is required').custom( isDate ),
        check('end', 'Date end is required').custom( isDate ),
        fieldValidators
    ],
    updateEvent);

// Delete event
router.delete('/:id', deleteEvent);

module.exports = router;