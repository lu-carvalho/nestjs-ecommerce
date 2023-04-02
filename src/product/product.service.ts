import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from './entities/product.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const newProduct = await this.productModel.create(createProductDto);
    return newProduct.save();
  }

  public async findAllProducts(): Promise<Product[]> {
    // Mongoose async operations return thenables.
    // when using async/await, the exec() method returns a promise.
    const foundProducts = await this.productModel.find().exec();
    return foundProducts;
  }

  public async findProductById(id: string) {
    const foundProduct = await this.productModel.findById(id).exec();
    return foundProduct;
  }

  // allow filter through search query or product category
  public async findProductsByFilter(
    filterProductDto: FilterProductDto,
  ): Promise<Product[]> {
    const { category, searchQuery } = filterProductDto;
    let foundProducts = await this.findAllProducts();

    if (searchQuery) {
      foundProducts = foundProducts.filter(
        (product) =>
          product.name.includes(searchQuery) ||
          product.description.includes(searchQuery),
      );
    }

    if (category) {
      foundProducts = foundProducts.filter(
        (product) => product.category === category,
      );
    }

    return foundProducts;
  }

  public async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );

    return updatedProduct;
  }

  public async deleteProductById(id: string) {
    const deletedProdcut = await this.productModel.findByIdAndDelete(id);
    return deletedProdcut;
  }
}
