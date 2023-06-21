import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
@Module({  
  imports: [    
    ServeStaticModule.forRoot({         
      rootPath: join(__dirname,'..','public'),
        }), 
        MongooseModule.forRoot('mongodb+srv://Ginventario:psNlNH6m3Fs3P1eg@cluster0.ew52zkc.mongodb.net/'),
        PokemonModule
      ],
    })
    
    export class AppModule {}
