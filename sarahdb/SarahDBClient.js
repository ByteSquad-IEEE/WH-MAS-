import { decrypt } from './SarahEncrypt';
import { retTr } from './__trash';

const CON_KEY = decrypt(decrypt(decrypt(decrypt(retTr()))));
console.log(CON_KEY);

// const from = "http://127.0.0.1:781";
const from = "https://sarahdb.pythonanywhere.com";

const link_prefix = `${from}/${CON_KEY}/handler`;

const DB_URL = `${from}/login/${CON_KEY}`;

class DbORM {
  constructor() {
    this.database = {};
  }

  async connect() {
    try {
      const response = await fetch(DB_URL);
      if (response.ok) {
        console.log("Connected to db server successfully");
        console.log(`\n\n>>>>>>>>>>>>>>>>>>>>>${await response.text()}\n\n\n`);
      } else {
        console.log("Error connecting to db server");
      }
    } catch (error) {
      console.error("Error connecting to db server:", error);
    }
  }

  async requestThenText(url) {
    const response = await fetch(url);
    return response.text();
  }

  async requestThenTextPost(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.text();
  }

  async all() {
    return JSON.parse(await this.requestThenText(`${link_prefix}/handler`));
  }

  async getAll(model) {
    return JSON.parse(await this.requestThenText(`${link_prefix}/get_all/${model}`));
  }

  async findAll(model, column, value) {
    return JSON.parse(await this.requestThenText(`${link_prefix}/find_all/${model}/${column}/${value}`));
  }

  async addOne(model, column, value) {
    return JSON.parse(await this.requestThenText(`${link_prefix}/add_one/${model}/${column}/${value}`));
  }

  async addEntry(model, columnValuePairs) {
    try {
      const data = {
        model: model,
        column_value_pairs: JSON.stringify(columnValuePairs)
      };
      return JSON.parse(await this.requestThenTextPost(`${link_prefix}/add_entry`, data));
    } catch (error) {
      console.error(`Error in addEntry: ${error}\nmodel: ${model}\ncvp: ${JSON.stringify(columnValuePairs)}`);
    }
  }

  async findOne(model, column, value) {
    return JSON.parse(await this.requestThenText(`${link_prefix}/find_one/${model}/${column}/${value}`));
  }

  async updateOne(model, column, valueSearch, valueUpdate) {
    return JSON.parse(await this.requestThenText(`${link_prefix}/update_one/${model}/${column}/${valueSearch}/${valueUpdate}`));
  }

  async updateEntry(model, column, columnValuePairs, dnd) {
    if (dnd) {
      const data = {
        model: model,
        column: column,
        cvp: JSON.stringify(columnValuePairs)
      };
      return JSON.parse(await this.requestThenTextPost(`${link_prefix}/update_entry_dnd`, data));
    } else {
      return JSON.parse(await this.requestThenText(`${link_prefix}/update_entry/${model}/${column}/${JSON.stringify(columnValuePairs)}`));
    }
  }

  async deleteEntry(model, column) {
    return JSON.parse(await this.requestThenText(`${link_prefix}/delete_entry/${model}/${column}`));
  }

  sanitizeString(string) {
    return string.replace(/['"/\\]/g, '');
  }

  async getBase64Media(mediaID) {
    const result = await this.findOne('base64_images', 'id', mediaID);
    if (result.status[0] === "not found") {
      return null;
    } else {
      const allImages = await this.getAll('base64_images');
      return allImages[result.status[1]].base64;
    }
  }
}

export default new DbORM();