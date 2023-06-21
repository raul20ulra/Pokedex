import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {

  constructor(

    @InjectModel( Pokemon.name )
    private readonly  pokemonModel: Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    const no =  await this.pokemonModel.findOne({no: createPokemonDto.no})
    if(no)  throw new BadRequestException (`number exist in db`)
    const pokemon= await this.pokemonModel.create(createPokemonDto)
    return pokemon;

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon
    // MongoId
    if(isValidObjectId(term)) pokemon = await this.pokemonModel.findById( term)
     //Name 
    if(!pokemon) pokemon = await this.pokemonModel.findOne({ name : term.toLowerCase().trim() })
    if (!pokemon) throw new NotFoundException(`Pokemon with id, name or no "${ term }" not found`)
    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon= await this.findOne(term);
    if(updatePokemonDto.name ) updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    await pokemon.updateOne(updatePokemonDto, {new:true})
    return pokemon
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
