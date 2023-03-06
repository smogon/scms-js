/* /articles/articles-index.js 
 * By Quarkz (http://www.smogon.com/forums/members/quarkz.206020/)
 */

const defaultTagOption = 'All Tags';

var TagOption = React.createClass({
	getInitialProps: function () {
		return {
			name: '',
			currentTag: ''
		};
	},
	
	render: function () {
		return (
			<option>{this.props.name}</option>
		);
	}
});

var TagSelect = React.createClass({
	getInitialProps: function () {
		return {
			tags: []
		};
	},
	
	handleChange: function (event) {
		var options = event.target.options;
		for (var i = 0; i < options.length; i++) {
			if (options[i].selected) {
				this.props.setFilterTag(options[i].value);
			}
		}
	},
	
	render: function () {
		var tagsList = [];
		var tags = this.props.tags;
		
		tagsList.push(<TagOption name={defaultTagOption} />);
		
		for (var i = 0; i < tags.length; i++) {
			tagsList.push(<TagOption name={tags[i]} />);
		}
		
		return (
			<select onChange={this.handleChange} value={this.props.currentTag} id="tagSelect">
				{tagsList}
			</select>
		);
	}
});

var SearchBox = React.createClass({
	handleChange: function (e) {
		this.props.setFilterTitle(e.target.value)
	},
	
	render: function () {
		return (
			<input id="searchBar" type="text" onChange={this.handleChange} />
		);
	}
});

var ArticleContributor = React.createClass({
	getInitialProps: function () {
		return {
			id: NaN,
			name: '',
			type: ''
		};
	},
	
	render: function () {
		var hoverText = '';
		
		switch (this.props.type) {
			case 'authors':
				hoverText = 'Produced the article'
				break;
			case 'artists':
				hoverText = 'Created the art'
				break;
			case 'gpers':
				hoverText = 'Checked the grammar'
				break;
			case 'coders':
				hoverText = 'Wrote the code'
				break;
			default:
				hoverText = 'idk'
		}
		
		// CREDITS EASTER EGG
		if (this.props.id === 206020 || this.props.id === 222754) {
			hoverText = 'Is awesome';
		}
		
		return (
			<li>
				<a className={this.props.type === 'authors' ? 'article-author contributor' : 'contributor'} href={'/forums/members/' + this.props.id} title={hoverText}>{this.props.name}</a>
			</li>
		);
	}
});

var ArticleTag = React.createClass({
	getInitialProps: function () {
		return {
			name: '',
			setFilterTag: function () {return false;}
		};
	},
	
	handleClick: function () {
		this.props.setFilterTag(this.props.name);
	},
	
	render: function () {
		return (
			<li onClick={this.handleClick} className="articleTag" title={'Filter by tag: ' + this.props.name}>
				{this.props.name}
			</li>
		);
	}
});

var ArticleRow = React.createClass({
	getInitialProps: function () {
		return {
			title: '',
			tags: '',
			pubdate: '',
			contributors: {
				authors: [],
				artists: [],
				gpers: [],
				coders: []
			},
			ref: ''
		};
	},
	
	render: function () {
		var contributors = [];
		var uglyContributors = this.props.data.contributors;
			
		for (var type in uglyContributors) {
			if (uglyContributors.hasOwnProperty(type)) {
				for (var i = 0; i < uglyContributors[type].length; i++) {
					var contributor = uglyContributors[type][i];
					contributors.push(
						<ArticleContributor id={contributor.id} name={contributor.name} type={type} />
					);
					contributors.push(' | ');
				}
			}
		}
		contributors.pop();
		
		var tags = [];
		var uglyTags = this.props.data.tags;
			
		for (var tag in uglyTags) {
			tags.push(<ArticleTag name={uglyTags[tag]} setFilterTag={this.props.setFilterTag} />)
			tags.push(' | ');
		}
		tags.pop();
		
		return (
			<tr>
				<td>
					<a href={'/articles/' + this.props.data.ref} title="Read the article!">
						{this.props.data.title}
					</a>
				</td>
				<td>{new Date(this.props.data.pubdate).toDateString()}</td>
				<td>
					<ul>{tags}</ul>
				</td>
				<td>
					<ul>{contributors}</ul>
				</td>
			</tr>
		);
	}
});

var ArticleList = React.createClass({
	getInitialProps: function () {
		return {
			articles: [],
			filterTag: ''
		};
	},
	
	checkFilters: function (searchTag, tags, searchTitle, title) {
		
		for (var i = 0; i < tags.length; i++) {
			if ((tags[i] === searchTag || searchTag === '') && title.toLowerCase().indexOf(searchTitle.toLowerCase()) >= 0) {
				return true;
			}
		}
		
		return false;
	},
	
	render: function() {
		var content = this.props.articles.map(function(a){
			var show = this.checkFilters(this.props.filterTag, a.tags, this.props.filterTitle, a.title);
			return show ? <ArticleRow data={a} setFilterTag={this.props.setFilterTag} /> : null;
		}.bind(this));
		return <tbody>{content.reverse()}</tbody>;
	}
});

var ArticleIndex = React.createClass({
	getInitialState: function () {
		return {
			articles: [],
			tags: [],
			filterTag: '',
			filterTitle: '',
		};
	},
	
	componentDidMount: function () {
		$.get('data/articles.json', function (res) {
			if (this.isMounted()) {
				this.setState({
					articles: res
				});
			}
		}.bind(this));
		
		$.get('data/tags.json', function (res) {
			if (this.isMounted()) {
				this.setState({
					tags: res
				});
			}
		}.bind(this));
	},
	
	setFilterTag: function (optionVal) {
		this.setState({
			filterTag: optionVal === defaultTagOption ? '' : optionVal
		});
	},
	
	setFilterTitle: function (newTitle) {
		this.setState({
			filterTitle: newTitle
		});
	},
	
	render: function () {
		return (
			<span>
				<div id={'filterbar'}>
					<TagSelect tags={this.state.tags} setFilterTag={this.setFilterTag} currentTag={this.state.filterTag} />
					
					<div id="bar">
						<SearchBox setFilterTitle={this.setFilterTitle} />
					</div>
				</div>
			
				<table>
					<thead>
						<tr>
							<th id="titleHead">Title</th>
							<th id="pubdateHead">Publication date</th>
							<th id="tagsHead">Tags</th>
							<th id="contribsHead">Contributors</th>
						</tr>
					</thead>
					
					<ArticleList articles={this.state.articles} setFilterTag={this.setFilterTag} filterTag={this.state.filterTag} filterTitle={this.state.filterTitle} />
				</table>
			</span>
		);
	}
});

React.render(
	<ArticleIndex />,
	document.getElementById('articleIndex')
);