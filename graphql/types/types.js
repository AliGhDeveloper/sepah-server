export const typeDefs = `

    scalar Date
    
    type Section {
        title : String
        bookmark : String
    }
    
    type Page{
        id : ID
        title : String
        sections : [Section]
    }

    type Category { 
        name : String
        id : ID
    }


    type News {
        id : String
        title: String
        content: String
        image : String
        date : Date
        views : Int
        category : String
    }

    type LatestNews {
        data : [News]
        columnType : String
    }

    type Query {
        getPage : Page
        getNews(category : String) : LatestNews
        getNewsById(id : String) : News
        getCats : [Category]
    }

    type Mutation {
        createNews(title : String, content: String, image: String, category : String ) : LatestNews
        changeNewsStyle(columnType : String) : LatestNews
    }
`