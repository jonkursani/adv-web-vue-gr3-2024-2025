import client from "@/helpers/client.js";

class EmployeeService {
    async getAllEmployees() {
        const response = await client.get('employees');
        return response.data
    }

    async createEmployee(employee) {
        const response = await client.post('employees', employee);
        return response.status === 201 ? response.data : null
    }
}

export default new EmployeeService()