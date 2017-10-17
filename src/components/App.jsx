import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/profile.jsx';
import Search from './github/Search.jsx';

class App extends Component{

	constructor(props){
		super(props);
		this.state = {
			username: "zohaib10",
			userData: [],
			userRepos: [],
			perPage: 10
		}
	}

	//Get user data from github
	getUserData(){
		$.ajax({
			url: 'https://api.github.com/users/'+this.state.username+ '?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({userData: data});
			}.bind(this),
			error: function(xhr,status,err){
				this.setState({userName: null});
				alert(err);
			}.bind(this)
		});
	}

	handleFormSubmit(username){
		this.setState({username: username}, function(){
			this.getUserData();
			this.getUserRepos();
		});
	}

	//Get user Repos
	getUserRepos(){
		$.ajax({
			url: 'https://api.github.com/users/'+ this.state.username + '/repos?per_page='+ this.state.perPage +'&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'&sort=created',
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({userRepos: data});
			}.bind(this),
			error: function(xhr,status,err){
				this.setState({userName: null});
				alert(err);
			}.bind(this)
		});
	}

	componentDidMount(){
		this.getUserData();
		this.getUserRepos();
	}
	render(){
		return(
			<div>
				<Search onFormSubmit = {this.handleFormSubmit.bind(this)}/>
				<Profile {...this.state}/>				
			</div>
		)
	}
}

App.propTypes = {
	clientId: React.PropTypes.string,
	clientSecret: React.PropTypes.string
};
App.defaultProps = {
	clientId: '3199508645b1ac1a566e',
	clientSecret: '2774d657fde9980e7c6a1ffaac27edbc978383f7'
}

export default App