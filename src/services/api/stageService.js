import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

class StageService {
  constructor() {
    this.tableName = 'stage_c';
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "order_c"}},
          {"field": {"Name": "deal_count_c"}},
          {"field": {"Name": "total_value_c"}}
        ],
        orderBy: [{
          fieldName: "order_c",
          sorttype: "ASC"
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching stages:", error?.response?.data?.message || error);
      toast.error("Failed to load stages");
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "order_c"}},
          {"field": {"Name": "deal_count_c"}},
          {"field": {"Name": "total_value_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching stage ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load stage");
      return null;
    }
  }

  async create(stageData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const records = [{
        Name: stageData.name || stageData.name_c,
        name_c: stageData.name || stageData.name_c,
        order_c: parseInt(stageData.order || stageData.order_c || 0),
        deal_count_c: parseInt(stageData.dealCount || stageData.deal_count_c || 0),
        total_value_c: parseFloat(stageData.totalValue || stageData.total_value_c || 0)
      }];

      const response = await apperClient.createRecord(this.tableName, { records });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} stages:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0 ? successful[0].data : null;
      }

      return response.data;
    } catch (error) {
      console.error("Error creating stage:", error?.response?.data?.message || error);
      toast.error("Failed to create stage");
      return null;
    }
  }

  async update(id, stageData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const records = [{
        Id: parseInt(id),
        Name: stageData.name || stageData.name_c,
        name_c: stageData.name || stageData.name_c,
        order_c: parseInt(stageData.order || stageData.order_c || 0),
        deal_count_c: parseInt(stageData.dealCount || stageData.deal_count_c || 0),
        total_value_c: parseFloat(stageData.totalValue || stageData.total_value_c || 0)
      }];

      const response = await apperClient.updateRecord(this.tableName, { records });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} stages:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0 ? successful[0].data : null;
      }

      return response.data;
    } catch (error) {
      console.error("Error updating stage:", error?.response?.data?.message || error);
      toast.error("Failed to update stage");
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const response = await apperClient.deleteRecord(this.tableName, { 
        RecordIds: [parseInt(id)]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} stages:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0;
      }

      return true;
    } catch (error) {
      console.error("Error deleting stage:", error?.response?.data?.message || error);
      toast.error("Failed to delete stage");
      return false;
    }
  }
}

export const stageService = new StageService();