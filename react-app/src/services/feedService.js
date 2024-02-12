import axios from 'axios';

const FEED_BASE_URL = "http://localhost:3000/feed";

class EmployeeService {

    getFeed(id){
        return axios.get(FEED_BASE_URL + '/' + id);
    }

    createEmployee(employee){
        return axios.post(FEED_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(FEED_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(FEED_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(FEED_BASE_URL + '/' + employeeId);
    }
}

export default new EmployeeService()