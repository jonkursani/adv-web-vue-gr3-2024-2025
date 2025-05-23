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

    async getEmployeeById(id) {
        const response = await client.get(`employees/${id}`);
        return response.status === 200 ? response.data : null
    }

    async updateEmployee(id, employee) {
        const response = await client.put(`employees/${id}`, employee)
        return response.status === 200 ? response.data : null
    }

    async deleteEmployee(id) {
        const response = await client.delete(`employees/${id}`);
        return response.status === 204
    }
}

export default new EmployeeService()