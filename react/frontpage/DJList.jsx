// DJList.jsx
var React = require('react');
var DJInfo = require('./DJInfo.jsx');

var DJList = React.createClass({
    render: function() {
        var djs = this.props.djs.map(function(dj){
            return <DJInfo name={dj.djName ? dj.djName : dj.fullName} picture={dj.picture} />
        });

        return (
            <div className='dj-list'>
            {djs}
            </div>
        );
    } 
});

module.exports = DJList;
