import React, { Component } from 'react';
import StudentTable from './StudentTable'
import StudentYearChart from './StudentYearChart'
import StudentDeptChart from './StudentDeptChart'

class App extends Component {
  render() {
    return (
      <div>
        <StudentTable />
        <hr />
        <StudentYearChart />
        <hr />
        <StudentDeptChart />    
      </div> 
    );
  }
}

export default App;