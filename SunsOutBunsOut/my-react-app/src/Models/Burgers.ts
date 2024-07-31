export interface Burger {
    id: number;
    name?: string;
    image?: string;
    description?: string;
    price: number;
    isGlutenFree: boolean;
}