import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';

@Controller('search/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async getProducts(@Query() filterProductDTO: FilterProductDto) {
    // apply filter if any, otherwise return all products
    if (Object.keys(filterProductDTO).length) {
      const foundProductsByFilter =
        await this.productService.findProductsByFilter(filterProductDTO);
      return foundProductsByFilter;
    } else {
      const allProducts = await this.productService.findAllProducts();
      return allProducts;
    }
  }

  @Post('/')
  async addNewProduct(@Body() createProductDto: CreateProductDto) {
    const newProduct = await this.productService.createProduct(
      createProductDto,
    );
    return newProduct;
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    const foundProduct = await this.productService.findProductById(id);
    if (!foundProduct)
      throw new NotFoundException(
        'Are you mistaking us for someone else?! Sorry, we do not have that product..',
      );
    return foundProduct;
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string) {
    const productToUpdate = await this.productService.updateProduct(
      id,
      UpdateProductDto,
    );
    if (!productToUpdate)
      throw new NotFoundException(
        'Are you mistaking us for someone else?! Sorry, we do not have that product..',
      );
    return productToUpdate;
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const productToDelete = await this.productService.deleteProductById(id);
    if (!productToDelete)
      throw new NotFoundException(
        'You can not delete what already does not exist... Sorry, we do not have that product',
      );
    return productToDelete;
  }
}
