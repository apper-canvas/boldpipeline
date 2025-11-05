import stagesData from "@/services/mockData/stages.json";

class StageService {
  constructor() {
    this.stages = [...stagesData];
  }

  async getAll() {
    await this.delay(200);
    return [...this.stages].sort((a, b) => a.order - b.order);
  }

  async getById(id) {
    await this.delay(150);
    const stage = this.stages.find(s => s.Id === parseInt(id));
    if (!stage) {
      throw new Error("Stage not found");
    }
    return { ...stage };
  }

  async create(stageData) {
    await this.delay(300);
    const maxId = this.stages.length > 0 
      ? Math.max(...this.stages.map(s => s.Id))
      : 0;
    
    const newStage = {
      ...stageData,
      Id: maxId + 1,
    };
    
    this.stages.push(newStage);
    return { ...newStage };
  }

  async update(id, stageData) {
    await this.delay(250);
    const index = this.stages.findIndex(s => s.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error("Stage not found");
    }
    
    this.stages[index] = { ...this.stages[index], ...stageData };
    return { ...this.stages[index] };
  }

  async delete(id) {
    await this.delay(200);
    const index = this.stages.findIndex(s => s.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error("Stage not found");
    }
    
    this.stages.splice(index, 1);
    return true;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const stageService = new StageService();