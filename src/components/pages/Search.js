import React, {Component} from 'react';
import '../../App.css';

class Search extends Component{

    constructor(){
        super();
        this.state = {
          pictures: [],
          indexValue:0,
          textInput: 'cat'
        };
      }

    componentDidMount(){
        this.ReloadImages();
    }
    
    ReloadImages = () => {
        fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=72d391550512ce66a4831888a4169a02&tags='+this.state.textInput+'&per_page=10&page=1&format=json&nojsoncallback=true')
        .then(function(response){
            return response.json();
        })
        .then(function(j){
            let picArray = j.photos.photo.map((pic) => {
                var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
                return(
                    <img alt="dogs" src={srcPath}></img>
                  )
            })
            this.setState({pictures: picArray});
        }.bind(this))
    }

    NextHandler = () => {
        var currentIndex = this.state.indexValue;
        if(currentIndex === 9){
            currentIndex = 0;
        }
        else{
            currentIndex++;
        }
        this.setState({indexValue: currentIndex});
    }

    PrevHandler = () => {
        var currentIndex = this.state.indexValue;
        if(currentIndex === 0){
            currentIndex = 9;
        }
        else{
            currentIndex--;
        }
        this.setState({indexValue: currentIndex});
    }

    HandleChange = (e) => {
        this.setState({textInput: e.target.value});
    }

    Delay = (function(){
        var timer = 0;
        return function(callback, ms){
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        }
    })();

    render(){
        return (
            <div className='Search'>
                
                <div className='SearchText'>
                    Picture # {this.state.indexValue+1}
                </div>
                
                {this.state.pictures[this.state.indexValue]}
                
                <p>
                    <input className='textInut' onChange={this.HandleChange} onKeyUp={() => this.Delay(function(){
                        this.ReloadImages();
                    }.bind(this), 1000)}>

                    </input>
                </p>
                <div>
                    <button onClick={this.PrevHandler}>Prev</button>&nbsp;
                    <button onClick={this.NextHandler}>Next</button>
                </div>
            </div>
        )
    }
}


export default Search;