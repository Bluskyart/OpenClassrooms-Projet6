// bookController.js
const Book = require('../models/Book');
const fs = require('fs');

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });

  book.save()
      .then(() => res.status(201).json({ message: 'Livre enregistré' }))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
	Book.findOne({ _id: req.params.id })
		.then((books) => res.status(200).json(books))
		.catch((error) => res.status(404).json({ error }));
};

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete bookObject._userId;

  Book.findOne({ _id: req.params.id })
    .then(book => {
      if (book.userId !== req.auth.userId) {
        return res.status(403).json({ message: 'Non autorisé' });
      }
      Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre modifié !' }))
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => {
      if (book.userId !== req.auth.userId) {
        return res.status(401).json({ message: 'Non autorisé' });
      }
      const filename = book.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Book.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
          .catch(error => res.status(401).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllBooks = (req, res, next) => {
  Book.find()
  .then(books => {
    res.status(200).json(books);
  })
    .catch(error => res.status(400).json({ error }));
};

exports.rateBook = async (req, res, next) => {
  const userId = req.auth.userId;
  const ratingValue = parseInt(req.body.rating, 10);

  if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
      return res.status(400).json({ message: 'La note doit être comprise entre 0 et 5.' });
  }

  try {
      const book = await Book.findOne({ _id: req.params.id });

      if (!book) {
          return res.status(404).json({ message: 'Livre non trouvé' });
      }

      const existingRating = book.rating.find(rating => rating.userId === userId);

      if (existingRating) {
          return res.status(400).json({ message: 'Vous avez déjà noté ce livre.' });
      }

      book.rating.push({ userId, grade: ratingValue });

      const totalRating = book.rating.reduce((sum, rate) => sum + rate.grade, 0);
      book.averageRating = parseFloat((totalRating / book.rating.length).toFixed(1));

      await book.save();

      res.status(200).json({
          message: 'Notation ajoutée avec succès',
          book
      });
  } catch (error) {
      res.status(500).json({ error });
  }
};

exports.bestrating = async (req, res, next) => {
  try {
      const bestRatedBooks = await Book.find().sort({ averageRating: -1 }).limit(3);
      res.status(200).json(bestRatedBooks);
  } catch (error) {
      res.status(500).json({ error });
  }
};
