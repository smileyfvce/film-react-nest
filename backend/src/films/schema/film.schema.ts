import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  id: String,
  daytime: String,
  hall: Number,
  rows: Number,
  seats: Number,
  price: Number,
  taken: [String],
});

const FilmSchema = new mongoose.Schema({
  id: String,
  rating: Number,
  director: String,
  tags: [String],
  image: String,
  cover: String,
  title: String,
  about: String,
  description: String,
  schedule: [ScheduleSchema],
});

export const Film = mongoose.model('Film', FilmSchema);
