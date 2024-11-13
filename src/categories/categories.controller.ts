import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CategoryResponse } from './interfaces';

@UseGuards(AuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryResponse> {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(@Req() req): Promise<CategoryResponse[]> {
    const userId = req.user.id;
    return await this.categoriesService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string): Promise<CategoryResponse> {
    const userId = req.user.id;
    return this.categoriesService.findOne(+id, userId);
  }

  @Patch(':id')
  async update(@Req() req, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<CategoryResponse> {
    const userId = req.user.id;
    return this.categoriesService.update(+id, updateCategoryDto, userId);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string): Promise<CategoryResponse> {
    const userId = req.user.id;
    return this.categoriesService.remove(+id, userId);
  }
}
