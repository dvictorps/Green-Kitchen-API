import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RecipeDto } from './dto/recipe.dto';
import { Role } from 'src/roles/roles.decorator';


@Injectable()
export class RecipesService {
    constructor(private prisma: PrismaService) { }

    async sendrecipe(dto: RecipeDto, req) {

        const decodedUser = req.user as { id: number, user: string, role: number }

        const { title, preparingTime, amount, categories, description, recipeStateId } = dto


        await this.prisma.recipe.create({
            data: {
                title,
                preparingTime,
                amount,
                categories: { connect: categories.map((categoryId) => ({ id: categoryId })) },
                description,
                recipeState: { connect: { id: recipeStateId } },
                user: { connect: { id: decodedUser.id } },
                time: new Date()

            }
        })


        return { message: 'Receita cadastrada com sucesso' }
    }


    async updateRecipe(dto: RecipeDto, id: string, req) {
        const decodedUser = req.user as { id: number, user: string, role: number }


        const { title, amount, categories, description, recipeStateId } = dto

        const checkRecipe = await this.prisma.recipe.findUnique({ where: { id: parseInt(id) } })

        if (checkRecipe.UserId != decodedUser.id || decodedUser.role != Role.Admin) throw new BadRequestException('Você está tentando alterar uma receita que não é sua')

        if (!checkRecipe) throw new BadRequestException('A receita que você quer editar não existe')

        await this.prisma.recipe.update({
            data: {
                title,
                amount,
                categories: { connect: categories.map((categoryId) => ({ id: categoryId })) },
                description,
                recipeState: { connect: { id: recipeStateId } },
                time: new Date()

            }, where: {
                id: parseInt(id)
            }
        })

        return { message: 'Receita cadastrada com sucesso' }
    }

    async deleteRecipe(id: string, req) {
        const decodedUser = req.user as { id: number, user: string, role: number }

        const checkRecipe = await this.prisma.recipe.findUnique({ where: { id: parseInt(id) } })

        if (checkRecipe.UserId != decodedUser.id || decodedUser.role != Role.Admin) throw new BadRequestException('Você está tentando deletar uma receita que não é sua')

        if (!checkRecipe) throw new BadRequestException('A receita que você quer deletar não existe')

        await this.prisma.recipe.delete({
            where: {
                id: parseInt(id)
            }
        })

        return { message: 'Receita removida com sucesso' }
    }

    async getRecipes() {
        
     return await this.prisma.recipe.findMany({ select: { title: true, amount: true, categories: true, description: true, preparingTime: true, id: true, UserId: true,  } })

    }


}
