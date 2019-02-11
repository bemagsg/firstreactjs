import React, {Component} from 'react';
import { Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';


class EmployeeList extends Component{

    constructor(props) {
        super(props);
        this.state = {employees: [], isLoading: true};
        this.remove = this.remove.bind(this);

    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/employees')
        .then(response => response.json())
        .then(data => this.setState({employees: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/employee/${id}`, {
            method: 'DELETE',
            headers: {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'  
            }
        }).then(() => {
            let updatedEmployees = [...this.state.employees].filter(i => i.id !==id);
            this.setState({employees: updatedEmployees});
        });
    }

    render() {
        const {employees, isLoading} = this.state;
        if(isLoading) {
            return <p>Loading....</p>;
        }

        const employeeList = employees.map(employee =>{
            return <tr key={employee.id}>
                        <td style={{whiteSpace: 'nowrap'}}>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.description}</td>
                        <td>
                            <ButtonGroup>
                                <Button size="sm" color="primary" tag={Link} to={"/employee/" + employee.id}>Edit</Button>
                                <Button size="sm" color="danger" onClick={()=>this.remove(employee.id)}>Delete</Button>
                            </ButtonGroup>
                        </td>
                        
                    </tr>

        });
        
        return (

            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="mt-4">
                        <Button color = "success" tag={Link} to="/employee/new">Add Group</Button>
            
                    </div>
                    <h3>My Employees</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">First Name</th>
                                <th width="20%">Last Name</th>
                                <th>Events</th>
                                <th width="10%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}

export default EmployeeList;