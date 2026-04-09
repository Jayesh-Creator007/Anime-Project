const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', animeController.getAnimes);
router.get('/stats', animeController.getStats);
router.get('/:id', animeController.getAnimeById);
router.post('/', protect, admin, animeController.createAnime);
router.put('/:id', protect, admin, animeController.updateAnime);
router.delete('/:id', protect, admin, animeController.deleteAnime);
router.patch('/:id/like', animeController.likeAnime);

module.exports = router;
