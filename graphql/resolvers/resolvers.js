import dbJSON from 'simple-json-db';
const db = new dbJSON('dbjson.json'); 

const page = {
    title : "headers", 
    id : "fjdlskfjlefdls",
    sections : [
        { title : "new headers", bookmark : "newHeaders"}
    ]
}

export const resolvers = {
    Query: {
        getPage : () => page,
        getNews : () => {
            return (db.get('latestNews'))
        },
        getCats : () => {
            return (db.get('categories'))
        }
    },

    Mutation : {
        createNews : (_, args) => {
            const { title, content, image, category } = args;
            console.log(category)
            const news = db.get('latestNews');
            news.data.push({ title, content, image, date : new Date().toLocaleDateString('fa-IR'), category, views : 0 });
            const newLatestNews = { ...news, data : news.data };
            db.set('latestNews', newLatestNews);
            return db.get('latestNews');
        },
        changeNewsStyle : (_, args) => {
            const { columnType } = args;
            const latestNews = db.get('latestNews');
            const newLatestNews = { ...latestNews, columnType };
            db.set('latestNews', newLatestNews);
            return newLatestNews;
        }
    }
}