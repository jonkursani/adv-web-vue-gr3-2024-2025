import client from "@/helpers/client.js";

class EmployeeService {
    async getAllEmployees() {
        const response = await client.get('employees');
        return response.data
    }
}

export default new EmployeeService()