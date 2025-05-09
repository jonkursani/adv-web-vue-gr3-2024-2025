import client from "@/helpers/client.js";

class DepartmentService {
    async getAllDepartments() {
        const response = await client.get('departments')
        // console.log(response)
        return response.data
    }
}

export default new DepartmentService()