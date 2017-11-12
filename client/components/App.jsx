import React from 'react'
import ReactDOM from 'react-dom'
import '../css/styles.css'
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
    };

    this.searchEbay = this.searchEbay.bind(this);
  }

  componentDidMount() {
    this.searchEbay('Macbook');
  }

  searchEbay(keyword) {
    axios.get('/searchEbay', {
      params: {
        keyword: keyword
      }
    })
    .then((response) => {
      console.log(response.data.findItemsByKeywordsResponse[0].searchResult[0].item);
    })
  }

  render() {
    return ( <h1>Hello World Deploy!</h1>)
  }
}
export default App