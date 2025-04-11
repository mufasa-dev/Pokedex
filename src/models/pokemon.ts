interface Pokemon {
    id: number;
    name: string;
    type: string[];
    image: string;
    sprites: Sprites;
}

interface Sprites {
    front_default: string;
}