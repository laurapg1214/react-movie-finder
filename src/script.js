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
    event.preventDefault(); // for now
  }

  render() {
    const { searchTerm, results } = this.state; //ES6 destructuring

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form onSubmt={this.handleSubmit} className="form-inline my-4">
              <input type="text" className="form-control mr-sm-2" placeholder="frozen" value={searchTerm} onChange={this.handleChange} />
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {results.map((movie) => {
              return null; // for now
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