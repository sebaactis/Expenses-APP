import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryResponse } from './interfaces';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryResponse> {
    try {
      const category = await this.categoryRepository.create(createCategoryDto);
      const newCategory = await this.categoryRepository.save(category);

      return {
        ...newCategory,
        message: "Category created successfully",
        status: 201
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(): Promise<CategoryResponse[]> {
    try {
      const categories = await this.categoryRepository.find();
      return categories.map(category => (
        { ...category }
      ))

    } catch {
      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number): Promise<CategoryResponse> {

    try {
      const category = await this.categoryRepository.findOne({
        where: { id }
      })

      if (!category) {
        throw new HttpException('CATEGORY_NOT_FOUND', HttpStatus.NOT_FOUND)
      }

      return {
        ...category,
        status: HttpStatus.OK
      }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryResponse> {

    try {

      const category = await this.categoryRepository.findOneBy({ id })

      if (!category) {
        throw new HttpException('CATEGORY_NOT_FOUND', HttpStatus.NOT_FOUND)
      }

      const updatedCategory = await this.categoryRepository.save({
        ...category,
        ...updateCategoryDto
      })

      return updatedCategory;

    } catch (error) {

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async remove(id: number): Promise<CategoryResponse> {

    try {
      const category = await this.categoryRepository.findOneBy({ id })

      if (!category) {
        throw new HttpException('CATEGORY_NOT_FOUND', HttpStatus.NOT_FOUND)
      }

      const categoryRemoved = await this.categoryRepository.remove(category)

      return {
        ...categoryRemoved,
        message: "Category has been deleted successfully",
        status: 200
      }
    } catch (error) {

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
}
