import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

class DealService {
  constructor() {
    this.tableName = 'deal_c';
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
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "expected_close_date_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "contact_name_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "updated_at_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching deals:", error?.response?.data?.message || error);
      toast.error("Failed to load deals");
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
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "expected_close_date_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "contact_name_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "updated_at_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching deal ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load deal");
      return null;
    }
  }

  async create(dealData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const records = [{
        Name: dealData.title || dealData.title_c,
        title_c: dealData.title || dealData.title_c,
        value_c: parseFloat(dealData.value || dealData.value_c || 0),
        stage_c: dealData.stage || dealData.stage_c,
        probability_c: parseInt(dealData.probability || dealData.probability_c || 0),
        expected_close_date_c: dealData.expectedCloseDate || dealData.expected_close_date_c,
        contact_id_c: parseInt(dealData.contactId || dealData.contact_id_c || 0),
        contact_name_c: dealData.contactName || dealData.contact_name_c,
        created_at_c: dealData.createdAt || dealData.created_at_c || new Date().toISOString(),
        updated_at_c: dealData.updatedAt || dealData.updated_at_c || new Date().toISOString()
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
          console.error(`Failed to create ${failed.length} deals:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0 ? successful[0].data : null;
      }

      return response.data;
    } catch (error) {
      console.error("Error creating deal:", error?.response?.data?.message || error);
      toast.error("Failed to create deal");
      return null;
    }
  }

  async update(id, dealData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not initialized");
      }

      const records = [{
        Id: parseInt(id),
        Name: dealData.title || dealData.title_c,
        title_c: dealData.title || dealData.title_c,
        value_c: parseFloat(dealData.value || dealData.value_c || 0),
        stage_c: dealData.stage || dealData.stage_c,
        probability_c: parseInt(dealData.probability || dealData.probability_c || 0),
        expected_close_date_c: dealData.expectedCloseDate || dealData.expected_close_date_c,
        contact_id_c: parseInt(dealData.contactId || dealData.contact_id_c || 0),
        contact_name_c: dealData.contactName || dealData.contact_name_c,
        updated_at_c: dealData.updatedAt || dealData.updated_at_c || new Date().toISOString()
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
          console.error(`Failed to update ${failed.length} deals:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0 ? successful[0].data : null;
      }

      return response.data;
    } catch (error) {
      console.error("Error updating deal:", error?.response?.data?.message || error);
      toast.error("Failed to update deal");
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
          console.error(`Failed to delete ${failed.length} deals:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0;
      }

      return true;
    } catch (error) {
      console.error("Error deleting deal:", error?.response?.data?.message || error);
      toast.error("Failed to delete deal");
      return false;
    }
  }
}

export const dealService = new DealService();