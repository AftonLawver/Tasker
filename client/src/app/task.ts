export interface Task {
    name?: string;
    description?: string;
    level?: 'easy' | 'moderate' | 'difficult';
    _id?: string;
}