import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema()
export class ScheduleSchema {
  @Prop({ require: true })
  id: string;
  @Prop({ require: true })
  daytime: string;
  @Prop({ require: true })
  hall: number;
  @Prop({ require: true })
  rows: number;
  @Prop({ require: true })
  seats: number;
  @Prop({ require: true })
  price: number;
  @Prop({ type: [String], default: [] })
  taken: string[];
}

@Schema()
export class Film {
  @Prop({ require: true, unique: true })
  id: string;
  @Prop({ require: true })
  rating: number;
  @Prop({ require: true })
  director: string;
  @Prop({ tupe: [String], default: [] })
  tags: string[];
  @Prop({ require: true })
  image: string;
  @Prop({ require: true })
  cover: string;
  @Prop({ require: true })
  title: string;
  @Prop({ require: true })
  about: string;
  @Prop({ require: true })
  description: string;
  @Prop({ type: [ScheduleSchema], default: [] })
  schedule: [ScheduleSchema];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
