// // staffingPoints.js
// // let managers approve staffing points

// import React from 'react';
// import ReactDOM from 'react-dom';

// const NameFilter = React.createClass({
//   updateFilterName() {
//     this.props.handleFilterChange({
//       nameFilteçr: this.refs.nameFilterInput.value,
//     });
//   },

//   render() {
//     return (
//       <div className="form-group">
//         <h3>Name</h3>
//         <input
//           type="text"
//           name="fullName"
//           defaultValue={this.props.nameFilter}
//           className="form-control"
//           onChange={this.updateFilterName}
//           ref="nameFilterInput"
//         />
//       </div>
//     );
//   },
// });

// const DateFilter = React.createClass({
//   updateFilterDate() {
//     this.props.handleFilterChange({
//       beginDateFilter: new Date(
//         this.refs.beginDateInput.value.replace(/-/g, '/')
//       ),
//       endDateFilter: new Date(this.refs.endDateInput.value.replace(/-/g, '/')),
//     });
//   },

//   convertDateToHTMLFormat(date) {
//     const year = date.getFullYear();
//     let month = date.getMonth() + 1;
//     month += '';

//     if (month.length === 1) month = `0${month}`;

//     let day = `${date.getDate()}`;

//     if (day.length === 1) day = `0${day}`;

//     return `${year}-${month}-${day}`;
//   },

//   render() {
//     return (
//       <div className="form-group">
//         <h3>Date</h3>
//         <input
//           type="date"
//           name="beginDate"
//           defaultValue={this.convertDateToHTMLFormat(this.props.beginDate)}
//           className="form-control"
//           onChange={this.updateFilterDate}
//           ref="beginDateInput"
//         />
//         <input
//           type="date"
//           name="endDate"
//           defaultValue={this.convertDateToHTMLFormat(this.props.endDate)}
//           className="form-control"
//           onChange={this.updateFilterDate}
//           ref="endDateInput"
//         />
//       </div>
//     );
//   },
// });

// const StatusFilter = React.createClass({
//   updateFilterStatus() {
//     this.props.handleFilterChange({
//       statusFilter: this.refs.statusInput.value,
//     });
//   },

//   render() {
//     return (
//       <div className="form-group">
//         <h3>Point Status</h3>
//         <select
//           name="point_status"
//           className="form-control"
//           defaultValue="all"
//           onChange={this.updateFilterStatus}
//           ref="statusInput">
//           <option value="all">Any</option>
//           <option value="pending">Pending</option>
//           <option value="approved">Approved</option>
//           <option value="denied">Denied</option>
//           <option value="canceled">Canceled</option>
//         </select>
//       </div>
//     );
//   },
// });

// const DepartmentFilter = React.createClass({
//   updateFilterDepartment() {
//     this.props.handleFilterChange({
//       departmentFilter: this.refs.departmentInput.value,
//     });
//   },

//   render() {
//     return (
//       <div className="form-group">
//         <h3>Department</h3>
//         <select
//           name="department"
//           className="form-control"
//           defaultValue="all"
//           onChange={this.updateFilterDepartment}
//           ref="departmentInput">
//           <option value="all">All</option>
//           <option value="artanddesign">Art & Design</option>
//           <option value="digitalpress">Digital Press </option>
//           <option value="comedy">Comedy</option>
//           <option value="events">Events</option>
//           <option value="fundraising">Fundraising</option>
//           <option value="marketing">Marketing</option>
//           <option value="music">Music</option>
//           <option value="news">News </option>
//           <option value="photo">Photo/Video</option>
//           <option value="productions">Productions</option>
//           <option value="programming">Programming</option>
//           <option value="promotions">Promotions</option>
//           <option value="sports">Sports</option>
//           <option value="web">Web</option>
//           <option value="interns">Interns</option>
//         </select>
//       </div>
//     );
//   },
// });

// const StaffingPointsRow = React.createClass({
//   updateStatus(status) {
//     const userId = this.props.record._id;
//     const password = this.props.password;
//     const managerNotes = this.refs.managerNotes.value;
//     const ajaxUpdateStatus = this.props.ajaxUpdateStatus;
//     $.post(
//       'view/update',
//       {
//         userId,
//         status,
//         managerNotes,
//         password,
//       },
//       data => {
//         ajaxUpdateStatus(data, status, userId);
//       }
//     );
//   },

//   render() {
//     return (
//       <tr>
//         <td>{this.props.record.fullName}</td>
//         <td>{this.props.record.number}</td>
//         <td>{this.props.record.description}</td>
//         <td>{this.props.record.department}</td>
//         <td>{this.props.record.dateCompleted.toDateString()}</td>
//         <td>{this.props.record.notes}</td>
//         <td>{this.props.record.status}</td>
//         <td onClick={this.updateStatus.bind(null, 'approved')}>
//           <button>Approve</button>
//         </td>
//         <td onClick={this.updateStatus.bind(null, 'denied')}>
//           <button>Deny</button>
//         </td>
//         <td>
//           <textarea
//             ref="managerNotes"
//             defaultValue={this.props.record.managerNotes}
//           />
//         </td>
//       </tr>
//     );
//   },
// });

// const StaffingPointsTable = React.createClass({
//   render() {
//     const records = this.props.records.filter(function(record) {
//       const nameMatch =
//         record.fullName
//           .toUpperCase()
//           .indexOf(this.props.nameFilter.toUpperCase()) !== -1;
//       let departmentMatch;
//       if (this.props.departmentFilter === 'all') departmentMatch = true;
//       else
//         departmentMatch =
//           record.department.toUpperCase() ===
//           this.props.departmentFilter.toUpperCase();

//       let statusMatch;
//       if (this.props.statusFilter === 'all') statusMatch = true;
//       else
//         statusMatch =
//           record.status.toUpperCase() === this.props.statusFilter.toUpperCase();

//       const afterBeginDateMatch =
//         record.dateCompleted > this.props.beginDateFilter;
//       const beforeEndDateMatch =
//         record.dateCompleted < this.props.endDateFilter;

//       return (
//         statusMatch &&
//         departmentMatch &&
//         nameMatch &&
//         afterBeginDateMatch &&
//         beforeEndDateMatch
//       );
//     }, this);

//     const rows = records.map(function(record) {
//       return (
//         <StaffingPointsRow
//           key={record._id}
//           record={record}
//           password={this.props.password}
//           ajaxUpdateStatus={this.props.updateStatus}
//         />
//       );
//     }, this);

//     return (
//       <table>
//         <thead>
//           <tr>
//             <th>Full Name</th>
//             <th>Points</th>
//             <th>Description</th>
//             <th>Department</th>
//             <th>Completion Date</th>
//             <th>Notes</th>
//             <th>Status</th>
//             <th>Approve</th>
//             <th>Deny</th>
//             <th>Manager Notes</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </table>
//     );
//   },
// });

// const StaffingPointsView = React.createClass({
//   getInitialState() {
//     return {
//       nameFilter: '',
//       departmentFilter: 'all',
//       statusFilter: 'all',
//       beginDateFilter: new Date('January 1, 2016'),
//       endDateFilter: new Date(),
//       password: '',
//       statusMessage: '',
//       records: [],
//     };
//   },

//   componentDidMount() {
//     const component = this;
//     $.get('points', data => {
//       data.forEach(val => {
//         val.dateCompleted = new Date(val.dateCompleted);
//       });
//       component.setState({
//         records: data,
//       });
//     });
//   },

//   updatePassword() {
//     this.setState({
//       password: this.refs.passwordInput.value,
//     });
//   },

//   updateStatus(statusMessage, newStatus, id) {
//     if (statusMessage !== 'incorrect password') {
//       let recordToUpdateIndex = -1;

//       for (let x = 0; x < this.state.records.length; x++) {
//         if (this.state.records[x]._id === id) recordToUpdateIndex = x;
//       }

//       const recordToUpdate = this.state.records[recordToUpdateIndex];

//       const newRecord = JSON.parse(JSON.stringify(recordToUpdate));

//       newRecord.dateCompleted = new Date(newRecord.dateCompleted);

//       newRecord.status = newStatus;

//       var records = [
//         this.state.records.slice(0, recordToUpdateIndex),
//         newRecord,
//         this.state.records.slice(
//           recordToUpdateIndex + 1,
//           this.state.records.length
//         ),
//       ];
//     } else var records = this.state.records;

//     this.setState({
//       records,
//       statusMessage,
//     });
//   },

//   handleFilterChange(newFilterObj) {
//     this.setState(newFilterObj);
//   },

//   render() {
//     return (
//       <div>
//         <h1 id="header">Staffing Points</h1>
//         <h4>{this.state.statusMessage}</h4>
//         <div className="row">
//           <div className="col-md-4 col-md-offset-8 ">
//             <div className="form-group">
//               <h3>Super Secret Password</h3>
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control"
//                 onChange={this.updatePassword}
//                 ref="passwordInput"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-3">
//             <NameFilter
//               filterName={this.state.nameFilter}
//               handleFilterChange={this.handleFilterChange}
//             />
//           </div>
//           <div className="col-md-3">
//             <DateFilter
//               beginDate={this.state.beginDateFilter}
//               endDate={this.state.endDateFilter}
//               handleFilterChange={this.handleFilterChange}
//             />
//           </div>
//           <div className="col-md-3">
//             <StatusFilter handleFilterChange={this.handleFilterChange} />
//           </div>
//           <div className="col-md-3">
//             <DepartmentFilter handleFilterChange={this.handleFilterChange} />
//           </div>
//         </div>
//         <StaffingPointsTable
//           records={this.state.records}
//           nameFilter={this.state.nameFilter}
//           departmentFilter={this.state.departmentFilter}
//           statusFilter={this.state.statusFilter}
//           beginDateFilter={this.state.beginDateFilter}
//           endDateFilter={this.state.endDateFilter}
//           password={this.state.password}
//           updateStatus={this.updateStatus}
//         />
//       </div>
//     );
//   },
// });

// ReactDOM.render(<StaffingPointsView />, document.getElementById('container'));
