export interface Blog {
    id:number,
    title:string,
    content:string,
    userid:number,
    creationdate:string,
    lastmodifieddate:string,
    status:string|null,
    viewcount:number|null,
    image:string|null,
    likes:number
}
export interface Community{
    communityid:number,
    communityname:string,
    description:string,
    profilepic:string|null,
    membercount:number|null,
    created_at:string,
    modified_at:string

}
export interface User{
    id:number,
    name:string,
    bio:string|null,
    profilepicture:string|null
}
export interface Comment{
    commentid:number,
    userid:number,
    postid:number,
    username:string,
    content:string,
    creationdate:Date,
    lastmodifieddate:Date
}