const books = [{
    ISBN: "1",
    title: "Vedas",
    authors: [1, 2],
    language: "en",
    publishDate: "2022-01-27",
    numOfPages: 100,
    category: ["Fiction", "Drama", "Mythology"],
    publication: 1
},
{
    ISBN: "2",
    title: "Puranas",
    authors: [1, 2],
    language: "en",
    publishDate: "2022-01-27",
    numOfPages: 100,
    category: ["Fiction", "Drama", "Mythology"],
    publication: 1
}
];

const authors = [
    {
        id: 1,
        name: "Aryabhatta",
        books: ["1","2"]
    },
    {
        id: 2,
        name: "Veda Vyas",
        books: ["2"],
    }
];

const publications = [
    {
        id:1,
        name:"Geetha Press",
        books:["1"]
    }];

    module.exports={books, authors, publications};