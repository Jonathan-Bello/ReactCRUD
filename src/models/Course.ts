export interface Course {
    id: number
    name: string
    type: number
    level: number
    description: string
    tag: string
    teacherID: string
    thumbnail: string
}

export interface Tag {
    id: number
    name: string
}

export interface Student {
    id: number
    name: string
    lastname: string
}