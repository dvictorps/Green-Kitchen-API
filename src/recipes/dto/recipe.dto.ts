import { IsNotEmpty, IsString, IsNumber, IsArray } from "class-validator";

export class RecipeDto {

    @IsNotEmpty()
    @IsString()
    public title: string

    @IsNotEmpty()
    @IsString()
    public description: string

    @IsNotEmpty()
    @IsNumber()
    public preparingTime: number

    @IsNotEmpty()
    @IsNumber()
    public amount: number

    @IsNotEmpty()
    @IsArray()
    public categories: number[]

    @IsNotEmpty()
    @IsNumber()
    public recipeStateId: number
    
    

}