import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeDto } from './dto/recipe.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Role, Roles } from 'src/roles/roles.decorator';

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Protected)
    @Post('send')
    signup(@Body() dto: RecipeDto, @Req() req) {
        return this.recipesService.sendrecipe(dto, req);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Protected)
    @Patch('update/:id')
    updateRecipe(@Body() dto: RecipeDto, @Param() params: { id: string }, @Req() req) {
        return this.recipesService.updateRecipe(dto, params.id, req)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Protected)
    @Delete('delete/:id')
    deleteRecipe(@Param() params: { id: string }, @Req() req) {
        return this.recipesService.deleteRecipe(params.id, req,)
    }

    @Get('get')
    getRecipes() {
        return this.recipesService.getRecipes();
    }



}
