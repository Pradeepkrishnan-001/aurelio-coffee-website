export interface Coffee{
    id:number;
    name:string;
    price:number;
    description:string;
    image:string;
    category:string;
}

export const coffeeData: Coffee[]= [
    {
        id:1,
        name: "Espresso",
        price:  3.00,
        description: "Bold Italian espresso with a rich, intense flavour.",
        image: "https://images.pexels.com/photos/12352764/pexels-photo-12352764.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Hot Coffee"

    },

    {
        id:2,
        name: "Cappuccino",
        price: 4.50,
        description: "Velvety steamed milk with espresso and delicate foam.",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600",
        category: "Hot Coffee"
    },

    {
         id: 3,
        name: "Caffè Latte",
        price: 4.00,
        description: "Smooth espresso blended with creamy steamed milk.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
        category: "Hot Coffee"
    },

    {
        id: 4,
        name: "Iced Coffee",
        price: 4.50,
        description: "Refreshing chilled coffee with a smooth finish.",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600",
        category: "Cold Coffee"
    },


    
    {
        id: 5,
        name: "Americano",
        price: 3.50,
        description: "Rich espresso diluted with hot water.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600",
        category: "Hot Coffee"
    },
    {
        id: 6,
        name: "Mocha",
        price: 5.00,
        description: "Espresso blended with chocolate and steamed milk.",
         image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f",
        category: "Hot Coffee"
    },

    // COLD COFFEE
    {
        id: 7,
        name: "Iced Latte",
        price: 4.80,
        description: "Chilled milk and espresso served over ice.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
        category: "Cold Coffee"
    },
    {
        id: 8,
        name: "Cold Brew",
        price: 5.00,
        description: "Slow-steeped coffee with a smooth finish.",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600",
        category: "Cold Coffee"
    },

    // BAKERY
    {
        id: 9,
        name: "Butter Croissant",
        price: 3.00,
        description: "Flaky golden pastry with rich buttery layers.",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600",
        category: "Bakery"
    },
    {
        id: 10,
        name: "Chocolate Muffin",
        price: 3.50,
        description: "Soft muffin filled with delicious chocolate.",
        image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600",
        category: "Bakery"
    },
    {
        id: 11,
        name: "Chocolate Cookies",
        price: 2.50,
        description: "Crunchy cookies with chocolate chips.",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600",
        category: "Bakery"
    },
    {
        id: 12,
        name: "Chocolate Brownie",
        price: 3.50,
        description: "Rich chocolate brownie with a soft centre.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600",
        category: "Bakery"
    },

    // COMBOS
    {
        id: 13,
        name: "Morning Delight",
        price: 6.50,
        description: "Cappuccino paired with a buttery croissant.",
       image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
        category: "Combos"
    },
    {
        id: 14,
        name: "Chocolate Treat",
        price: 7.00,
        description: "Mocha served with a delicious chocolate brownie.",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600",
        category: "Combos"
    },
    {
        id: 15,
        name: "Coffee Break",
        price: 6.00,
        description: "Caffè Latte served with freshly baked cookies.",
       image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
        category: "Combos"
    },

    {
    id: 16,
    name: "Pistachio Rose Latte",
    price: 5.50,
    description: "A smooth espresso blended with creamy pistachio milk and delicate rose notes, finished with silky foam and crushed pistachios.",
   image: "https://images.kitchenstories.io/wagtailOriginalImages/R3192_Vanilla_Pistacio_Latte_Final_01.jpg",
    category: "Special Coffee"
},



{
    id: 17,
    name: "Orange Blossom Espresso Tonic",
    price: 5.50,
    description: "A refreshing blend of bold espresso, sparkling tonic water and delicate orange blossom with a citrus finish.",
    image: "https://images.pexels.com/photos/12540640/pexels-photo-12540640.png?cs=srgb&dl=pexels-vitalyagorbachev-12540640.jpg&fm=jpg",
    category: "Special Coffee"
},
{
    id: 18,
    name: "Brown Butter Sea Salt Latte",
    price: 5.80,
    description: "A creamy espresso latte infused with brown butter caramel and finished with a touch of sea salt.",
    image: "https://images.unsplash.com/photo-1738704772924-42239b1b36cf?auto=format&fit=crop&fm=jpg&q=60&w=3000",
    category: "Special Coffee"
},
{
    id: 19,
    name: "Italian Morning Combo",
    price: 7.50,
    description: "A classic Italian cappuccino paired with a freshly baked buttery croissant.",
    image: "https://images.unsplash.com/photo-1720692739658-ee952b1aebb1?auto=format&fit=crop&fm=jpg&q=60&w=3000",
    category: "Combo"
},
{
    id: 20,
    name: "Chocolate Indulgence Combo",
    price: 8.50,
    description: "A chilled iced mocha paired with a rich, delicious chocolate brownie.",
    image: "https://images.unsplash.com/photo-1639390089030-7805079d41d8?auto=format&fit=crop&fm=jpg&q=60&w=3000",
    category: "Combo"
},


{
    id: 21,
    name: "Tiramisu Dream Shake",
    price: 6.00,
    description: "A creamy coffee milkshake blended with mascarpone-style flavour and chocolate, finished with a delicate dusting of cocoa.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=85",
    category: "Milkshake"
},
{
    id: 22,
    name: "Royal Pistachio Shake",
    price: 6.50,
    description: "A rich blend of pistachio and vanilla ice cream, topped with crushed pistachios.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=85",
    category: "Milkshake"
},
{
    id: 23,
    name: "Biscoff Caramel Crush",
    price: 6.20,
    description: "A thick vanilla milkshake blended with caramelised biscuit spread and crunchy cookie crumbs.",
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=85",
    category: "Milkshake"
},

    
{
    id: 24,
    name: "Classic Affogato",
    price: 5.50,
    description: "A scoop of creamy vanilla ice cream topped with a freshly brewed shot of rich Italian espresso, creating the perfect balance of sweetness and bold coffee.",
    image: "https://images.pexels.com/photos/19352809/pexels-photo-19352809.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Desserts"
},


{
    id: 25,
    name: "Torta Caprese",
    price: 6.50,
    description: "A rich Italian chocolate and almond cake with a delicate powdered sugar finish.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85",
    category: "Cakes"
},

{
    id: 26,
    name: "Sicilian Pistachio Velvet",
    price: 7.00,
    description: "Soft pistachio sponge layered with silky pistachio cream and a delicate raspberry filling.",
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Cakes"
},
{
    id: 27,
    name: "Piemonte Hazelnut Royale",
    price: 7.50,
    description: "Delicate hazelnut sponge layered with rich chocolate cream and crunchy hazelnut praline.",
    image: "https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Cakes"
},
{
    id: 28,
    name: "Amalfi Lemon Ricotta Cake",
    price: 6.50,
    description: "A light and creamy Italian ricotta cake infused with fresh lemon zest and a delicate sweetness.",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=85",
    category: "Cakes"
}




];