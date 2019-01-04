import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const Header = (props) => (
    <h1 className="header">{props.title}</h1>
);

const DirectoryView = (props) => (
    <div className="directory-view">
        <SearchForm searchVal={props.searchVal} handleChange={props.handleChange} selectRecipes={props.selectRecipes} />
        {props.recipes.map(recipe => <RecipeCard name={recipe.name} id={recipe.id} clickHandler={props.clickHandler} key={recipe.id} />)}
    </div>
);

const SearchForm = (props) => (
    <form className="form">
        <input className="input" value={props.searchVal} onChange={props.handleChange} placeholder="Search Recipes Here"/>
        <button className="button" onClick={props.selectRecipes}>SEARCH</button>
    </form>
);

const RecipeCard = (props) => (
    <div  className="recipecard" onClick={() => props.clickHandler(props.id)}>
        <p>{props.name}</p>
    </div>
);

const DetailView = (props) => (
    <div className="detail-view">
        <p><strong>Name:</strong> {props.details.name}</p>
        <p><strong>Ingredients:</strong> {props.details.ingredients}</p>
        <p><strong>Instructions:</strong> {props.details.instructions}</p>
    </div>
);

class App extends React.Component {
    state = {
        recipes: [
            {
                id: 1,
                name: 'The Scramble',
                ingredients: ['eggs, ', 'hash browns, ', 'sausage, ', 'cheese, ', 'onion'],
                instructions: ['make scrambled eggs, ', 'cook hash browns, ', 'brown sausage, ', 'mix it all up and add cheese']
            },
            {
                id: 2,
                name: 'Spanakopita',
                ingredients: ['Olive oil', 'Onion', 'Garlic', 'Spinach'],
                instructions: ['Put the stuff in a bowl', 'Cook the stuff']
            },
            {
                id: 3,
                name: 'Vasilopita',
                ingredients: ['Flower', 'Baking Soda', 'Butter', 'Sugar', 'Eggs'],
                instructions: ['Throw everything in the air and hope it comes together', 'Knead the bread', 'Show the bread some love', 'Bake it at 400 degrees']
            },
            {
                id: 4,
                name: 'Mac and Cheese',
                ingredients: ['Mac', 'Cheese'],
                instructions: ['Put the mac in the cheese', 'Swish it around', 'Bake for 15 minutes at 350 degrees']
            }
        ],
        searchVal: '',
        selectedRecipes: [],
        recipeDetail: {}
    }

  

    handleChange = (event) => {
        this.setState({ searchVal: event.target.value });
    };

    selectRecipes = (e) => {
        e.preventDefault();
        const recipesFilter = this.state.recipes.filter(receipe => receipe.name.includes(this.state.searchVal));
        this.setState({ selectedRecipes: recipesFilter });
    }

    selectRecipeName = (id) => {
        console.log(id);
        this.setState({ recipeDetail : this.state.recipes.find(recipe => recipe.id === id)})
    }
    render() {
        return (
            <div>
                <Header title="Recipe App" />
                <DirectoryView
                    recipes={this.state.selectedRecipes}
                    searchVal={this.state.searchVal}
                    handleChange={this.handleChange}
                    selectRecipes={this.selectRecipes}
                    clickHandler={this.selectRecipeName}
                />
                <DetailView
                    details={this.state.recipeDetail}
                />
            </div>
        );
    };


}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
