const request = require('supertest');
const app = require('../src/app');
const admin = require('firebase-admin');

jest.mock('firebase-admin', () => {
    const firestore = {
        collection: jest.fn().mockReturnThis(),
        doc: jest.fn().mockReturnThis(),
        update: jest.fn().mockResolvedValueOnce({})
    };
    return {
        initializeApp: jest.fn(),
        credential: {
            cert: jest.fn()
        },
        firestore: jest.fn(() => firestore)
    };
});