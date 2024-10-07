/* /articles/articles-index.js
 * By Quite Quiet http://www.smogon.com/forums/members/196780/
 */

'use strict';

// Polyfill for String.startsWith
Object.defineProperty(String.prototype, 'startsWith', {
    value: function(search, pos) {
        return this.substring(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
});

// Because IE support is fun, prototypes!
var ArticleIndexRow = function(title, date, tags, contributors, ref) {
    this.title = title;
    this.pubdate = date;
    this.tags = tags;
    this.contributors = contributors;
    this.ref = ref;
};

ArticleIndexRow.prototype.getRowHtml = function(visibleContributors) {
    var html = '<tr>';
    html += '<td><a href="/articles/' + this.ref + '" title="Read the article!">' + this.title + '</a></td>';
    html += '<td>' + moment(this.pubdate).format('ddd MMM Do YYYY') + '</td>';
    html += '<td><ul>';
    var htmlTags = [];
    for (var i = 0; i < this.tags.length; i++) {
        htmlTags.push('<li class="articleTag" title="Filter by tag: ' + this.tags[i] + '">' + this.tags[i] + '</li>');
    }
    html += htmlTags.join('<span> | </span>');
    html += '</ul></td><td><ul>';
    var contributorsHtml = [];
    var authors = 0;
    if (this.contributors.authors) {
        authors = this.contributors.authors.length;
        for (var i = 0; i < this.contributors.authors.length; i++) {
            var author = this.contributors.authors[i];
            contributorsHtml.push('<li><a class="article-author contributor" href="/forums/members/' + author.id + '" title="Produced the article">' + author.name + '</a></li>');
        }
    }
    if (this.contributors.artists) {
        for (var i = 0; i < this.contributors.artists.length; i++) {
            var artist = this.contributors.artists[i];
            contributorsHtml.push('<li><a class="contributor" href="/forums/members/' + artist.id + '" title="Created the art">' + artist.name + '</a></li>');
        }
    }
    if (this.contributors.gpers) {
        for (var i = 0; i < this.contributors.gpers.length; i++) {
            var gper = this.contributors.gpers[i];
            contributorsHtml.push('<li><a class="contributor" href="/forums/members/' + gper.id + '" title="Checked the grammar">' + gper.name + '</a></li>');
        }
    }
    if (this.contributors.coders) {
        for (var i = 0; i < this.contributors.coders.length; i++) {
            var coder = this.contributors.coders[i];
            contributorsHtml.push('<li><a class="contributor" href="/forums/members/' + coder.id + '" title="Wrote the code">' + coder.name + '</a></li>');
        }
    }
    if (this.contributors.qcers) {
        for (var i = 0; i < this.contributors.qcers.length; i++) {
            var qcer = this.contributors.qcers[i];
            contributorsHtml.push('<li><a class="contributor" href="/forums/members/' + qcer.id + '" title="Checked the content">' + qcer.name + '</a></li>');
        }
    }

    // Limit the number of displayed if there's many of them
    var visible = Math.max(visibleContributors, authors);
    if (contributorsHtml.length > visible + 1) {
        contributorsHtml.push('<li class="moreContributors" title="Show more contributors!" data-visible="' + visible + '">&raquo; Expand</li>');
    }

    html += contributorsHtml.join('<span> | </span>');
    html += '</ul></td></tr>';
    return html;
};

var ArticleIndex = function (data, config, year) {
    this.firstYear = data[0].pubdate.substring(0, 4);
    this.currentYear = data[data.length - 1].pubdate.substring(0, 4);
    this.data = data.map(function(a) {
       return new ArticleIndexRow(a.title, a.pubdate, a.tags, a.contributors, a.ref);
    }).reverse();
    this.year = year;
    this.allTags = config.tags;
    this.allTags.unshift('All Tags');
    this.visibleContributors = config.visible_contributors;
    this.articleYearData = this.getYearData(this.year);
    this.searchParams = Object.keys(this.data[0].contributors).map(function (e) {return e.slice(0, -1);});
    this.activeSearch = false;
};

ArticleIndex.prototype.getYearData = function(year) {
    if (!year) year = this.year;
    return this.data.filter(function(article) { return article.pubdate.substring(0, 4) === year; });
};

ArticleIndex.prototype.buildTableFilter = function() {
    var html = '<div id="filterbar"><select id="tagSelect">';
    for (var i = 0; i < this.allTags.length; i++) {
        html += '<option>' + this.allTags[i] + '</option>';
    }
    html += '</select><div id="bar"><input id="searchBar" type="text" /></div></div>';
    return html;
};

ArticleIndex.prototype.buildYearFilter = function() {
    var html = '<ul id="yearSelect">';
    var first = parseInt(this.firstYear);
    var last = parseInt(this.currentYear);
    while (first <= last) {
        html += '<li tabindex="0">' + first + '</li>'; // Make the year index tabable
        first++;
    }
    return html + '</ul>';
};

ArticleIndex.prototype.buildDataIndex = function(indexData) {
    var indexTable = this.buildTableFilter();
    indexTable += this.buildYearFilter();
    indexTable += '<table><tr>';
    indexTable += '<th id="titleHead">Title</th>';
    indexTable += '<th id="pubdateHead">Publication Date</th>';
    indexTable += '<th id="tagsHead">Tags</th>';
    indexTable += '<th id="contribsHead">Contributors</th></tr>';
    for (var i = 0; i < indexData.length; i++) {
        indexTable += indexData[i].getRowHtml(this.visibleContributors);
    }
    indexTable += '</table>';
    return indexTable;
};

ArticleIndex.prototype.buildIndex = function(data) {
    if (!data) data = this.articleYearData;
    $('#articleIndex').html(this.buildDataIndex(data));
    this.addEventHandlers();
    $('#yearSelect li:contains(' + this.year + ')').attr('id', 'current');
}

ArticleIndex.prototype.filterByTag = function(tag) {
    var articles = tag === 'All Tags' ? this.data : this.data.filter(function(article) { return article.tags.indexOf(tag) > -1; });
    this.buildIndex(articles);
};

ArticleIndex.prototype.filterBySearch = function(search) {
    search = search.toLowerCase();
    var articles;
    if (search.length < 2) {
        if (!this.activeSearch) {
            return;
        } else {
            // nothing here means rebuild the current year index
            this.activeSearch = false;
        }
    } else {
        if (this.searchParams.some(function (param) { return search.startsWith(param + ':');})) {
            var colonIndex = search.indexOf(':');
            var param = search.substring(0, colonIndex);
            search = search.substring(colonIndex + 1);
            articles = this.data.filter(function(article) {
                var contributors = article.contributors[param + 's'];
                return contributors && contributors.some(function (author) { return author.name.toLowerCase() === search;});
            });
            this.activeSearch = true;
        } else {
            articles = this.data.filter(function(article) { return article.title.toLowerCase().indexOf(search) > -1; });
            this.activeSearch = true;
        }
    }
    this.buildIndex(articles);
};

ArticleIndex.prototype.addEventHandlers = function() {
    var self = this;
    $('#tagSelect').change(function() {
        var tag = this.value;
        self.filterByTag(this.value);
        $('#tagSelect').val(tag);
    });

    $('.articleTag').click(function() {
        var tag = $(this).text();
        self.filterByTag(tag);
        $('#tagSelect').val(tag);
    });

    $('.moreContributors').each(function() {
        var $this = $(this);
        var visible = $this.data('visible');
        var $contributors = $this.siblings().slice(visible * 2); // li + divider
        $contributors.hide();
        $this.show();
        $this.click(function() {
            $contributors.show();
            $this.hide();
            $this.prev().hide();
        })
    });

    $('#searchBar').on('input textchange propertychange paste', function() {
        var search = $(this).val();
        self.filterBySearch(search);
        $('#searchBar').val(search);
        $('#searchBar').focus();
    });

    $('#yearSelect li').on('click keydown', function(e) {
        if (e.type === 'keydown' && e.which !== 13) return; // Support pressing enter to change year
        var year = $(this).text();
        self.year = year;
        self.buildIndex(self.getYearData(year));
    });
};

function getYear() {
    var y, q = window.location.search.substring(1).split('&');
    for (var i = 0; i < q.length; i++) {
        var p = q[i].split('=');
        if (p[0] === 'y') {
            y = p[1];
        }
    }
    if (!y) {
        y = new Date().getFullYear().toString();
    }
    return y;
}


$(document).ready(function () {
    $.get('data/articles.json', function(data) {
        var config = window.scmsJSON;
        var startTime = performance.now();
        var articleIndex = new ArticleIndex(data, config, getYear());
        articleIndex.buildIndex();
        var endTime = performance.now();
        $('#articleIndexGeneration').html('<p style="font-size: 0.8em;  text-align: center;">Page generated in ' + (endTime - startTime) + ' milliseconds.</p>');
    });
});