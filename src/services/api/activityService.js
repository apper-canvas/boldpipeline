import activitiesData from "@/services/mockData/activities.json";

class ActivityService {
  constructor() {
    this.activities = [...activitiesData];
  }

  async getAll() {
    await this.delay(250);
    return [...this.activities];
  }

  async getById(id) {
    await this.delay(200);
    const activity = this.activities.find(a => a.Id === parseInt(id));
    if (!activity) {
      throw new Error("Activity not found");
    }
    return { ...activity };
  }

  async getByContactId(contactId) {
    await this.delay(300);
    return this.activities.filter(a => a.contactId === contactId.toString());
  }

  async getByDealId(dealId) {
    await this.delay(300);
    return this.activities.filter(a => a.dealId === dealId.toString());
  }

  async create(activityData) {
    await this.delay(400);
    const maxId = this.activities.length > 0 
      ? Math.max(...this.activities.map(a => a.Id))
      : 0;
    
    const newActivity = {
      ...activityData,
      Id: maxId + 1,
    };
    
    this.activities.push(newActivity);
    return { ...newActivity };
  }

  async update(id, activityData) {
    await this.delay(300);
    const index = this.activities.findIndex(a => a.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error("Activity not found");
    }
    
    this.activities[index] = { ...this.activities[index], ...activityData };
    return { ...this.activities[index] };
  }

  async delete(id) {
    await this.delay(250);
    const index = this.activities.findIndex(a => a.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error("Activity not found");
    }
    
    this.activities.splice(index, 1);
    return true;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const activityService = new ActivityService();