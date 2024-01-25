const Movie = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie; // ES6 destructuring

  return (
    <div className="row">
      <div className="col-4 col-md-3 mb-3">
        <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank"> 
          <img src={Poster} className="img-fluid" />
        </a>
      </div>
      <div className="col-8 col-md-9 mb-3">
        <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank">
          <h4>{Title}</h4>
          <p>{Type} | {Year}</p>
        </a>
      </div>
    </div>
  )
}

class MovieFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault(); 
    let { searchTerm } = this.state; // ES6 destructuring
    searchTerm = searchTerm.trim(); // clean the string
    if (!searchTerm) { // make sure the value isn't an empty string
      return; // early return
    }

    // make the AJAX request to OMDBAPI to get list of results
    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=a7166dbe`).then((response) => {
      if (response.ok) {
        // .ok checks response 200-299
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then((data) => {
      // store the array of movie objects in the component state
      this.setState({ results: data.Search });
    }).catch((error) => {
      console.log(error);
    })
  }

  render() {
    const { searchTerm, results } = this.state; // ES6 destructuring

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.handleSubmit} className="form-inline my-4">
              <input 
                type="text" 
                className="form-control mr-sm-2" 
                placeholder="frozen" 
                value={searchTerm} 
                onChange={this.handleChange} 
              />
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {results.map((movie) => {
              return <Movie key={movie.imdbID} movie={movie} />; // returns Movie component for each movie in the .map() method
            })}
          </div>
        </div>
      </div>
    )
  }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MovieFinder />);