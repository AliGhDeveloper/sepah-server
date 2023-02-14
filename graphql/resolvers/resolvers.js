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
        getNews : (_, args) => {
            const { category } = args;
            if(category !== undefined && category !== 'all') {
                const latestNews = db.get('latestNews');
                const data = db.get('latestNews').data.filter( news => news.category === category)
                return { ...latestNews, data }
            }
            return (db.get('latestNews'))
        },
        getNewsById : (_, args) => {
            console.log('salam')
            const { id } = args;
            const news = db.get('latestNews').data.filter(news => news.id === id)
            if(news.length > 0) {
                return news[0]
            }
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