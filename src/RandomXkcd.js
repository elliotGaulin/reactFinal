import React from 'react';
import axios from 'axios';
class RandomXkcd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            xkcd: []
        }
    }

    componentDidMount() {
        this.getXkcd();
    }

    getXkcd(){

        let xkcdNumber = Math.floor(Math.random() * 2500);
        //get xkcd through axios
        axios.get(`https://getxkcd.vercel.app/api/comic?num=${xkcdNumber}`)
        .then(response => {
            this.setState({
                xkcd: response.data
            })
        })
    }

    render() {
      return (
        <div>
        
        <h2>#{this.state.xkcd.num}: {this.state.xkcd.title}</h2>
        <img src={this.state.xkcd.img} alt={this.state.xkcd.alt}/>
        </div>
      )  
    }
}

export default (RandomXkcd);