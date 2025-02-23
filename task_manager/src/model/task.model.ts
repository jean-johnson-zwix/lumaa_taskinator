export class Task {

    constructor(id:number, title:string, description:string, isComplete:boolean, userName:string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isComplete = isComplete;
        this.userName = userName;

    }

    id: number;
    title: string;
    description: string;
    isComplete: boolean;
    userName: string;
    
}