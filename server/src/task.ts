import * as mongodb from "mongodb";

export interface Task {
    name: string;
    description: string;
    level: "easy" | "moderate" | "difficult";
    _id?: mongodb.ObjectId;
}