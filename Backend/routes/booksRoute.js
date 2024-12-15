import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();


//Save a new book 
router.post(`/`,async(request, response) => {
    try {
        if (
          !request.body.title ||
          !request.body.author ||
          !request.body.publishYear
        ) {
          return response.status(400).send({
            message: 'Send all required fields: title, author, publishYear',
          });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
          };
      
          const book = await Book.create(newBook);
      
          return response.status(201).send(book);
    }catch (error) {
            console.log(error.message);
            response.status(500).send({message: error.message});
        }
    });

    //get all books from the database
    router.get('/', async (request, response) => {
        try {
          const books = await Book.find({});
      
          return response.status(200).json({
            count: books.length,
            data: books,
          });
        } catch (error) {
          console.log(error.message);
          response.status(500).send({ message: error.message });
        }
      });

      //get a book from database by id
      router.get('/:id', async (request, response) => {
        try {
          const { id } = request.params;

          const book = await Book.findById(id);
      
          return response.status(200).json(book);
        } catch (error) {
          console.log(error.message);
          response.status(500).send({ message: error.message });
        }
      });

      //updating a book
      router.put('/:id', async (request, response) => {
        try {
            console.log('Updating book with ID:', request.params.id);
            console.log('Request body:', request.body);
    
          if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
          ) {
            return response.status(400).send({
              message: 'Send all required fields: title, author, publishYear',
            });
          }
      
          const { id } = request.params;
      
          const result = await Book.findByIdAndUpdate(id, request.body);
      
          if (!result) {
            return response.status(404).json({ message: 'Book not found' });
          }
      
          return response.status(200).send({ message: 'Book updated successfully' });
        } catch (error) {
          console.log(error.message);
          response.status(500).send({ message: error.message });
        }
      });

      //deleting a book
    router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;