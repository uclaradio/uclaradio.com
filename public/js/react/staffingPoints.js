"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var NameFilter = React.createClass({
	displayName: "NameFilter",

	updateFilterName: function updateFilterName() {
		this.props.handleFilterChange({
			nameFilter: this.refs.nameFilterInput.value
		});
	},

	render: function render() {
		return React.createElement(
			"div",
			{ className: "form-group" },
			React.createElement(
				"h3",
				null,
				"Name"
			),
			React.createElement("input", {
				type: "text",
				name: "fullName",
				defaultValue: this.props.nameFilter,
				className: "form-control",
				onChange: this.updateFilterName,
				ref: "nameFilterInput"
			})
		);
	}
});

var DateFilter = React.createClass({
	displayName: "DateFilter",


	updateFilterDate: function updateFilterDate() {
		this.props.handleFilterChange({
			beginDateFilter: new Date(this.refs.beginDateInput.value.replace(/-/g, '/')),
			endDateFilter: new Date(this.refs.endDateInput.value.replace(/-/g, '/'))
		});
	},

	convertDateToHTMLFormat: function convertDateToHTMLFormat(date) {
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		month = month + "";

		if (month.length === 1) month = "0" + month;

		var day = date.getDate() + "";

		if (day.length === 1) day = "0" + day + "";

		return year + "-" + month + "-" + day;
	},

	render: function render() {
		return React.createElement(
			"div",
			{ className: "form-group" },
			React.createElement(
				"h3",
				null,
				"Date"
			),
			React.createElement("input", {
				type: "date",
				name: "beginDate",
				defaultValue: this.convertDateToHTMLFormat(this.props.beginDate),
				className: "form-control",
				onChange: this.updateFilterDate,
				ref: "beginDateInput"
			}),
			React.createElement("input", {
				type: "date",
				name: "endDate",
				defaultValue: this.convertDateToHTMLFormat(this.props.endDate),
				className: "form-control",
				onChange: this.updateFilterDate,
				ref: "endDateInput"
			})
		);
	}
});

var StatusFilter = React.createClass({
	displayName: "StatusFilter",

	updateFilterStatus: function updateFilterStatus() {
		this.props.handleFilterChange({
			statusFilter: this.refs.statusInput.value
		});
	},

	render: function render() {
		return React.createElement(
			"div",
			{ className: "form-group" },
			React.createElement(
				"h3",
				null,
				"Point Status"
			),
			React.createElement(
				"select",
				{
					name: "point_status",
					className: "form-control",
					defaultValue: "all",
					onChange: this.updateFilterStatus,
					ref: "statusInput"
				},
				React.createElement(
					"option",
					{ value: "all" },
					"Any"
				),
				React.createElement(
					"option",
					{ value: "pending" },
					"Pending"
				),
				React.createElement(
					"option",
					{ value: "approved" },
					"Approved"
				),
				React.createElement(
					"option",
					{ value: "denied" },
					"Denied"
				),
				React.createElement(
					"option",
					{ value: "canceled" },
					"Canceled"
				)
			)
		);
	}
});

var DepartmentFilter = React.createClass({
	displayName: "DepartmentFilter",

	updateFilterDepartment: function updateFilterDepartment() {
		this.props.handleFilterChange({
			departmentFilter: this.refs.departmentInput.value
		});
	},

	render: function render() {
		return React.createElement(
			"div",
			{ className: "form-group" },
			React.createElement(
				"h3",
				null,
				"Department"
			),
			React.createElement(
				"select",
				{
					name: "department",
					className: "form-control",
					defaultValue: "all",
					onChange: this.updateFilterDepartment,
					ref: "departmentInput"
				},
				React.createElement(
					"option",
					{ value: "all" },
					"All"
				),
				React.createElement(
					"option",
					{ value: "artanddesign" },
					"Art & Design"
				),
				React.createElement(
					"option",
					{ value: "digitalpress" },
					"Digital Press "
				),
				React.createElement(
					"option",
					{ value: "comedy" },
					"Comedy"
				),
				React.createElement(
					"option",
					{ value: "events" },
					"Events"
				),
				React.createElement(
					"option",
					{ value: "fundraising" },
					"Fundraising"
				),
				React.createElement(
					"option",
					{ value: "marketing" },
					"Marketing"
				),
				React.createElement(
					"option",
					{ value: "music" },
					"Music"
				),
				React.createElement(
					"option",
					{ value: "news" },
					"News "
				),
				React.createElement(
					"option",
					{ value: "photo" },
					"Photo/Video"
				),
				React.createElement(
					"option",
					{ value: "productions" },
					"Productions"
				),
				React.createElement(
					"option",
					{ value: "programming" },
					"Programming"
				),
				React.createElement(
					"option",
					{ value: "promotions" },
					"Promotions"
				),
				React.createElement(
					"option",
					{ value: "sports" },
					"Sports"
				),
				React.createElement(
					"option",
					{ value: "web" },
					"Web"
				),
				React.createElement(
					"option",
					{ value: "interns" },
					"Interns"
				)
			)
		);
	}
});

var StaffingPointsRow = React.createClass({
	displayName: "StaffingPointsRow",

	updateStatus: function updateStatus(status) {
		var userId = this.props.record._id;
		var password = this.props.password;
		var managerNotes = this.refs.managerNotes.value;
		var ajaxUpdateStatus = this.props.ajaxUpdateStatus;
		$.post('view/update', {
			userId: userId,
			status: status,
			managerNotes: managerNotes,
			password: password
		}, function (data) {
			ajaxUpdateStatus(data, status, userId);
		});
	},

	render: function render() {
		return React.createElement(
			"tr",
			null,
			React.createElement(
				"td",
				null,
				this.props.record.fullName
			),
			React.createElement(
				"td",
				null,
				this.props.record.number
			),
			React.createElement(
				"td",
				null,
				this.props.record.description
			),
			React.createElement(
				"td",
				null,
				this.props.record.department
			),
			React.createElement(
				"td",
				null,
				this.props.record.dateCompleted.toDateString()
			),
			React.createElement(
				"td",
				null,
				this.props.record.notes
			),
			React.createElement(
				"td",
				null,
				this.props.record.status
			),
			React.createElement(
				"td",
				{ onClick: this.updateStatus.bind(null, 'approved') },
				React.createElement(
					"button",
					null,
					"Approve"
				)
			),
			React.createElement(
				"td",
				{ onClick: this.updateStatus.bind(null, 'denied') },
				React.createElement(
					"button",
					null,
					"Deny"
				)
			),
			React.createElement(
				"td",
				null,
				React.createElement("textarea", { ref: "managerNotes", defaultValue: this.props.record.managerNotes })
			)
		);
	}
});

var StaffingPointsTable = React.createClass({
	displayName: "StaffingPointsTable",


	render: function render() {
		var records = this.props.records.filter(function (record) {
			var nameMatch = record.fullName.toUpperCase().indexOf(this.props.nameFilter.toUpperCase()) !== -1;
			var departmentMatch;
			if (this.props.departmentFilter === 'all') departmentMatch = true;else departmentMatch = record.department.toUpperCase() === this.props.departmentFilter.toUpperCase();

			var statusMatch;
			if (this.props.statusFilter === 'all') statusMatch = true;else statusMatch = record.status.toUpperCase() === this.props.statusFilter.toUpperCase();

			var afterBeginDateMatch = record.dateCompleted > this.props.beginDateFilter;
			var beforeEndDateMatch = record.dateCompleted < this.props.endDateFilter;

			return statusMatch && departmentMatch && nameMatch && afterBeginDateMatch && beforeEndDateMatch;
		}, this);

		var rows = records.map(function (record) {
			return React.createElement(StaffingPointsRow, { key: record._id, record: record, password: this.props.password, ajaxUpdateStatus: this.props.updateStatus });
		}, this);

		return React.createElement(
			"table",
			null,
			React.createElement(
				"thead",
				null,
				React.createElement(
					"tr",
					null,
					React.createElement(
						"th",
						null,
						"Full Name"
					),
					React.createElement(
						"th",
						null,
						"Points"
					),
					React.createElement(
						"th",
						null,
						"Description"
					),
					React.createElement(
						"th",
						null,
						"Department"
					),
					React.createElement(
						"th",
						null,
						"Completion Date"
					),
					React.createElement(
						"th",
						null,
						"Notes"
					),
					React.createElement(
						"th",
						null,
						"Status"
					),
					React.createElement(
						"th",
						null,
						"Approve"
					),
					React.createElement(
						"th",
						null,
						"Deny"
					),
					React.createElement(
						"th",
						null,
						"Manager Notes"
					)
				)
			),
			React.createElement(
				"tbody",
				null,
				rows
			)
		);
	}
});

var StaffingPointsView = React.createClass({
	displayName: "StaffingPointsView",


	getInitialState: function getInitialState() {
		return {
			nameFilter: "",
			departmentFilter: "all",
			statusFilter: "all",
			beginDateFilter: new Date('January 1, 2016'),
			endDateFilter: new Date(),
			password: '',
			statusMessage: '',
			records: []
		};
	},

	componentDidMount: function componentDidMount() {
		var component = this;
		$.get('points', function (data) {
			data.forEach(function (val) {
				val.dateCompleted = new Date(val.dateCompleted);
			});
			component.setState({
				records: data
			});
		});
	},

	updatePassword: function updatePassword() {
		this.setState({
			password: this.refs.passwordInput.value
		});
	},

	updateStatus: function updateStatus(statusMessage, newStatus, id) {
		if (statusMessage !== 'incorrect password') {
			var recordToUpdateIndex = -1;

			for (var x = 0; x < this.state.records.length; x++) {
				if (this.state.records[x]._id === id) recordToUpdateIndex = x;
			}

			var recordToUpdate = this.state.records[recordToUpdateIndex];

			var newRecord = JSON.parse(JSON.stringify(recordToUpdate));

			newRecord.dateCompleted = new Date(newRecord.dateCompleted);

			newRecord.status = newStatus;

			var records = [].concat(_toConsumableArray(this.state.records.slice(0, recordToUpdateIndex)), [newRecord], _toConsumableArray(this.state.records.slice(recordToUpdateIndex + 1, this.state.records.length)));
		} else var records = this.state.records;

		this.setState({
			records: records,
			statusMessage: statusMessage
		});
	},

	handleFilterChange: function handleFilterChange(newFilterObj) {
		this.setState(newFilterObj);
	},

	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h1",
				{ id: "header" },
				"Staffing Points"
			),
			React.createElement(
				"h4",
				null,
				this.state.statusMessage
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "col-md-4 col-md-offset-8 " },
					React.createElement(
						"div",
						{ className: "form-group" },
						React.createElement(
							"h3",
							null,
							"Super Secret Password"
						),
						React.createElement("input", { type: "password", name: "password", className: "form-control", onChange: this.updatePassword, ref: "passwordInput" })
					)
				)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "col-md-3" },
					React.createElement(NameFilter, { filterName: this.state.nameFilter, handleFilterChange: this.handleFilterChange })
				),
				React.createElement(
					"div",
					{ className: "col-md-3" },
					React.createElement(DateFilter, { beginDate: this.state.beginDateFilter, endDate: this.state.endDateFilter, handleFilterChange: this.handleFilterChange })
				),
				React.createElement(
					"div",
					{ className: "col-md-3" },
					React.createElement(StatusFilter, { handleFilterChange: this.handleFilterChange })
				),
				React.createElement(
					"div",
					{ className: "col-md-3" },
					React.createElement(DepartmentFilter, { handleFilterChange: this.handleFilterChange })
				)
			),
			React.createElement(StaffingPointsTable, {
				records: this.state.records,
				nameFilter: this.state.nameFilter,
				departmentFilter: this.state.departmentFilter,
				statusFilter: this.state.statusFilter,
				beginDateFilter: this.state.beginDateFilter,
				endDateFilter: this.state.endDateFilter,
				password: this.state.password,
				updateStatus: this.updateStatus
			})
		);
	}
});

ReactDOM.render(React.createElement(StaffingPointsView, null), document.getElementById('container'));