import React, { Component } from "react";
import { DeleteBtn, ViewBtn, SaveBtn } from "../../components/Buttons";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Articles extends Component {
    state = {
        articles: [],
        savedArticles: [],
        topic: "",
        startYear: "",
        endYear: ""
    };

    componentDidMount() {
        this.loadSavedArticles();
    }

    loadSavedArticles = () => {
        API.getSavedArticles()
            .then(res => this.updateArticleData(null, res.data))
            .catch(err => console.log(err));
    };

    updateArticleData = (_articles, _savedArticles) => {
        const savedArticles = _savedArticles || this.state.savedArticles
        const articles = (_articles || this.state.articles).filter(article => savedArticles.find(savedArticle => savedArticle.url === article.web_url) === undefined)

        this.setState({ articles: articles, savedArticles: savedArticles })
    }

    saveArticle = (title, date, url) => {
        console.log('SAVE')
        API.saveArticle({ title: title, date: date, url: url })
            .then(res => this.loadSavedArticles())
            .catch(err => console.log(err))
    }

    unsaveArticle = id => {
        API.unsaveArticle(id)
            .then(res => this.loadSavedArticles())
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        let { name, value } = event.target;
        if (name === 'startYear' || name === 'endYear') {
            value = value.substring(0, 4)
        }

        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.topic) {

            API.getArticles(this.state.topic, this.state.startYear, this.state.endYear)
                .then(res => this.updateArticleData(res.data.response.docs))
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>Search</h1>
                        </Jumbotron>
                        <form>
                            <Input
                                value={this.state.topic}
                                onChange={this.handleInputChange}
                                name="topic"
                                placeholder="Topic (required)"
                            />
                            <Input
                                value={this.state.startYear}
                                onChange={this.handleInputChange}
                                name="startYear"
                                type="number"
                                placeholder="Start Year (optional)"
                            />
                            <Input
                                value={this.state.endYear}
                                onChange={this.handleInputChange}
                                name="endYear"
                                type="number"
                                placeholder="End Year (Optional)"
                            />
                            <FormBtn
                                disabled={!this.state.topic}
                                onClick={this.handleFormSubmit}
                            >
                                Search
                            </FormBtn>
                        </form>
                        <div style={{ clear: 'both' }}>
                            {this.state.articles.length ? (
                                <List>
                                    {this.state.articles.map(article => (
                                        <ListItem key={article._id}>
                                            <strong>
                                                {article.headline.print_headline}
                                            </strong>
                                            <SaveBtn onClick={() => this.saveArticle(article.headline.print_headline, article.pub_date, article.web_url)} />
                                            <ViewBtn href={article.web_url} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                    <h3>No Results to Display</h3>
                                )}
                        </div>
                    </Col>
                    <Col size="md-6 sm-12">
                        <Jumbotron>
                            <h1>Saved</h1>
                        </Jumbotron>
                        {this.state.savedArticles.length ? (
                            <List>
                                {this.state.savedArticles.map(article => (
                                    <ListItem key={article._id}>
                                        <strong>
                                            {article.title}
                                        </strong>
                                        <DeleteBtn onClick={() => this.unsaveArticle(article._id)} />
                                        <ViewBtn href={article.url} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h3>No Saved Articles</h3>
                            )}

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Articles;
