import React from 'react';
import './style.css';

const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

class App extends React.Component {
   state = { 
   quotes: [
     {
     quote: "Life isn't about getting and having, it's about giving and being.",
     author: "Kevin Kruse"
     }
   ],
   index: 0
  }
  
  componentDidMount() {
    fetch(API).then(res => res.json())
    .then(res => {
      this.setState({
        quotes: res.quotes
      }, this.getRandomIndex);
    });
  }
  
  getRandomIndex = () => {
    const {quotes} = this.state;
    
    if(quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index
      })
    }
  }
 
  render () {
    const { quotes, index } = this.state;
    const quote = quotes[index];
    const tweetURL = `https://twitter.com/intent/tweet?text=${quote.quote} - ${quote.author}`;
    
    return (
      <div className="wrapper d-flex justify-content-center align-items-center">
        <div className="col-md-6 box rounded-lg p-4 m-4" id="quote-box">
          {
            quote && (
              <div>
                <p id="text"><i className="fas fa-quote-left  pr-2"></i>{quote.quote}</p>
                <cite className='d-block text-right pb-4 pr-2' id="author">- {quote.author}</cite>
              </div>
            )
          }
              <div className='d-flex justify-content-between'>
                <a className='btn btn-primary' id="tweet-quote" target='_blank' href={tweetURL}><i className="fab fa-twitter pr-2"></i>Tweet</a>
                <button className='btn btn-primary' onClick={this.getRandomIndex} id="new-quote">New Quote</button>
              </div>
        </div>
      </div>
    )
  }
}

export default App;
