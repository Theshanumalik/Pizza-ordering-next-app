import Pizza from "@/model/Pizza";
import dbConnect from "@/config/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    await dbConnect();
    const { name, description, price, sizes, image, category } = body;
    if (!name || !description || !price || !sizes || !image || !category) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }
    const pizza = await Pizza.create({
      name,
      description,
      price,
      sizes,
      image,
      category,
    });
    return NextResponse.json(
      { message: "Pizza created successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Pizza already exists" },
        { status: 400 }
      );
    } else if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (value) => value.message
      );
      return NextResponse.json({ message: messages }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const pizzas = [
    {
      name: "Blazing Onion & Paprika",
      description:
        "Hot & spicy pizza with onion & red paprika toppings and a new spicy peri peri sauce on a Domino's cheesy base.",
      price: 200,
      sizes: ["small", "medium", "large"],
      category: "regular",
      image: "/egg-salad.png",
    },
    {
      name: "Margherita",
      description:
        "A classic pizza with a tomato sauce base, mozzarella cheese, and fresh basil leaves.",
      price: 150,
      sizes: ["small", "medium", "large"],
      category: "regular",
      image: "/margherita.png",
    },
    {
      name: "Pepperoni",
      description:
        "Another classic pizza with a tomato sauce base, mozzarella cheese, and pepperoni toppings.",
      price: 160,
      sizes: ["small", "medium", "large"],
      category: "regular",
      image: "/pepperoni.png",
    },
    {
      name: "Hawaiian",
      description:
        "A controversial pizza with a tomato sauce base, mozzarella cheese, ham, and pineapple toppings.",
      price: 170,
      sizes: ["small", "medium", "large"],
      category: "regular",
      image: "/hawaiian.png",
    },
    {
      name: "Supreme",
      description:
        "A pizza with all the toppings! Tomato sauce base, mozzarella cheese, pepperoni, sausage, mushrooms, onions, green peppers, and black olives.",
      price: 180,
      sizes: ["small", "medium", "large"],
      category: "regular",
      image: "/supreme.png",
    },
    {
      name: "Veggie Lover",
      description:
        "A pizza for the vegetarians! Tomato sauce base, mozzarella cheese, mushrooms, onions, green peppers, and black olives.",
      price: 190,
      sizes: ["small", "medium", "large"],
      category: "veg",
      image: "/veggie-lovers.png",
    },
    {
      name: "BBQ Chicken",
      description:
        "A pizza with a BBQ sauce base, mozzarella cheese, grilled chicken, and red onions.",
      price: 210,
      sizes: ["small", "medium", "large"],
      category: "non-veg",
      image: "/bbq-chicken.png",
    },
    {
      name: "Meat Lovers",
      description:
        "A pizza for the meat lovers! Tomato sauce base, mozzarella cheese, pepperoni, sausage, ham, and bacon.",
      price: 220,
      sizes: ["small", "medium", "large"],
      category: "non-veg",
      image: "/meat-lovers.png",
    },
    {
      name: "Buffalo Chicken",
      description:
        "A pizza with a buffalo sauce base, mozzarella cheese, grilled chicken, and blue cheese crumbles.",
      price: 230,
      sizes: ["small", "medium", "large"],
      category: "non-veg",
      image: "/buffalo-chicken.png",
    },
    {
      name: "Chicken Alfredo",
      description:
        "A pizza with an Alfredo sauce base, mozzarella cheese, grilled chicken, and Parmesan cheese.",
      price: 240,
      sizes: ["small", "medium", "large"],
      category: "non-veg",
      image: "/chicken-alfredo.png",
    },
  ];

  await dbConnect();
  for (let i = 0; i < pizzas.length; i++) {
    await Pizza.create(pizzas[i]);
  }
  return NextResponse.json({ message: "Pizzas created successfully" });
}
