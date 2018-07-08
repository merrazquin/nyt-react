import axios from "axios";

require('dotenv').config()

export default {
    // Retrieves articles from NYT API
    getArticles: function (topic, startYear, endYear) {
        let begin_date = '', end_date = ''
        if (startYear) {
            begin_date = `&begin_date=${startYear}0101`
        }

        if (endYear) {
            end_date = `&end_date=${endYear}1231`
        }
        return axios.get(`//api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.REACT_APP_NYT_API}&fq=document_type:("article")&q=${topic}${begin_date}${end_date}`, {withCredentials: true})
    },

    getSavedArticles: function () {
        return axios.get('/api/articles')
    },
    // Unsaves the article with the given id
    unsaveArticle: function (id) {
        return axios.delete("/api/articles/" + id);
    },
    // Saves an article to the database
    saveArticle: function (articleData) {
        return axios.post("/api/articles", articleData);
    }
};
