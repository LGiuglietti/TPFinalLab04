export class User {
    userName: string;
    email: string;
    password: string;
    favourites: Array<string>;
    id: number;

    constructor() {
        this.userName = '';
        this.email = '';
        this.password = '';
        this.favourites = new Array;
        this.id=0;
    }
}

export class Movie {
    id: string;
    title: string;
    original_title: string;
    original_title_romanised: string;
    description: string;
    director: string;
    producer: string;
    release_date: number;
    running_time: number;
    rt_score: number;
    url: string;

    constructor()
    {
        this.description='';
        this.director='';
        this.id='';
        this.original_title='';
        this.original_title_romanised='';
        this.producer='';
        this.release_date=0;
        this.rt_score=0;
        this.running_time=0;
        this.title='';
        this.url='';
    }
}
export class Favourite{
    idUser: number;
    idPeli: string;

    constructor()
    {
        this.idPeli='';
        this.idUser=0;
    }
}