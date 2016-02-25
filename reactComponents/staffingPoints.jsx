var NameFilter = React.createClass({
	updateFilterName: function() {
		this.props.handleFilterChange({
			nameFilter: this.refs.nameFilterInput.value
		});
	},

	render: function() {
		return (
			<div className="form-group">
				<h3>Name</h3>
				<input
					type="text"
					name="fullName"
					defaultValue={this.props.nameFilter}
					className="form-control"
					onChange={this.updateFilterName}
					ref="nameFilterInput"
				/>
			</div>
		);
	}
});

var DateFilter = React.createClass({

	updateFilterDate: function() {
		this.props.handleFilterChange({
			beginDateFilter: new Date(this.refs.beginDateInput.value.replace(/-/g, '/')),
			endDateFilter: new Date(this.refs.endDateInput.value.replace(/-/g, '/')),
		});
	},

	convertDateToHTMLFormat: (date) => {
		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		month = month + "";

		if (month.length === 1)
			month = "0" + month;

		let day = date.getDate() + "";

		if (day.length === 1)
			day = "0" + day + "";
		
		return year + "-" + month + "-" + day;
	},

	render: function() {
		return (
			<div className="form-group">
				<h3>Date</h3>
				<input
					type="date" 
					name="beginDate"
					defaultValue={this.convertDateToHTMLFormat(this.props.beginDate)}
					className="form-control"
					onChange={this.updateFilterDate}
					ref="beginDateInput"
				/>
				<input
					type="date"
					name="endDate"
					defaultValue={this.convertDateToHTMLFormat(this.props.endDate)}
					className="form-control"
					onChange={this.updateFilterDate}
					ref="endDateInput"
				/>
			</div>
		);
	}
});

var StatusFilter = React.createClass({
	updateFilterStatus: function() {
		this.props.handleFilterChange({
			statusFilter: this.refs.statusInput.value
		});
	},

	render: function() {
		return (
			<div className="form-group">
				<h3>Point Status</h3>
				<select
					name="point_status"
					className="form-control"
					defaultValue="all"
					onChange={this.updateFilterStatus}
					ref="statusInput"
				>
					<option value="all">Any</option>
					<option value="pending">Pending</option>
					<option value="approved">Approved</option>
					<option value="denied">Denied</option>
					<option value="canceled">Canceled</option>
				</select>
			</div>
		);
	}
});

var DepartmentFilter = React.createClass({
	updateFilterDepartment: function() {
		this.props.handleFilterChange({
			departmentFilter: this.refs.departmentInput.value
		});
	},

	render: function() {
		return (
			<div className="form-group">
				<h3>Department</h3>
				<select
					name="department"
					className="form-control"
					defaultValue="all"
					onChange={this.updateFilterDepartment}
					ref="departmentInput"
				>
					<option value="all">All</option>
					<option value="artanddesign">Art & Design</option>
					<option value="digitalpress">Digital Press </option>
					<option value="comedy">Comedy</option>
					<option value="events">Events</option>
					<option value="fundraising">Fundraising</option>
					<option value="marketing">Marketing</option>
					<option value="music">Music</option>
					<option value="news">News </option>
					<option value="photo">Photo/Video</option>
					<option value="productions">Productions</option>
					<option value="programming">Programming</option>
					<option value="promotions">Promotions</option>
					<option value="sports">Sports</option>
					<option value="web">Web</option>
					<option value="interns">Interns</option>
				</select>
			</div>
		);
	}
});

var StaffingPointsRow = React.createClass({
	render: function() {
		return (
			<tr>
				<td>
					{this.props.record.fullName}
				</td>
				<td>
					{this.props.record.number}
				</td>
				<td>
					{this.props.record.description}
				</td>
				<td>
					{this.props.record.department}
				</td>
				<td>
					{this.props.record.dateCompleted.toDateString()}
				</td>
				<td>
					{this.props.record.notes}
				</td>
				<td>
					{this.props.status}
				</td>
				<td>
					<button></button>
				</td>
				<td>
					<textarea>
						{this.props.record.managerNotes}
					</textarea>
				</td>
			</tr>
		);
	}
});

var StaffingPointsTable = React.createClass({

	
	render: function() {

		var records = this.props.records
			.filter(function(record) {
				var nameMatch = record.fullName.indexOf(this.props.nameFilter) !== -1;
				var departmentMatch; 
				if (this.props.departmentFilter === 'all')
					departmentMatch = true;
				else
					departmentMatch = record.department.toUpperCase() === this.props.departmentFilter.toUpperCase();

				var statusMatch;
				if (this.props.statusFilter === 'all')
					statusMatch = true;
				else 
					statusMatch = record.status.toUpperCase() === this.props.statusFilter.toUpperCase();

				var afterBeginDateMatch = record.dateCompleted > this.props.beginDateFilter;
				var beforeEndDateMatch = record.dateCompleted < this.props.endDateFilter;

				return statusMatch && departmentMatch && nameMatch && afterBeginDateMatch && beforeEndDateMatch;
			}, this)

		var rows = records.map( function(record, index) {
			return (
				<StaffingPointsRow key={index} record={record}/>
			);
		});

		return (
			<table>
				<thead>
					<tr>
						<th>
							Full Name
						</th>
						<th>
							Points
						</th>
						<th>
							Description
						</th>
						<th>
							Department
						</th>
						<th>
							Completion Date
						</th>
						<th>
							Notes
						</th>
						<th>
							Status
						</th>
						<th>
							Approve
						</th>
						<th>
							Manager Notes
						</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
});

var StaffingPointsView = React.createClass({

	getInitialState: function() {
		return {
			nameFilter: "",
			departmentFilter: "all",
			statusFilter: "all",
			beginDateFilter: new Date('January 1, 2016'),
			endDateFilter: new Date()
		};
	},

	handleFilterChange: function( newFilterObj ) {
		this.setState(newFilterObj);
	},

	render: function() {
		return (
			<div>
				<h1 id="header">Staffing Points</h1>
				<div className="row">
					<div className="col-md-4 col-md-offset-8 ">
						<div className="form-group">
							<h3>Super Secret Password</h3>
							<input type="password" name="password" className="form-control" />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-3">
						<NameFilter filterName={'hi'} handleFilterChange={this.handleFilterChange} />
					</div>
					<div className="col-md-3">
						<DateFilter beginDate={this.state.beginDateFilter} endDate={this.state.endDateFilter} handleFilterChange={this.handleFilterChange} />
					</div>
					<div className="col-md-3">
					<StatusFilter handleFilterChange={this.handleFilterChange} />
					</div>
					<div className="col-md-3">
					<DepartmentFilter handleFilterChange={this.handleFilterChange} />
					</div>
				</div>
				<StaffingPointsTable 
					records={this.props.data}
					nameFilter={this.state.nameFilter}
					departmentFilter={this.state.departmentFilter}
					statusFilter={this.state.statusFilter}
					beginDateFilter={this.state.beginDateFilter}
					endDateFilter={this.state.endDateFilter}
				/>
			</div>
		);
	}
});

$.get('points', function( data ) {
	//data = [{fullName: 'Matteo', number: 5, description: 'description', department: 'web', dateCompleted: new Date(), notes: 'notes'}];
	data.forEach( function(val) {
		val.dateCompleted = new Date(val.dateCompleted);
	});
	//console.log(data);
	ReactDOM.render(
		<StaffingPointsView data={data}/>,
		document.getElementById('container')
	);
});

