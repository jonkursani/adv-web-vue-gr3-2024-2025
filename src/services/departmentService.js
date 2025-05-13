import client from "@/helpers/client.js";

class DepartmentService {
    async getAllDepartments() {
        const response = await client.get('departments')
        // console.log(response)
        return response.data
    }

    async createDepartment(department) {
        const response = await client.post('departments', department)
        return response.status === 201 ? response.data : null
    }

    async getDepartmentById(id) {
        const response = await client.get(`departments/${id}`)
        return response.status === 200 ? response.data : null
    }

    async updateDepartment(id, department) {
        const response = await client.put(`departments/${id}`, department)
        return response.status === 200 ? response.data : null
    }

    async deleteDepartment(id) {
        const response = await client.delete(`departments/${id}`)
        return response.status === 204
    }
}

export default new DepartmentService()