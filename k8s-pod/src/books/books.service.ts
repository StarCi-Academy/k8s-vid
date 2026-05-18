import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly books: Repository<Book>,
  ) {}

  async create(dto: CreateBookDto): Promise<Book> {
    const book = this.books.create(dto);
    return this.books.save(book);
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.books.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book #${id} not found`);
    }
    return book;
  }
}
