import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { RecipesModule } from './recipes/recipes.module';
import { jwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [AuthModule, PrismaModule, RecipesModule],
  providers: [jwtStrategy]
})
export class AppModule { }
