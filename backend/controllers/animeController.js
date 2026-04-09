const Anime = require('../models/Anime');

// Get all anime
exports.getAnimes = async (req, res) => {
  try {
    const animes = await Anime.find().sort({ createdAt: -1 });
    res.json(animes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single anime
exports.getAnimeById = async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.status(404).json({ message: 'Anime not found' });
    
    // Increment views
    anime.views += 1;
    await anime.save();
    
    res.json(anime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create anime
exports.createAnime = async (req, res) => {
  const { title, description, imageUrl, seasonsWatched } = req.body;
  try {
    const anime = new Anime({ title, description, imageUrl, seasonsWatched });
    const savedAnime = await anime.save();
    res.status(201).json(savedAnime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update anime
exports.updateAnime = async (req, res) => {
  try {
    const updatedAnime = await Anime.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAnime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete anime
exports.deleteAnime = async (req, res) => {
  try {
    await Anime.findByIdAndDelete(req.params.id);
    res.json({ message: 'Anime deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like anime
exports.likeAnime = async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.status(404).json({ message: 'Anime not found' });
    
    anime.likes += 1;
    await anime.save();
    res.json(anime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get stats
exports.getStats = async (req, res) => {
  try {
    const animes = await Anime.find();
    const totalLikes = animes.reduce((sum, anime) => sum + anime.likes, 0);
    const totalViews = animes.reduce((sum, anime) => sum + anime.views, 0);
    const totalAnime = animes.length;
    res.json({ totalLikes, totalViews, totalAnime });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
